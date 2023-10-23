<template>
    <footer class="footer">

        <div class="wrapper d-flex footer-links justify-content-evenly me-auto my-4">
            <div class="div1">
                <!-- <a lass="navbar-brand" aria-current="page" ><RouterLink to="/">StockControll</RouterLink></a> -->
                <img src="../images/box.png" class="pb-2" style="margin-right:5px;" alt="logo img">
                <a class="navbar-brand" href="#">KeepUp</a>
                <p class="my-3">KeepUp is an high tech application that keep track of your products in a innovative and sleepless way. <br> Keep track, Keep up. </p>
                <div class="">
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="mx-5 fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-linkedin-in"></i>
                </div>
            </div>
            <div class="div2" style="display:grid;">

                <h3>Quick links</h3>

                <a class="" aria-current="page">
                    <RouterLink to="/">Start</RouterLink>
                </a>


                <a class="" aria-current="page">
                    <RouterLink to="/Add">Add +</RouterLink>
                </a>


                <a class="" aria-current="page">
                    <RouterLink to="/stock">Stock</RouterLink>
                </a>


                <div class="div-1-minor">

                    <ul class="div-1-minor" style="display:grid;">
                        <a class="">
                            <RouterLink to="/mystock">My added products</RouterLink>
                        </a>
                        <a class="">
                            <RouterLink to="/register">Register user</RouterLink>
                        </a>
                        <a @click.prevent="logoutUser" class="">Log
                            out</a>
                    </ul>

                </div>

            </div>
            <div class="div3">
                <h3>Contact Us</h3>
                <p><i class="fa-solid fa-envelope"></i> &nbsp; &nbsp; &nbsp; keepup@gmail.se</p>
                <p><i class="fa-solid fa-phone"></i> &nbsp; &nbsp; &nbsp; +1 123 456 7890</p>
            </div>
            
        </div>

    </footer>
</template>


<style>
.navbar-brand {
    color: #00b9c3 !important;
    font-weight: 800;
    font-style: italic;
    font-size: 1.8em;
}

.footer {
    background-color: #ededed;
    color: #5b5b5b;
    height: 35em;
    border-top: 0.5px solid rgb(214, 214, 214);
    /* box-shadow: 0 -2px 6px rgb(233, 233, 233); */
    box-shadow: inset 0px 1px 10px 1px rgb(233, 233, 233);
    padding: 2em 0 0 0;
}

.div1 {
    width: 20%;
}

.logo-footer {
    font-size: 2.2em;
}

.container {
    width: 80%;
    margin: 0 auto;
}

.footer-content {
    display: flex;
    justify-content: space-around;
}

.footer-section {
    flex: 1;
    padding: 0 20px;
}

.footer h3 {
    font-size: 1.1rem;

    /* text-decoration: underline; */
}

.div2, .div3, .div4{
    margin-top:0.75em;
}

.social-links li,
.quick-links li,
.div1>a,
.div-1-minor>a {
    list-style: none;
    /* margin-bottom: 5px; */
}

.social-links a,
.quick-links a,
.div1>a,
.div-1-minor>a,
.footer-links a {
    color: #5b5b5b;
    text-decoration: none;
    font-weight: 700;
    text-decoration: none !important;
}

.social-links a:hover,
.quick-links a:hover,
.div1>a:hover,
.div-1-minor>a:hover,
.footer-links a:hover {
    text-decoration: underline !important;
}
</style>

<script>
import { RouterLink } from 'vue-router';
export default {
    name: "Footer"
}
</script>