
<template>
    <!-- <div class="start-box container px-5 py-5">
        <h1>Start</h1>
    </div> -->
    <div class="imgbox">
        <img class="start-image " src="../images/groceries2.jpg" alt="bild-film">
        <div class="img-box">
            <h5 class="text">"Keep track, keep controll, keep up!"</h5>
        </div>
    </div>
    <div>
        
    </div>
</template>

<script>


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
    font-size: 2.5em;
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