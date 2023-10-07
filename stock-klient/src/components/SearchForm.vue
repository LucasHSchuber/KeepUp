<template>
    <div>
        <div class="form-inline d-flex my-5">
            <input @input="search" v-model="searchTerm" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            <button @click="search" class="btn btn-outline-success my-2 mx-1 my-sm-0" type="submit">Search</button>
        </div>
        <ul>
            <li v-for="result in searchResults" :key="result.id">
                {{ result.name }} - {{ result.category }}
            </li>
        </ul>
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
    }
};
</script>
