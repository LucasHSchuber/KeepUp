<template>
    <div>
        <div v-if="showDiv">
            <div class="search-bar form-inline d-flex mt-5">
                <input @input="search" v-model="searchTerm" class="form-control mr-sm-2" type="search"
                    placeholder="Search stock (SKU, name, category)" aria-label="Search">
            </div>

            <div class="d-flex my-1">
                <div class="w-100 sort form-inline d-flex mt-4 mb-3">
                    <!-- <input @input="search" v-model="searchTerm" class="form-control mr-sm-2" type="search"
                placeholder="Search stock" aria-label="Search"> -->

                    <label class="sort-label mt-1">Sort By: &nbsp; </label>
                    <select v-model="sortBy" class="form-control sort-select form-select">
                        <option value="name">Name (A-Z)</option>
                        <option value="category">Category (A-Z)</option>
                        <option value="price">Price (Low - High)</option>
                        <option value="updated_at_desc">Date (descending)</option>
                        <option value="updated_at_asc">Date (ascending)</option>
                    </select>
                    <button @click="filter" class="submit-btn sort-btn  my-2 mx-3 my-sm-0" type="submit" title="Sort"><i
                            class="fa-solid fa-arrow-down-wide-short"></i></button>

                </div>


                <button class="toggleColumns-btn" @click="toggleColumns"><i class="fa-solid fa-eye"></i></button>


                <div class="tableSize ">
                    <button class="tableSize-btn" @click="increaseFontSize" title="scale up"><i
                            class="fa-solid fa-caret-up"></i></button>
                    <button class="tableSize-btn" @click="decreaseFontSize" title="scale down"><i
                            class="fa-solid fa-caret-down"></i></button>
                </div>
            </div>

        </div>
    </div>

    <table :style="{ fontSize: fontSize + 'px' }" class="table table-hover">
        <thead>
            <tr>
                <th scope="col">SKU </th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th v-if="showColumns" scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody v-for="stock in searchResults" :key="stock.id" class="article table-striped">
            <tr>
                <td class="align-middle"><a class="image-link" @click="openModalWithUrl(stock.image)">{{ stock.SKU }}</a>
                </td>
                <td class="align-middle">{{ stock.name }} ({{ stock.volume }})</td>
                <td class="align-middle">{{ stock.category }}</td>
                <td v-if="showColumns" class="align-middle">{{ stock.description }}</td>
                <td class="align-middle">{{ stock.price }} kr</td>
                <td class="align-middle">
                    <button @click="editStock(stock.id)" v-if="showColumns" class="edit-btn-i" title="Edit"><i
                            class="fa-regular fa-pen-to-square"></i></button>
                    <button @click="openAmountModal(stock.id)" class="num-btn-i" title="Amount"><i
                            class="fa-solid fa-hashtag"></i></button>
                    <button @click="deleteStock(stock.id)" v-if="showColumns" class="del-btn-i" title="Delete"><i
                            class="fa-solid fa-trash-can"></i></button>
                </td>

            </tr>
        </tbody>
    </table>

    <modal v-if="showModal" @close="showModal = false" :image-url="imageUrl" />
    <EditStockModal v-if="showModal2" @close="showModal2 = false" :stock="selectedProduct"
        @fetch-success="loadAllProducts" />
    <AmountModal v-if="showModal3" @close="showModal3 = false" :stock="selectedProduct" @fetch-success="loadAllProducts" />
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
            fontSize: 16,
            showColumns: true,
        };
    },
    components: {
        Modal,
        EditStockModal,
        AmountModal,
    },
    props: {
        stock: Object,
        showDiv: {
            type: Boolean,
            default: false, // Set a default value if needed
        },
    },
    created() {
        this.loadAllProducts(); // Load all products when the component is created
    },
    methods: {
        loadAllProducts() {
            axios.get('http://127.0.0.1:8001/api/stocks')
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
                this.loadAllProducts();
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
                case 'updated_at_desc':
                    this.searchResults.sort((a, b) => {
                        const dateA = new Date(a.updated_at);
                        const dateB = new Date(b.updated_at);
                        return dateB - dateA; // Sort in descending order (newest to oldest)
                    });
                    break;
                case 'updated_at_asc':
                    this.searchResults.sort((a, b) => {
                        const dateA = new Date(a.updated_at);
                        const dateB = new Date(b.updated_at);
                        return dateA - dateB; // Sort in ascending order (oldest to newest)
                    });
                    break;
                default:
                    // Default sorting logic (if needed)
                    break;
            }
        },
        increaseFontSize() {
            this.fontSize += 1; // Increase font size by 2 pixels
        },
        decreaseFontSize() {
            this.fontSize = Math.max(10, this.fontSize - 1); // Decrease font size by 2 pixels, but not less than 10
        },
        toggleColumns() {
            this.showColumns = !this.showColumns; // Toggle the visibility of the Description column
        },
    },
};

</script>

<style scoped>

</style>
