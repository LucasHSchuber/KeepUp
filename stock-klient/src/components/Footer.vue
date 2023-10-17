<template>
    <footer class="footer">
        <!-- <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Contact Us</h3>
                    <p>Email: info@example.com</p>
                    <p>Phone: +1 123 456 7890</p>
                </div>
                <div class="footer-section">
                    <h3>Follow Us</h3>
                    <ul class="social-links">
                        <li><a href="#" target="_blank">Facebook</a></li>
                        <li><a href="#" target="_blank">Twitter</a></li>
                        <li><a href="#" target="_blank">Instagram</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul class="quick-links">
                        <li><a href="/">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                    </ul>
                </div>
            </div>
        </div> -->
    </footer>
</template>


<style>
footer {
    background-color: #F8F9FA;
    height: 30em;
    border-top: 0.5px solid rgb(214, 214, 214);
    /* box-shadow: 0 -2px 6px rgb(233, 233, 233); */
    box-shadow: inset 0px 1px 10px 1px rgb(233, 233, 233);
    padding: 2em 0;
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
}

.social-links li,
.quick-links li {
    list-style: none;
    margin-bottom: 10px;
}

.social-links a,
.quick-links a {
    color: #2a2929;
    text-decoration: none;
    font-weight: bold;
}

.social-links a:hover,
.quick-links a:hover {
    text-decoration: underline;
}
</style>

<script>
import { RouterLink } from 'vue-router';
export default {
    name: "Footer"
}
</script>