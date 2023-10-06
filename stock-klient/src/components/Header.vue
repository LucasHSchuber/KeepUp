<template>
    <header>
        <!-- <div class="d-flex container headercontainer">
            <h1 class="p-2 flex-grow-1 logo">StockControll</h1>
            <nav class="p-2">
                <ul class="d-flex justify-content-end headerlinks">
                    <li>
                        <a><RouterLink to="/">Start</RouterLink></a>
                    </li>
                    <li>
                        <a><RouterLink to="/Add">Add +</RouterLink></a>
                    </li>
                    <li>
                        <a><RouterLink to="/Stock">Stock</RouterLink></a>
                    </li>
                </ul>
            </nav>
        </div> -->

        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <!-- <a lass="navbar-brand" aria-current="page" ><RouterLink to="/">StockControll</RouterLink></a> -->
                <a class="navbar-brand" href="#">StockControll</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" ><RouterLink to="/">Start</RouterLink></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page"><RouterLink to="/Add">Add +</RouterLink></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" ><RouterLink to="/stock">Stock</RouterLink></a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                More
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#">My added products</a></li>
                                <li><a class="dropdown-item" href="#">About us</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li  @click.prevent="logoutUser"  ><a class="dropdown-item" href="#">Log out</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>

    </header>
</template>


<script>

import axios from 'axios'

import { RouterLink } from 'vue-router';
export default {
    components: {
        RouterLink
    },
    methods: {
        logoutUser(){
            axios.post('http://127.0.0.1:8001/api/logout').then(() =>{
                this.$router.push({ name: "login"});
                console.log("You have been loged out!"); log

            }). catch((error) =>{
                this.errors = error.response.data.errors;
            })
        }
    }
}






</script>


<style>


.navbar-brand {
    color: rgb(0, 0, 0);
    font-weight: 800;
    font-style: italic;
}

header {
    background-color: #11120f;

}

header li {
    list-style: none;
    padding-left: 1em;
}
.navbar{
    border-bottom: 0.5px solid rgb(214, 214, 214);
    box-shadow: 0 1px 4px 0px rgb(233, 233, 233);
    padding: 2em 0;
}
.navbar-nav li a {
    color: rgb(46, 46, 46);
    text-decoration: none;
    font-weight: 300;
}

.navbar-nav li a:hover {
    color: gray;
}

.dropdown-menu {
    background-color: #F8F9FA;
    border: inherit;

}
</style>

