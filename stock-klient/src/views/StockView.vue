<template>
    <div class="wrapper container">

        <!-- Skriver ut alla stocker från APIt -->
        <div class="justify-content-center">
            <h4 class="title mt-4 mb-3">Stock</h4>

            <SearchForm />

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">SKU</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Radera</th>
                    </tr>
                </thead>
                <Stock @deleteStock="deleteStock(stock.id)" v-for="stock in stocks" :stock="stock" :key="stock.id" />
            </table>
        </div>

    </div>


    <!-- <stock v-for="stock in stocks.stocks" :stock="stock" :key="stock.id" /> -->
</template>


<script>

import { toHandlers } from "vue";
import Stock from "../components/Stock.vue";
import SearchForm from "../components/SearchForm.vue";
// import addStock from "../components/addStock.vue";

export default {
    data() {
        return {
            stocks: []
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

<style scoped>
.title {
    font-weight: 700;
}

.form-control {
    width: 50%;
}

.table {
    margin: 2em 0;

}
</style>
