
<template>
    <!-- <div>
        Signed in as: {{ user }}
    </div> -->

    <div v-if="signedIn">
        <h6> {{ active.name }} </h6>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            active: [],
            signedIn: null,
        }
    },
    components: {

    },
    methods: {
        async activeUser() {

            // Retrieve the Bearer token from sessionStorage
            const token = sessionStorage.getItem('token');

            // Check if the token exists
            if (!token) {
                console.error('No user is logged in');
                return;
            } else {
                console.log(token);
                // Send a request to invalidate the token on the server (if supported)
                axios.get('http://127.0.0.1:8001/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        // If the request is successful
                        this.active = response.data;
                        console.log(response.data);
                    }).catch((error) => {
                        this.errors = error.response.data.errors;
                        console.error('Error loading user:', error);
                    })
            }
        }

    },
    mounted() {
        this.activeUser();
        const token = sessionStorage.getItem("token")
        this.signedIn = token
    },
}



</script>

<style scoped></style>