
<template>
    <!-- <div>
        Signed in as: {{ user }}
    </div> -->

    <div class="d-flex mt-3">
        <p v-if="activeUser">Signed in as: {{ activeUser.name }}</p>
    </div>
</template>

<script>

import axios from 'axios';

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
         fetchUserData() {
            const token = sessionStorage.getItem('token');

            if (!token) {
                console.error('No user is logged in');
                return;
            } else {
                axios.get('http://127.0.0.1:8001/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {

                        this.activeUser = response.data;
                        console.log(activeUser);

                    }).catch((error) => {
                        console.error('Error fetching user data:', error);
                    })
            }
        }

    },
    watch: {
        // Watch changes in activeUser variable
        activeUser(newValue, oldValue) {
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