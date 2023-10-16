<template>
    <!-- <div>
        <ul>
            <li v-for="grocery in groceries" :key="grocery.id">{{ grocery.name }}</li>
        </ul>
    </div> -->

    <tbody class="article table-striped">
        <tr >
            <td><a class="image-link" @click="openModalWithUrl(grocery.image)">{{ grocery.SKU }}</a></td>
            <td>{{ grocery.name }}</td>
            <td>{{ grocery.category }}</td>
            <td>{{ grocery.description }}</td>
            <td>{{ grocery.price }}</td>
            <td><button @click="$emit('deleteStock')" class="del-btn-i"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
    </tbody>

    <modal v-if="showModal" @close="showModal = false" :image-url="imageUrl"></modal>

</template>

<script>
import Modal from './Modal.vue';

export default {
    components: {
        Modal,
    },
    props: {
        grocery: Object
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
        // editStock(stock) {
        //     // Emit an event to parent component to open the modal
        //     this.showModal2 = true;
        //     this.stock_id = stock;
            
        // },
    }
};


</script>
