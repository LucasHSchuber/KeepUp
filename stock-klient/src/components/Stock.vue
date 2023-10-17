<template>
    <tbody>
        <tr>
            <td><a class="image-link" @click="openModalWithUrl(stock.image)">{{ stock.SKU }}</a></td>
            <td>{{ stock.name }}</td>
            <td>{{ stock.category }}</td>
            <td>{{ stock.description }}</td>
            <td>{{ stock.price }} kr</td>
            <td>
                <button @click="editStock(stock)" class="edit-btn-i"><i class="fa-regular fa-pen-to-square"></i></button>
                <button @click="$emit('deleteStock')" class="del-btn-i"><i class="fa-solid fa-trash-can"></i></button>
            </td>
        </tr>
    </tbody>

    <modal v-if="showModal" @close="showModal = false" :image-url="imageUrl"></modal>
    <EditStockModal v-if="showModal2" @close="showModal2 = false" :stock="stock_id" />
</template>

<script>
import Modal from './Modal.vue';
import EditStockModal from '../components/EditStockModal.vue';

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
            showModal: false,
            showModal2: false,
            imageUrl: '',
            stock_id: '',
        };
    },
    methods: {
        openModalWithUrl(url) {
            this.imageUrl = url;
            this.showModal = true;
        },
        editStock(stock) {
            // Emit an event to parent component to open the modal
            this.showModal2 = true;
            this.stock_id = stock;
            console.log(this.stock_id);
        },
    }
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