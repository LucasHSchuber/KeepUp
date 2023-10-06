
<template>
    <div class="wrapper container">
        <div class="start-box pb-3">
            <h5>Register account</h5>
        </div>

        <div class="reg-form">
            <div class="mb-2">
                <label for="name" class="form-label">Full name</label>
                <span v-if="errors.name">{{ errors.name[0] }}</span>
                <input type="text" class="form-control" id="name" placeholder="Name" v-model="form.name">
            </div>
            <div class="mb-2">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="Email" v-model="form.email">
            </div>
            <div class="mb-2">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="form.password">
            </div>
            <div class="mb-2">
                <label for="rpassword" class="form">Repeat password</label>
                <input type="password" class="form-control" id="rpassword" placeholder="Repeat password" v-model="form.rpassword">
            </div>
            <p class="success" v-if="success">
                <b>Your account has been registered!</b>
            </p>
            <button @click.prevent="saveForm" type="submit" class="submit-btn mt-4">Register</button>
        
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return{
            form:{
                name: "",
                email: "",
                password: "",
                rpassword: "",
              
            },
            errors: [],
            success: false

        }
    },
    methods: {
        saveForm(){
            axios.post('http://127.0.0.1:8001/api/register', this.form)
            .then(() =>{
                // this.$router.push({ name: "login"});
                console.log('user saved!');
                this.success = true;
            }). catch((error) =>{
                this.errors = error.response.data.errors;
            })

            
        }
    }
}

</script>

<style scoped>
.wrapper {
    margin: 5em 0 5em 0;
}

.start-box {
    text-align: center;
}

.form-control {
    width: 50%;

}

.reg-form input {
    height: 2em;
    margin: auto;
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