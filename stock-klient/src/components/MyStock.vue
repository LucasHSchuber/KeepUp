<template>
    <div>
        <div class="search-bar form-inline d-flex mt-5">
            <input @input="search" v-model="searchTerm" class="form-control mr-sm-2" type="search"
                placeholder="Search stock" aria-label="Search">
        </div>

        <div class="sort form-inline d-flex mt-4 mb-3">
            <!-- <input @input="search" v-model="searchTerm" class="form-control mr-sm-2" type="search"
                placeholder="Search stock" aria-label="Search"> -->

            <label class="sort-label mt-1">Sort By: &nbsp; </label>
            <select v-model="sortBy" class="form-control sort-select form-select" placeholder="Sort by..">
                <option value="name">Name (A-Z)</option>
                <option value="price">Price (Low - High)</option>
                <option value="category">Category (A-Z)</option>
            </select>
            <button @click="filter" class=" sort-btn btn btn-outline-success my-2 mx-1 my-sm-0" type="submit">Sort</button>
        </div>

        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">SKU </th>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody class="article table-striped">
                <tr v-for="stock in searchResults" :key="stock.id">
                    <td><a class="image-link" @click="openModalWithUrl(stock.image)">{{ stock.SKU }}</a></td>
                    <td>{{ stock.name }}</td>
                    <td>{{ stock.category }}</td>
                    <td>{{ stock.description }}</td>
                    <td>{{ stock.price }} kr</td>
                    <td>
                        <button @click="editStock(stock.id)" class="edit-btn-i" title="Edit"><i
                                class="fa-regular fa-pen-to-square"></i></button>
                        <button @click="openAmountModal(stock.id)" class="num-btn-i" title="Amount"><i
                                class="fa-solid fa-hashtag"></i></button>
                        <button @click="deleteStock(stock.id)" class="del-btn-i" title="Delete"><i
                                class="fa-solid fa-trash-can"></i></button>
                    </td>

                </tr>
            </tbody>
        </table>

        <modal v-if="showModal" @close="showModal = false" :image-url="imageUrl"></modal>
        <EditStockModal v-if="showModal2" @close="showModal2 = false" :stock="selectedProduct"
            @fetch-success="fetchGroceries" />
        <AmountModal v-if="showModal3" @close="showModal3 = false" :stock="selectedProduct" />

    </div>
</template>

<script>
import axios from 'axios';

import Modal from './Modal.vue';
import EditStockModal from './EditStockModal.vue';
import AmountModal from './AmountModal.vue';


export default {
    data() {
        return {
            searchTerm: '',
            searchResults: [],
            showModal: false,
            showModal2: false,
            showModal3: false,
            imageUrl: '',
            stock_id: '',
            selectedProduct: [],
        };
    },
    components: {
        Modal,
        EditStockModal,
        AmountModal,
    },
    props: {
        stock: Object
    },
    created() {
        this.fetchGroceries(); // Load all products when the component is created
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
                    this.searchResults = response.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        search() {
            axios.get(`http://127.0.0.1:8001/api/search?q=${this.searchTerm}`)
                .then(response => {
                    this.searchResults = response.data;
                    console.log(this.searchResults);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        openModalWithUrl(url) {
            this.imageUrl = url;
            this.showModal = true;
        },
        async openAmountModal(id) {
            try {
                const response = await axios.get(`http://127.0.0.1:8001/api/stocks/${id}`);
                const stock = response.data;
                // Emit an event to parent component to open the modal
                console.log("opened " + stock);
                this.showModal3 = true;
                this.selectedProduct = stock;
                console.log(this.selectedProduct);

            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        },
        async editStock(id) {
            try {
                const response = await axios.get(`http://127.0.0.1:8001/api/stocks/${id}`);
                const product = response.data;
                // Emit an event to parent component to open the modal
                this.showModal2 = true;
                this.selectedProduct = product;
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        },
        async deleteStock(id) {
            if (confirm("Are you sure you want to delete this product?")) {
                const resp = await fetch("http://127.0.0.1:8001/api/stocks/" + id, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    }
                });
                const data = await resp.json();
                this.fetchGroceries();
            }
        },
        filter() {
            axios.get(`http://127.0.0.1:8001/api/search?q=${this.searchTerm}`)
                .then(response => {
                    this.searchResults = response.data;
                    this.sortResults(); // Sort the results after receiving data
                })
                .catch(error => {
                    console.error(error);
                });
        },
        sortResults() {
            switch (this.sortBy) {
                case 'name':
                    this.searchResults.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'price':
                    this.searchResults.sort((a, b) => a.price - b.price);
                    break;
                case 'category':
                    this.searchResults.sort((a, b) => a.category.localeCompare(b.category));
                    break;
                default:
                    // Default sorting logic (if needed)
                    break;
            }
        }
    },
};

</script>

<style scoped>
.search-bar {
    width: 50em;
    max-width: 75%;
}

.select {
    width: 10em;

    max-width: 75%;
}
</style>
