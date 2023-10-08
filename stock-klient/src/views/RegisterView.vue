
<template>
    <div class="wrapper">
        <div class="register-wrap d-flex justify-content-center">
            <div class="reg-form">
                <h5 class="mb-4">Register account</h5>

                <div class="error-box">
                    <p v-if="errors.length">
                        <b>Error messages:</b>
                    <ul>
                        <li v-for="error in errors"><b>{{ error }}</b></li>
                    </ul>
                    </p>
                </div>

                <div class="mb-2">
                    <label for="name" class="form-label">Full name</label>
                    <input type="text" class="form-control" id="name" placeholder="Name" v-model="form.name">
                </div>
                <div class="mb-2">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" placeholder="Email" v-model="form.email">
                </div>
                <div class="mb-2">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Password"
                        v-model="form.password">
                </div>
                <div class="mb-2">
                    <label for="password_confirmation" class="form">Repeat password</label>
                    <input type="password" class="form-control" id="password_confirmation" placeholder="Repeat password"
                        v-model="form.password_confirmation">
                </div>
                <p class="success" v-if="success">
                    <b>Your account has been registered!</b>
                </p>
                <button @click.prevent="saveForm" type="submit" class="submit-btn mt-4">Register</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            form: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",

            },
            errors: [],
            success: false

        }
    },
    methods: {
        saveForm() {

            // Assuming you have stored the authentication token in sessionStorage
            const token = sessionStorage.getItem('token');

            axios.post('http://127.0.0.1:8001/api/register', this.form, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            })
                .then((response) => {
                    // this.$router.push({ name: "login"});
                    console.log('user saved!');

                    this.errors = [ ];
                    console.log(response.data);
                    this.success = true;
                    

                }).catch((error) => {

                    this.errors = [];

                    if (!this.form.name.ok) {
                        this.errors.push(error.response.data.error.name);
                        this.success = false;
                    }
                    if (!this.form.email.ok) {
                        this.errors.push(error.response.data.error.email);
                        this.success = false;
                    }
                    if (!this.form.password.ok) {
                        this.errors.push(error.response.data.error.password);
                        this.success = false;
                    }
                    if (!this.form.password_confirmation.ok) {
                        this.errors.push(error.response.data.error.password_confirmation);
                        this.success = false;
                    }

                    console.log(error.response.data.error);
                })


        }
    }
}

</script>

<style scoped>
.wrapper {
    margin: 5em 0 5em 0;
}

.reg-form input {
    height: 2em;
    width: 22em;
}

.submit-btn {
    padding: 0.5em 1.5em;
    background-color: black;
    transition: 0.2s;
    color: white;
    border-radius: 20px;
    border: none;

}

.submit-btn:hover {
    padding: 0.5em 1.5em;
    background-color: rgb(35, 35, 35);
}
</style>