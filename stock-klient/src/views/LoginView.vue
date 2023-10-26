<template>
    <div class="wrapper">
        <div class="register-wrap d-flex justify-content-center">
            <div class="login-form">
                <h5 class="title mb-4">Login to your account</h5>

                <div class="error-box">
                    <p v-if="errors_cred.length">
                    <p v-for="error in errors_cred"><b>{{ error }}</b></p>
                    </p>
                </div>

                <div class="mb-2">
                    <label for="email" class="form-label">Email address</label>

                    <div class="error-box">
                        <p v-if="errors_email.length">
                        <p v-for="error in errors_email"><b>{{ error }}</b></p>
                        </p>
                    </div>

                    <input type="email" class="form-control" id="email" placeholder="Email" v-model="form.email">
                </div>
                <div class="mb-2">
                    <label for="password" class="form-label">Password</label>

                    <div class="error-box">
                        <p v-if="errors_password.length">
                        <p v-for="error in errors_password"><b>{{ error }}</b></p>
                        </p>
                    </div>

                    <input type="password" class="form-control" id="password" placeholder="Password"
                        v-model="form.password">
                </div>
                <button @click.prevent="loginUser" type="submit" class="submit-btn mt-4">Log in</button>
                <User ref="fetchUser" />
            </div>
        </div>
    </div>
</template>

<script>

import axios from "axios";

import User from "../components/Users.vue"

export default {
    data() {
        return {
            form: {
                email: "",
                password: "",
            },
            errors_email: [],
            errors_password: [],
            errors_cred: [],

        }
    },
    components:{
        User,
    },
    methods: {
        loginUser() {
            axios.post('http://127.0.0.1:8001/api/login', this.form)
                .then((response) => {
                    sessionStorage.setItem('token', response.data.token)
                    this.$router.push({ name: "home" });
                    this.$refs.fetchUser.fetchUserData();
                    

                }).catch((error) => {

                    this.errors_email = [];
                    this.errors_password = [];
                    this.errors_cred = [];

                    if (!this.form.email) {
                        this.errors_email.push('Type in your email');
                        // this.success = false;
                    }
                    if (!this.form.password) {
                        this.errors_password.push('Type in your password');
                        // this.success = false;
                    }

                    this.errors_cred.push(error.response.data.message);
                    this.errors = error.response.data.errors;
                    console.log(error.response.data);
                })
        },
    }
}

</script>

<style scoped>
.wrapper {
    margin: 5em 0 5em 0;
}

.login-form input {
    height: 2em;
    width: 22em;
}

</style>