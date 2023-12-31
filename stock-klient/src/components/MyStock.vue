<template>
    <div>
        <div class="search-bar form-inline d-flex mt-4">
            <input @input="search" v-model="searchTerm" class="form-control mr-sm-2" type="search"
                placeholder="Search stock" aria-label="Search">
        </div>

        <div class="sort form-inline d-flex mt-4 mb-3">
            <!-- <input @input="search" v-model="searchTerm" class="form-control mr-sm-2" type="search"
                placeholder="Search stock" aria-label="Search"> -->

            <label class="sort-label mt-1">Sort: &nbsp; </label>
            <select v-model="sortBy" class="form-control sort-select form-select" placeholder="Sort by..">
                <option value="category">Category (A-Z)</option>
                <option value="updated_at_desc">Date (descending)</option>
                <option value="updated_at_asc">Date (ascending)</option>
                <option value="updated_at_latest">Latest updated (descending)</option>
                <option value="name">Name (A-Z)</option>
                <option value="price">Price (Low - High)</option>
            </select>
            <button @click="filter" class="submit-btn sort-btn my-2 mx-3 my-sm-0" type="submit"> <i
                    class="fa-solid fa-arrow-down-wide-short"></i></button>
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
                <tr v-if="showZeroVolumeRows" v-for="stock in searchResults" :key="stock.id">
                    <td v-bind:class="{ 'zero-volume': stock.volume === 0 }" class="align-middle"><a class="image-link"
                            @click="openModalWithUrl(stock.image)">{{ stock.SKU }}</a></td>
                    <td v-bind:class="{ 'zero-volume': stock.volume === 0 }" class="align-middle">{{ stock.name }} ({{
                        stock.volume }})</td>
                    <td v-bind:class="{ 'zero-volume': stock.volume === 0 }" class="align-middle">{{ stock.category }}</td>
                    <td v-bind:class="{ 'zero-volume': stock.volume === 0 }" class="align-middle">{{
                        stock.description.length > 25 ? stock.description.slice(0, 25) + "..." : stock.description }}</td>
                    <td v-bind:class="{ 'zero-volume': stock.volume === 0 }" class="align-middle">{{ stock.price }} kr</td>
                    <td v-bind:class="{ 'zero-volume': stock.volume === 0 }" class="align-middle">
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
        <AmountModal v-if="showModal3" @close="showModal3 = false" :stock="selectedProduct"
            @fetch-success="fetchGroceries" />

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
            showZeroVolumeRows: true,
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
                    this.searchResults = response.data.reverse();
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
                    this.searchResults.sort((a, b) => a.name.localeCompare(b.name)); //SORT: method used to sort the elements of an array in place and return the sorted array. localCompare:method compares two strings in the current locale and returns a number indicating whether the first string comes before, after, or is the same as the second string in sort order.
                    break;
                case 'price':
                    this.searchResults.sort((a, b) => a.price - b.price);
                    break;
                case 'category':
                    this.searchResults.sort((a, b) => a.category.localeCompare(b.category));
                    break;
                case 'updated_at_desc':
                    this.searchResults.sort((a, b) => {
                        const dateA = new Date(a.created_at); // When you subtract one Date object from another it converts them to timestamps. 
                        const dateB = new Date(b.created_at);
                        return dateB - dateA;
                    });
                    break;
                case 'updated_at_asc':
                    this.searchResults.sort((a, b) => {
                        const dateA = new Date(a.created_at);
                        const dateB = new Date(b.created_at);
                        return dateA - dateB;
                    });
                    break;
                case 'updated_at_latest':
                    this.searchResults.sort((a, b) => {
                        const dateA = new Date(a.updated_at);
                        const dateB = new Date(b.updated_at);
                        return dateB - dateA;
                    });
                    break;
                default:
                    break;
            }
        },
        toggleShowZeroVolumeRows() {
            this.showZeroVolumeRows = !this.showZeroVolumeRows;
        },
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

.zero-volume {
    background-color: rgb(255, 234, 234);
}
</style>
