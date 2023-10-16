
<template>
    <!-- <div>
        Signed in as: {{ user }}
    </div> -->

    <div>
        <p v-if="activeUser">Signed in as: {{ activeUser.name }}</p>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            activeUser: null,
            // signedIn: null,
        }
    },
    components: {

    },
    created() {
        // Call the method to fetch active user data when the component is created
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {

            // Retrieve the Bearer token from sessionStorage
            const token = sessionStorage.getItem('token');

            // Check if the token exists
            if (!token) {
                console.error('No user is logged in');
                return;
            } else {
                // Send a request to invalidate the token on the server (if supported)
                axios.get('http://127.0.0.1:8001/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {

                        // Assuming the response contains user data
                        this.activeUser = response.data;
                        console.log(activeUser);

                        // console.log(response.data);
                    }).catch((error) => {
                        console.error('Error fetching user data:', error);
                        // console.error('Error loading user:', error);
                    })
            }
        }

    },
    watch: {
        // Watch for changes in the 'activeUser' variable
        activeUser(newValue, oldValue) {
            // Perform actions when the active user changes
            console.log(`Active user changed from ${oldValue} to ${newValue}`);
        },
    },
    // mounted() {
    //     this.activeUser();
    //     const token = sessionStorage.getItem("token")
    //     this.signedIn = token
    // },
}



</script>

<style scoped></style>