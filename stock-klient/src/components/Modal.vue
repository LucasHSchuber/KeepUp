<template>
    
    <div class="modal" @click="closeModal">
        <div class="modal-content">
            <span title="Close" class="close" @click="$emit('close')">&times;</span>
            <img :src="imageUrl" alt="Image of product">
        </div>
    </div>

</template>

<script>

export default {
    name: 'Modal',
    props: {
        imageUrl: {
            type: String,
            required: true
        }
    },
    methods: {
        closeModal(event) {
            // Close modal if click outisde modal
            if (event.target.className === 'modal') {
                this.$emit('close');
            }
        }
    }
};

</script>

<style scoped>
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
    right: 20px;
    cursor: pointer;
    font-size: 30px;
}

img {
    max-width: 100%;
    max-height: 80vh;
    margin: 0 auto;
}

@media screen and (max-width: 772px) {
    .close {
        font-size: 50px;
        top: 1px;
        right: 20px;
    }

}
</style>
