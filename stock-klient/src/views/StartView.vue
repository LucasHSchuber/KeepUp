
<template>

    <div class="imgbox">

        <picture>
            <source media="(min-width: 1800px)" srcset="../images/big.jpg">
            <source media="(min-width: 1080px)" srcset="../images/big4.jpg">
            <source media="(min-width: 772px)" srcset="../images/small3.jpg">
            <source media="(min-width: 500px)" srcset="../images/small4.jpg">
            <source media="(max-width: 500px)" srcset="../images/small5.jpg">
            <img src="../images/small4.jpg" alt="Hero image">
        </picture>

        <div class="img-box">
            <h5 class="text">"Keep track, keep control, keep up!"</h5>
        </div>
    </div>

</template>

<script>
import BarChart from '../components/BarChart.vue'
import CategoryChart from '../components/CategoryChart.vue'


export default {
    components: {
        BarChart,
        CategoryChart,
    }
}

</script>

<style scoped>
.img-box {
    padding: 2em;
    height: 20em;
    width: 35em;
    top: 20%;
    left: 5%;
    text-align: left;
    position: absolute;
}

.text {
    text-shadow: 2px 2px 2px rgba(156, 156, 156, 0.5);
    font-weight: 400;
    font-size: 3.2em;
    color: black;
}

.imgbox {
    display: grid;
    height: 100%;
    position: relative;
    text-align: center;
    color: white;
}

.start-image {
    max-width: 100%;
    max-height: 100%;
    margin: auto;

}

.start-box {
    text-align: center;
}

.start-box h1 {
    font-weight: 700;
}



@media screen and (max-width: 772px) {


    .img-box {
        height: 20em;
        width: 15em;
        top: 5%;
        left: 2%;
        text-align: left;
        position: absolute;
    }

    .text {
        font-weight: 400;
        font-size: 1.5em;
        color: black;
    }
}
</style>