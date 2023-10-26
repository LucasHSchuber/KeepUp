<template>
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
                    <button @click="editStock(stock.id)" class="edit-btn-i"><i
                            class="fa-regular fa-pen-to-square"></i></button>
                    <button @click="deleteStock(stock.id)" class="del-btn-i"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>
        </tbody>
    </table>

    <modal v-if="showModal" @close="showModal = false" :image-url="imageUrl"></modal>
    <EditStockModal v-if="showModal2" @close="showModal2 = false" :stock="selectedProduct"
        @fetch-success="loadAllProducts" />
</template>

<script>
import axios from 'axios';

import Modal from './Modal.vue';
import EditStockModal from './EditStockModal.vue';

export default {
    components: {
        Modal,
        EditStockModal,
    },
    props: {
        stock: Object
    },
    data() {
        return {
            searchTerm: '',
            searchResults: [],
            showModal: false,
            showModal2: false,
            imageUrl: '',
            stock_id: '',
            selectedProduct: [],
        };
    },
    created() {
        // Load all products when the component is created
        this.loadAllProducts(); 
    },
    methods: {
        loadAllProducts() {
            axios.get('http://127.0.0.1:8001/api/stocks')
                .then(response => {
                    this.searchResults = response.data;
                    console.log('loadAllProducts method called');
                })
                .catch(error => {
                    console.error(error);
                });
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
        openModalWithUrl(url) {
            this.imageUrl = url;
            this.showModal = true;
        },
        async editStock(id) {
            try {
                const response = await axios.get(`http://127.0.0.1:8001/api/stocks/${id}`);
                const product = response.data;
                this.showModal2 = true;
                this.selectedProduct = product;
                console.log(this.selectedProduct);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        },
    },
};


</script>

<style>
.del-btn-i {
    background-color: transparent;
    border: none;
    color: rgb(235, 1, 1);
    width: 3em;
    height: 2em;
    transition: 0.3s;
}

.del-btn-i:hover {
    color: rgb(109, 0, 0);
}

.edit-btn-i {
    background-color: transparent;
    border: none;
    color: rgb(235, 173, 1);
    width: 3em;
    height: 2em;
    transition: 0.3s;
}

.edit-btn-i:hover {
    color: rgb(180, 132, 0);
}

.image-link {
    text-decoration: underline 1px blue;
    cursor: pointer;
}
</style>