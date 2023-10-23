<template>
    <footer class="fixed-bottom bg-body-tertiary">
        <div class="container">
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="#">KeepUp</a>
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink to="/" class="nav-link">Start</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/Add" class="nav-link">Add +</RouterLink>
                        </li>
                        <li class="nav-item">
                            <RouterLink to="/stock" class="nav-link">Stock</RouterLink>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                Admin
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <RouterLink to="/mystock" class="dropdown-item">My added products</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/analytics" class="dropdown-item">Analytics</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="/register" class="dropdown-item">Register user</RouterLink>
                                </li>
                                <li class="dropdown-divider"></li>
                                <li @click.prevent="logoutUser" class="dropdown-item">Log out</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <button class="user-btn">
                    <i class="user-icon fa-regular fa-1x fa-solid fa-circle-user mx-2" style="font-size: 1.5em;"></i>
                </button>
            </nav>
            <Users />
        </div>
    </footer>
</template>

<script>


import axios from 'axios';

import { RouterLink } from 'vue-router';
import Users from "../components/Users.vue";


export default {
    data() {
        return {

        }
    },
    components: {
        RouterLink,
        Users,
    },
    methods: {
        async logoutUser() {

            const token = sessionStorage.getItem('token');

            // Check if the token exists
            if (!token) {
                console.error('Access token not found in sessionStorage');
                confirm("You are not logged in")
                this.$router.push({ name: "login" });
                return;
            } else {
                console.log(token);
            }

            if (confirm("Are you sure you want to log out?")) {

                axios.post('http://127.0.0.1:8001/api/logout', null, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(() => {

                        sessionStorage.removeItem('token');
                        sessionStorage.clear()
                        this.$router.push({ name: "login" });
                        console.log("You have been loged out!");
                    }).catch((error) => {
                        this.errors = error.response.data.errors;
                        console.error('Error occurred during logout:', error);
                    })
            }
        },

    }
}



</script>

<style scoped>/* Add your custom styles if needed */</style>
