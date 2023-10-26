<template>
    <header>

        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <div>
                    <!-- <a lass="navbar-brand" aria-current="page" ><RouterLink to="/">StockControll</RouterLink></a> -->
                    <img src="../images/box.png" class="pb-2" style="margin-right:5px;" alt="logo img">
                    <a class="navbar-brand" href="#">KeepUp</a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page">
                                <RouterLink to="/">Start</RouterLink>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page">
                                <RouterLink to="/Add">Add +</RouterLink>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page">
                                <RouterLink to="/stock">Stock</RouterLink>
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Admin
                            </a>
                            <ul class="dropdown-menu">

                                <li><a class="dropdown-item" href="#">
                                        <RouterLink to="/mystock">My added products</RouterLink>
                                    </a></li>
                                <li><a class="dropdown-item" href="#">
                                        <RouterLink to="/analytics">Analytics</RouterLink>
                                    </a></li>
                                <!-- <li><a class="dropdown-item" href="#">About us</a></li> -->
                                <li><a class="dropdown-item" href="#">
                                        <RouterLink to="/register">Register user</RouterLink>
                                    </a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li @click.prevent="logoutUser"><a class="dropdown-item" href="#">Log
                                        out</a></li>
                            </ul>
                        </li>
                    </ul>
                    <!-- <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form> -->
                    <button class="user-btn">
                        <i class="user-icon fa-regular fa-1x fa-solid fa-circle-user mx-2" style="font-size:1.5em;"></i>
                    </button>
                    <Users />
                </div>
            </div>
        </nav>

    </header>
</template>


<script>

import axios from 'axios';

import { RouterLink } from 'vue-router';
import Users from "../components/Users.vue";


export default {
    data() {
        return {
            loggedIn: false,
        };
    },
    components: {
        RouterLink,
        Users,
    },
    methods: {
        async logoutUser() {

            // Retrieve the Bearer token from sessionStorage
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
        //  TokenExists() {
            
        //     // Check if the token exists in session storage
        //     console.log("Token exists triggered");
        //     if (sessionStorage.getItem('token') !== null) {
        //         this.loggedIn = true
        //     } else {
        //         console.log("Token doesnt exists, admin dropdwon hidden");

        //     }

        // }
    },

}



</script>


<style>
.navbar {
    border-bottom: 0.5px solid rgb(214, 214, 214);
    box-shadow: 0 1px 4px 0px rgb(233, 233, 233);
    padding: 2.2em 0;
}

.navbar-brand {
    color: #00b9c3;
    font-weight: 800;
    font-style: italic;
    font-size: 2em;
}

.user-icon {
    visibility: visible;
}

header li {
    list-style: none;
    padding-left: 1em;
}

.navbar-nav li a {
    color: rgb(46, 46, 46);
    text-decoration: none;
    font-weight: 500;
}

.navbar-nav li a:hover {
    color: gray;
}

.dropdown-menu {
    background-color: #F8F9FA;
    border: inherit;
    width: 13em;
}

a:active,
a:focus {
    background-color: transparent !important;
}

.user-btn {
    background-color: transparent;
    border: none;
}

/* IPAD */
@media screen and (max-width: 992px) {

    .user-icon {
        visibility: hidden;
    }

    .navbar-brand {
        font-size: 2.2em;
    }

    .navbar {
        /* border-bottom: 0.5px solid rgb(214, 214, 214);
    box-shadow: 0 1px 4px 0px rgb(233, 233, 233); */
        padding: 2em 0;
    }
}

@media screen and (max-width: 772px) {


    .navbar-nav>li>a {
        color: rgb(46, 46, 46);
        /* border: 1px solid black; */
        text-decoration: none;
        font-weight: 700 !important;
        padding-top: 1em;

    }

    .navbar-nav>li a {
        color: rgb(46, 46, 46);

        text-decoration: none;
        font-weight: 700 !important;
        padding-top: 1em;


    }

}
</style>

