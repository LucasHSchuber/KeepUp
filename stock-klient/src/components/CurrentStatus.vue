

<template>
    <div class="d-flex justify-content-evenly">
        <div>
            <h6 class="mb-3">Amount of SKU's in stock</h6>

            <div class="box align-middle">
                <div class="value-box">
                    <h2>{{ numberOfProducts }}</h2>
                </div>
            </div>
        </div>

        <div class="mx-3">
            <h6 class="mb-3">Amount of categories</h6>

            <div class="box">
                <h2>{{ numberOfCategories }}</h2>
            </div>
        </div>

        <div>
            <h6 class="mb-3">Amount of products in stock</h6>

            <div class="box">
                <h2>{{ totalVolume }}</h2>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            numberOfProducts: 0,
            numberOfCategories: 0,
            totalVolume: 0,
        };
    },
    mounted() {
        this.fetchProductCount();
        this.fetchCategoryCount();
        this.fetchTotalVolume();
    },
    methods: {
        async fetchProductCount() {
            try {
                const response = await axios.get('http://127.0.0.1:8001/api/stocks');
                const data = response.data;
                this.numberOfProducts = data.length;

            } catch (error) {
                console.error(error);
            }
        },
        async fetchCategoryCount() {
            try {
                const response = await axios.get('http://127.0.0.1:8001/api/stocks');
                const data = response.data;
                const CatAmount = new Set(data.map(product => product.category)); //SET samlar alla olika värden
                this.numberOfCategories = CatAmount.size;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchTotalVolume() {
            try {
                const response = await axios.get('http://127.0.0.1:8001/api/stocks');
                const data = response.data;

                // Calculate total volume by summing up 'volume' column in the data
                const totalVolume = data.reduce((accumulator, product) => {
                    return accumulator + product.volume;
                }, 0);

                // Set the total volume to be displayed in the h2 element
                this.totalVolume = totalVolume;
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>

<style scoped>
.box {
    height: 100px;
    width: 100px;
    border: 0.5px solid rgb(30, 30, 30);
    color: black;
    background-color: transparent;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    /* Center horizontally */
    align-items: center;
    /* Center vertically */
    margin: auto;
    transition: 0.2s;
    cursor: pointer;
}

/* .box:hover {
    background-color: rgba(30, 30, 30, 0.8);
    color: white;
} */
</style>
