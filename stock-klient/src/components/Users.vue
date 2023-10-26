
<template>
    <div class="d-flex mt-3">
        <p v-if="activeUser" class="activeuser">Signed in as: {{ activeUser.name }}</p>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            activeUser: "",
            // signedIn: null,
        }
    },
    components: {

    },
    created() {
        // Call method when component is mounted
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
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
                        // this.$emit('LoggedIn');

                    }).catch((error) => {
                        console.error('Error fetching user data:', error);
                    })
            }
        }

    },
    // watch: {
    //     // Watch changes in activeUser variable
    //     activeUser(newValue, oldValue) {
    //         console.log(`Active user changed from ${oldValue} to ${newValue}`);
    //     },
    // },
    // mounted() {
    //     this.activeUser();
    //     const token = sessionStorage.getItem("token")
    //     this.signedIn = token
    // },
}



</script>

<style scoped>
@media screen and (max-width: 992px) {
    .activeuser {
        font-style: italic;
    }
}
</style>