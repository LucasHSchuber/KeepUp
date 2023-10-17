
<template>
    <div v-if="stock" class="modal" @click="closeModal">
        <div class="modal-content">
            <h5>Amount of products {{ stock.name }}</h5>
            <span title="Close" class="close" @click="$emit('close')">&times;</span>
            <button @click="addToDatabase">Add +</button>
            <button @click="removeFromDatabase">Remove -</button>
        </div>
    </div>

    <!-- http://localhost:5174/src/images/film_img2.jpg -->
</template>

<script>
export default {
    data() {
        return {
            errors: [],
            success: false
        };
    },
    props: {
        stock: {
            type: Object,
            required: true
        }
    },
    methods: {
        closeModal(event) {
            // Close the modal only if the click event target is the modal background
            if (event.target.className === 'modal') {
                this.$emit('close');
            }
        },
        addToDatabase() {
            console.log("adding");
           
        },
        removeFromDatabase() {
            console.log("removing");
     
        },
    },
};
</script>

<style scoped>
/* Add your modal styles here */
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;

}

.modal-content {
    background: white;
    padding: 2em;
    border-radius: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    position: relative;
    width: 75%;
    max-width: 600px;

}

.close {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    font-size: 30px;
}
</style>
