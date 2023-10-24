<template>
    <footer class="footer">

        <div class="wrapper row d-flex footer-links justify-content-evenly me-auto my-4">
            <div class="col col-lg-3 div1">
                <!-- <a lass="navbar-brand" aria-current="page" ><RouterLink to="/">StockControll</RouterLink></a> -->
                <img src="../images/box.png" class="pb-2" style="margin-right:5px;" alt="logo img">&nbsp;
                <a class="navbar-brand" href="#">KeepUp</a>
                <p class="my-3">KeepUp is an high tech application that keep track of your products in a innovative and
                    sleepless way. <br> Keep track, Keep control Keep up. </p>
                <div class="">
                    <i class="fa-brands fa-facebook-f"></i>
                    <i class="mx-5 fa-brands fa-instagram"></i>
                    <i class="fa-brands fa-linkedin-in"></i>
                </div>
            </div>
            <div class="col-md-auto div2">
                <h3 class="pb-2">Quick links</h3>
                <div style="display:grid;">

                    <a class="" aria-current="page">
                        <RouterLink to="/">Start</RouterLink>
                    </a>
                    <a class="" aria-current="page">
                        <RouterLink to="/Add">Add +</RouterLink>
                    </a>
                    <a class="" aria-current="page">
                        <RouterLink to="/stock">Stock</RouterLink>
                    </a>
                </div>

                <div style="display:grid;">
                    <a class="">
                        <RouterLink to="/mystock">My added products</RouterLink>
                    </a>
                    <a class="">
                        <RouterLink to="/register">Register user</RouterLink>
                    </a>
                    <a @click.prevent="logoutUser" class="">Log
                        out</a>
                </div>
            </div>
            <div class="col col-lg-3 div3">
                <h3 class="pb-2">Contact Us</h3>
                <p><i class="fa-solid fa-envelope"></i> &nbsp; &nbsp; &nbsp; keepup@keepup.se</p>
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
    height: fit-content;
    border-top: 0.5px solid rgb(214, 214, 214);
    /* box-shadow: 0 -2px 6px rgb(233, 233, 233); */
    box-shadow: inset 0px 1px 10px 1px rgb(233, 233, 233);
    padding: 2em 0;
}

.logo-footer {
    font-size: 2.2em;
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

.div1 {
    width: 20%;
}
.div2 a{
    padding: 0.2em 0;
}

.div2,
.div3 {
    margin-top: 0.75em;
}

.social-links a,
.quick-links a,
.div1>a,
.footer-links a {
    color: #5b5b5b;
    text-decoration: none;
    font-weight: 700;
    text-decoration: none !important;
}

.social-links a:hover,
.quick-links a:hover,
.div1>a:hover,
.footer-links a:hover {
    text-decoration: underline !important;
}

@media screen and (max-width: 772px) {
    .footer {
        text-align: center;
        height: fit-content;
        padding: 2em 0;
    }

    .div1 {
        max-width: 75%;
    }

    .div2 {
        padding: 2.5em 0;
    }

}
</style>

<script>
import { RouterLink } from 'vue-router';
export default {
    name: "Footer"
}
</script>