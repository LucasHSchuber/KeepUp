<template>
    <div class="form">
        <form @submit.prevent="addStock()" class="col-md-6">
            <!-- <h5>Formulär</h5> -->

            <div class="error-box">
                <p v-if="errors.length">
                    <b>Error messages:</b>
                <ul>
                    <li v-for="error in errors"><b>{{ error }}</b></li>
                </ul>
                </p>
            </div>

            <div class="form-group mt-2">
                <label for="sku">SKU:</label>
                <input v-model="formData.SKU" type="text" class="form-control" id="sku" aria-describedby="sku"
                    placeholder="SKU">
            </div>
            <div class="form-group mt-2">
                <label for="name">Product name:</label>
                <input v-model="formData.name" type="text" class="form-control" id="name" aria-describedby="name"
                    placeholder="Product name">
            </div>
            <!-- <div class="form-group mt-2">
                <label for="category">Category:</label>
                <input v-model="formData.category" type="text" class="form-control" id="category"
                    aria-describedby="category" placeholder="Category">
            </div> -->

            <div class="form-group mt-2">
                <label for="category">Category:</label>
                <select v-model="formData.category" class="form-select" id="category" aria-label="category" >
                    <option value="Bread">Bread</option>
                    <option value="Cold">Cold</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Dry">Dry</option>
                    <option value="Fish">Fish</option>
                    <option value="Frozen">Frozen</option>
                    <option value="Fruit & greens">Fruit & greens</option>
                    <option value="Meat">Meat</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Vegetarian">Vegetarian</option>
          
                </select>
            </div>

            <div class="form-group mt-2">
                <label for="description">Description:</label>
                <input v-model="formData.description" type="text" class="form-control" id="description"
                    aria-describedby="description" placeholder="Description">
            </div>
            <div class="form-group mt-2">
                <label for="price">Price:</label>
                <input v-model="formData.price" type="number" class="form-control" id="price" aria-describedby="price"
                    placeholder="Price">
            </div>
            <div class="form-group mt-2">
                <label for="image" class="form-label" >Product image</label>
                <input @change="handleFileUpload" class="form-control form-control-sm file-input" id="image" type="file">
            </div>

            <button type="submit" class="submit-btn mt-4">Add product &nbsp;  <i class="fa-solid fa-plus"></i></button>

            <p class="success" v-if="success">
                <b>The product is registered!</b>
            </p>
        </form>
    </div>
</template>



<script>

import axios from 'axios';

export default {

    data() {
        return {
            formData: {
                SKU: "",
                name: "",
                category: "input",
                description: "",
                price: "",
                image: null,
            },
            beauty: "",
            errors: [],
            success: false
        }
    },
    emits: ['productAdded'],
    methods: {
        handleFileUpload(event) {
            this.formData.image = event.target.files[0];
            console.log(this.image.name);
        },
        async addStock() {

            this.errors = [];
            this.errors2 = [];


            if (!this.formData.SKU) {
                this.errors.push('Enter SKU.');
                this.success = false;
            }
            if (!this.formData.name) {
                this.errors.push('Enter product name.');
                this.success = false;
            }
            if (!this.formData.category) {
                this.errors.push('Enter category.');
                this.success = false;
            }
            if (!this.formData.description) {
                this.errors.push('Write a description');
                this.success = false;
            }
            if (!this.formData.price) {
                this.errors.push('Enter price.');
                this.success = false;
            }


            if (this.formData.SKU.length > 0) {

                const token = sessionStorage.getItem('token');

                // Check if the token exists
                if (!token) {
                    console.error('Access token not found in sessionStorage');
                    return;
                } else {
                    console.log(token);
                }

                const form = new FormData();

                form.append('SKU', this.formData.SKU);
                form.append('name', this.formData.name);
                form.append('category', this.formData.category);
                form.append('description', this.formData.description);
                form.append('price', this.formData.price);
                form.append('image', this.formData.image);

                console.log(this.formData.image);
                console.log(form);

                axios.post('http://127.0.0.1:8001/api/stocks', form, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                })

                    .then((response) => {
                        // const data = await resp.json(); // vid OK svar
                        console.log(response.data);
                        this.$emit('triggerLoadallproducts');

                        this.success = true;

                        // this.SKU = "";
                        // this.name = "";
                        // this.category = "";
                        // this.description = "";
                        // this.price = "";


                    }).catch((error) => {

                        console.error('Error:', error);
                        if (error.response) {
                            console.error('Response Data:', error.response.data);
                            console.error('Response Data:', error.response.data.errors.SKU);
                            this.errors.push(error.response.data.errors.SKU);
                            this.errors.push(error.response.data.errors.image);

                            this.success = false;
                        }
                    })


            }
        }
    }
}

</script>

<style scoped>

.file-input{
    width: fit-content;
}



/* @media screen and (max-width: 771px) {
    .form-controll{
        width: 50%;
    }
} */
</style>