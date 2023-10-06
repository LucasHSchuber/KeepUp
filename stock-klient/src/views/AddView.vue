<template>
    <div class="wrapper container">
        <h4 class="title mt-4 mb-3">Add product</h4>

        <!-- Fomulär -->
        <addStock @stockAdded="getStock()" />

        
        <!-- Skriver ut alla stocker från APIt -->
        <div class="justify-content-center">
            <h4 class="title mt-4 mb-3">Added products</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">SKU</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Radera</th>
                    </tr>
                </thead>
                <Stock @deleteStock="deleteStock(stock.id)" v-for="stock in stocks" :stock="stock" :key="stock.id" />
            </table>
        </div>

    </div>


    <!-- <stock v-for="stock in stocks.stocks" :stock="stock" :key="stock.id" /> -->
</template>


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

<script>

import { toHandlers } from "vue";

import Stock from "../components/Stock.vue";
import addStock from "../components/addStock.vue";

export default {
    data() {
        return {
            stocks: []
        }
    },
    components: {
        Stock,
        addStock
    },
    methods: {
        async getStock() {
            const resp = await fetch("http://127.0.0.1:8001/api/stocks");

            const data = await resp.json();

            this.stocks = data;

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
    },
    mounted() {
        this.getStock();
    }
}

</script>
