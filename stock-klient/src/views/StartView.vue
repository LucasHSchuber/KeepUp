
<template>
    <div class="start-box container px-5 py-5">
        <h1>Start</h1>
       <User v-for="users in user" :key="users.id"/>
    </div>
</template>

<script>

import axios from 'axios'
import User from "../components/User.vue";

export default{
    components: {
        User,
    },
    mounted() {
        axios.get('http://127.0.0.1:8001/api/user').then((res) =>{
            this.user = res.data
            console.log(this.user);
        })
    }
}


</script>

<style scoped>

.centered {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
    font-size: 2em;
    color: black;
}
.start-box{
    text-align: center;
}
.start-box h1{
    font-weight: 700;
}

</style>