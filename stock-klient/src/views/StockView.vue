<template>
    <div class="wrapper ">

        <div class="justify-content-center">
            <h4 class="title mt-4 mb-2">Stock</h4>
            
            <SearchForm v-if="isDetailView" :showDiv="true" />

        </div>

    </div>
</template>


<script>
import axios from 'axios';

import { toHandlers } from "vue";
import Stock from "../components/Stock.vue";
import SearchForm from "../components/SearchForm.vue";


export default {
    data() {
        return {
            stocks: [],
            editingStock: null,
            isDetailView: true, 
        }
    },
    components: {
        Stock,
        SearchForm,
    },
    methods: {
        async getStock() {
            const resp = await fetch("http://127.0.0.1:8001/api/stocks");
            const data = await resp.json();
            this.stocks = data;

        },
        // async deleteStock(id) {
        //     if (confirm("Are you sure you want to delete this product?")) {
        //         const resp = await fetch("http://127.0.0.1:8001/api/stocks/" + id, {
        //             method: "DELETE",
        //             headers: {
        //                 "Accept": "application/json",
        //                 "Content-type": "application/json"
        //             }
        //         });
        //         const data = await resp.json();
        //         this.getStock();
        //     }
        // },
    },
    mounted() {
        this.getStock();
    }
}

</script>

<style scoped>


.form-control {
    width: 50%;
}


</style>