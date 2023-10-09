<template>
    <!-- <div>
        <ul>
            <li v-for="grocery in groceries" :key="grocery.id">{{ grocery.name }}</li>
        </ul>
    </div> -->

    <tbody class="article table-striped">
        <tr v-for="grocery in groceries" :key="grocery.id">
            <td><a :href="grocery.image" target="_blank">{{ grocery.SKU }}</a></td>
            <td>{{ grocery.name }}</td>
            <td>{{ grocery.category }}</td>
            <td>{{ grocery.description }}</td>
            <td>{{ grocery.price }}</td>
            <td><button @click="$emit('deleteStock')" class="del-btn"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
    </tbody>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            groceries: []
        };
    },
    mounted() {
        this.fetchGroceries();
    },
    methods: {
        fetchGroceries() {
            // Assuming you have stored the authentication token in localStorage
            const token = sessionStorage.getItem('token');

            axios.get("http://127.0.0.1:8001/api/groceries", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            })
                .then(response => {
                    this.groceries = response.data;
                    console.log(this.groceries);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
};
</script>
