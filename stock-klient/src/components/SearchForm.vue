<template>
    <div>
        <div class="form-inline d-flex mt-5 mb-3">
            <input @input="search" v-model="searchTerm" class="form-control mr-sm-2" type="search"
                placeholder="Search stock" aria-label="Search">
            <button @click="search" class="btn btn-outline-success my-2 mx-1 my-sm-0" type="submit">Search</button>
        </div>

        <table class="table table-hover">
            <tbody class="article table-striped">
                <tr v-for="result in searchResults" :key="result.id">
                    <td><a class="image-link" @click="openModalWithUrl(result.image)">{{ result.SKU }}</a></td>
                    <td>{{ result.name }}</td>
                    <td>{{ result.category }}</td>
                    <td>{{ result.description }}</td>
                    <td>{{ result.price }} kr</td>
                    <td>
                        <button @click="editStock(result.id)" class="edit-btn-i"><i
                                class="fa-regular fa-pen-to-square"></i></button>
                        <button @click="deleteStock(result.id)" class="del-btn-i"><i
                                class="fa-solid fa-trash-can"></i></button>
                    </td>

                </tr>
            </tbody>
        </table>

        <modal v-if="showModal" @close="showModal = false" :image-url="imageUrl"></modal>
        <EditStockModal v-if="showModal2" @close="showModal2 = false" :stock="stock_id" />

    </div>
</template>

<script>
import axios from 'axios';

import Modal from './Modal.vue';
import EditStockModal from './EditStockModal.vue';

export default {
    data() {
        return {
            searchTerm: '',
            searchResults: [],
            showModal: false,
            showModal2: false,
            imageUrl: '',
            stock_id: '',
        };
    },
    components: {
        Modal,
        EditStockModal,
    },
    props: {
        result: Object
    },
    created() {
        this.loadAllProducts(); // Load all products when the component is created
    },
    methods: {
        loadAllProducts() {
            axios.get('http://127.0.0.1:8001/api/stocks')
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
        editStock(id) {
            // Emit an event to parent component to open the modal
            this.showModal2 = true;
            this.stock_id = id;
            console.log(id);

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
        }
    },
};

</script>

<style scoped>
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
