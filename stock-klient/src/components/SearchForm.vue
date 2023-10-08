<template>
    <div>
        <div class="form-inline d-flex my-5">
            <input @input="search" v-model="searchTerm" class="form-control mr-sm-2" type="search" placeholder="Search"
                aria-label="Search">
            <button @click="search" class="btn btn-outline-success my-2 mx-1 my-sm-0" type="submit">Search</button>
        </div>
        <!-- <ul>
            <li v-for="result in searchResults" :key="result.id">
                {{ result.name }} - {{ result.category }}
            </li>
        </ul> -->


        <table class="table">
            <!-- <thead>
                <tr>
                    <th scope="col">SKU </th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Radera</th>
                </tr>
            </thead> -->
            <tbody class="article table-striped">
                <tr v-for="result in searchResults" :key="result.id">
                    <td><a :href="result.image" target="_blank">{{ result.SKU }}</a></td>
                    <td>{{ result.name }}</td>
                    <td>{{ result.category }}</td>
                    <td>{{ result.description }}</td>
                    <td>{{ result.price }}</td>
                    <td><button @click="$emit('deleteStock')" class="del-btn"><i class="fa-solid fa-trash-can"></i></button>
                    </td>

                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            searchTerm: '',
            searchResults: []
        };
    },
    props: {
        result: Object
    },
    methods: {
        search() {
            axios.get(`http://127.0.0.1:8001/api/search?q=${this.searchTerm}`)
                .then(response => {
                    this.searchResults = response.data;
                    console.log(this.searchResults);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    async deleteStock(id) {
        const resp = await fetch("http://127.0.0.1:8001/api/stocks/" + id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        });
        const data = await resp.json();
        this.getStock();
    }
};

</script>
