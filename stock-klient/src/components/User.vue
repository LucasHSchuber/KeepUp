<!-- 
<template>
    <div class="start-box container px-5 py-5">
        <h1>Start</h1>
        {{ user.name }}
        {{ user.email }}
    </div>
</template>

<script>
import axios from 'axios'

export default{
    data() {
        return{
            user: null
        }
    },
    mounted() {
        axios.get('http://127.0.0.1:8001/api/user').then((res) =>{
            this.user = res.data
            console.log(this.user);
        })
    }
}
</script> -->