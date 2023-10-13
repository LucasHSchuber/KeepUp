<template>
    <tbody>
        <tr>
            <td><a class="" @click="openModalWithUrl(stock.image)">{{ stock.SKU }}</a></td>
            <td>{{ stock.name }}</td>
            <td>{{ stock.category }}</td>
            <td>{{ stock.description }}</td>
            <td>{{ stock.price }}</td>
            <td><button @click="$emit('deleteStock')" class="del-btn"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
    </tbody>

    <modal v-if="showModal" @close="showModal = false" :image-url="imageUrl"></modal>
</template>

<script>
import Modal from './Modal.vue';

export default {
    components: {
        Modal
    },
    props: {
        stock: Object
    },
    data() {
        return {
            showModal: false,
            imageUrl: '',
        };
    },
    methods: {
        openModalWithUrl(url) {
            this.imageUrl = url;
            this.showModal = true;
            console.log(this.imageUrl);
        }
    }
};


</script>

<style>
.del-btn {
    background-color: transparent;
    border: none;
    color: rgb(235, 1, 1);
    width: 3em;
    height: 2em;
    transition: 0.3s;
}

.del-btn:hover {
    color: rgb(109, 0, 0);
}
</style>