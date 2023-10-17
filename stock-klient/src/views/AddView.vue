<template>
    <div class="wrapper container">
        <div class="mb-5">
            <h4 class="title mt-4 mb-3">Add product</h4>
            <AddStock />

        </div>
        <div>

            <!-- <Stock /> -->
            <SearchForm v-if="isDetailView" :showDiv="false" />

        </div>

    </div>


    <!-- <stock v-for="stock in stocks.stocks" :stock="stock" :key="stock.id" /> -->
</template>


<script>

import { toHandlers } from "vue";

import Stock from "../components/Stock.vue";
import AddStock from "../components/Addstock.vue";
import SearchForm from "../components/SearchForm.vue";

export default {
    data() {
        return {
            stocks: [],
            editingStock: null,
            triggerChildMethod: false,
            isDetailView: true, 
        }
    },
    components: {
        Stock,
        AddStock,
        SearchForm,
    },
    methods: {
        
    }

    // methods: {
    //     async getStock() {
    //         const resp = await fetch("http://127.0.0.1:8001/api/stocks");

    //         const data = await resp.json();

    //         this.stocks = data;

    //         console.log("function has been called");

    //     },
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
    // }
    // mounted() {
    //     this.getStock();
    // }
}

</script>


<style scoped>
.title {
    font-weight: 700;
}

.article {
    background-color: rgb(38, 87, 129);
}

.article:hover {
    background-color: aliceblue;

}

.table {
    margin: 2em 0;

}
</style>
