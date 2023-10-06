
<template>
    <div class="wrapper container">
        <div class="start-box pb-3">
            <h5>Login to you're account</h5>
        </div>

        <div class="login-form">
            <div class="mb-2">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" placeholder="Email" v-model="form.email">
            </div>
            <div class="mb-2">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" placeholder="Password" v-model="form.password">
            </div>
            <button @click.prevent="loginUser" type="submit" class="submit-btn mt-4">Log in</button>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return{
            form:{
                email: "",
                password: "",
            },
            errors: []

        }
    },
    methods: {
        loginUser(){
            axios.post('http://127.0.0.1:8001/api/login', this.form)
            .then((response) =>{
                localStorage.setItem('token', response.data.token)
                console.log(response.data.token);
                this.$router.push({ name: "home"});
                console.log("You have been loged in!");
                
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

.login-form input {
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