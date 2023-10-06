
<template>
    <div class="start-box container px-5 py-5">
        <h1>Start</h1>
        {{ users.email }}
    </div>
</template>

<script>
import axios from 'axios'

export default{
    data() {
        return{
            user: []
        }
    },
    props: {
        user: Object
    },
    mounted() {
        axios.get('http://127.0.0.1:8001/api/user')
        .then (response => this.user = response.data)
        // .then((res) =>{
        //     this.user = res.data
        //     console.log(this.user);
        // })
    }
}
</script>