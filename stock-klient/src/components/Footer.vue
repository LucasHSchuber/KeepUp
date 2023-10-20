<template>
    <footer class="footer">

        <div class="d-flex footer-links justify-content-evenly me-auto my-4">
            <div class="div1" style="display:grid;">
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
            <div class="div2">
                <h3>Contact Us</h3>
                <p>Email: keepup@gmail.se</p>
                <p>Phone: +1 123 456 7890</p>
            </div>
            <div class="div3">
                <h3>Social media</h3>
                <ul class="social-links">
                    <li><a href="#" target="_blank">Facebook</a></li>
                    <li><a href="#" target="_blank">Twitter</a></li>
                    <li><a href="#" target="_blank">Instagram</a></li>
                </ul>
            </div>
        </div>

        <div class="d-flex justify-content-center mt-3">
            <a class="navbar-brand logo-footer">KeepUp</a>
        </div>

    </footer>
</template>


<style>
.footer {
    background-color: #ededed;
    color: rgb(29, 29, 29);
    height: 35em;
    border-top: 0.5px solid rgb(214, 214, 214);
    /* box-shadow: 0 -2px 6px rgb(233, 233, 233); */
    box-shadow: inset 0px 1px 10px 1px rgb(233, 233, 233);
    padding: 2em 0 0 0;
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
    font-size: 1.2rem;
    margin-bottom: 10px;
    text-decoration: underline;
}

.social-links li,
.quick-links li,
.div1>a,
.div-1-minor>a {
    list-style: none;
    margin-bottom: 10px;
}

.social-links a,
.quick-links a,
.div1>a,
.div-1-minor>a,
.footer-links a {
    color: #2a2929;
    text-decoration: none;
    font-weight: bold;
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