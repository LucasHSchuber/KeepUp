<template>
    <div v-if="stock" class="modal" @click="closeModal">
        <div class="modal-content">
            <h5>Edit product</h5>
            <span title="Close" class="close" @click="$emit('close')">&times;</span>

            <div class="form">
                <form @submit.prevent="saveChanges(stock.id)" class="col-md-6">
                    <!-- <h5>Formulär</h5> -->

                    <div class=" error-box">
                        <p v-if="errors.length">
                            <b>Error messages:</b>
                        <ul>
                            <li v-for="error in errors"><b>{{ error }}</b></li>
                        </ul>
                        </p>
                    </div>

                    <div class="form-group mt-2">
                        <label for="SKU">SKU:</label>
                        <input v-model="stock.SKU" type="text" class="form-control" id="SKU_edit" name="SKU"
                            aria-describedby="SKU">
                    </div>
                    <div class="form-group mt-2">
                        <label for="name">Product name:</label>
                        <input v-model="stock.name" type="text" class="form-control" id="name_edit" name="name"
                            aria-describedby="name">
                    </div>
                    <!-- <div class="form-group mt-2">
                        <label for="category">Category:</label>
                        <input v-model="stock.category" type="text" class="form-control" id="category_edit" name="category"
                            aria-describedby="category">
                    </div> -->
                    <div class="form-group mt-2">
                        <label for="category">Category:</label>
                        <select v-model="stock.category" class="form-select" id="category_edit" aria-label="category">
                            <option value="Bread">Bread</option>
                            <option value="Cold">Cold</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Dry">Dry</option>
                            <option value="Fish">Fish</option>
                            <option value="Frozen">Frozen</option>
                            <option value="Fruit">Fruit</option>
                            <option value="Meat">Meat</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Vegetarian">Vegetarian</option>

                        </select>
                    </div>
                    <div class="form-group mt-2">
                        <label for="description">Description:</label>
                        <input v-model="stock.description" type="text" class="form-control" id="description_edit"
                            name="description" aria-describedby="description">
                    </div>
                    <div class="form-group mt-2">
                        <label for="price">Price:</label>
                        <input v-model="stock.price" type="number" class="form-control" id="price_edit" name="price"
                            aria-describedby="price">
                    </div>
                    <div class="form-group mt-2">
                        <label for="image" class="form-label">Product image</label>
                        <input @change="handleFileUpload" class="form-control form-control-sm" id="image_edit" type="file">
                    </div>

                    <button type="submit" class="edit-btn mt-3">Save Changes</button>

                    <p class="success" v-if="success">
                        <b>The product has been updated!</b>
                    </p>
                </form>

            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            // stock: {
            //     SKU: "",
            //     name: "",
            //     category: "",
            //     description: "",
            //     price: "",
            //     image: null,
            // },
            // beauty: "",
            errors: [],
            success: false,
            image: null,
        }
    },
    props: {
        stock: {
            type: Object,
            required: true
        }
    },
    components: {

    },
    methods: {
        handleFileUpload(event) {
            this.image = event.target.files[0];
            console.log("handfileupload method triggered: " + this.image.name);
        },
        closeModal(event) {
            // Close the modal only if the click event target is the modal background
            if (event.target.className === 'modal') {
                this.$emit('close');
            }
        },
        async saveChanges(data_id) {

            this.errors = [];

            // If there are errors, do not proceed with the API call
            if (this.errors.length > 0) {
                return;
            }


            // Manually collect form data
            let skuEl = document.getElementById("SKU_edit");
            let nameEl = document.getElementById("name_edit");
            let categoryEl = document.getElementById("category_edit");
            let descriptionEl = document.getElementById("description_edit");
            let priceEl = document.getElementById("price_edit");


            let sku = skuEl.value;
            let name = nameEl.value;
            let category = categoryEl.value;
            let description = descriptionEl.value;
            let price = priceEl.value;


            // const updatedData = {
            //     SKU: sku,
            //     name: name,
            //     category: category,
            //     description: description,
            //     price: price,
            // };

            const form = new FormData();

            form.append('SKU', sku);
            form.append('name', name);
            form.append('category', category);
            form.append('description', description);
            form.append('price', price);

            // Check if there is an image assigned to the input field with ID 'image_edit'
            if (this.image) {
                form.append('image', this.image);
            }

            // Retrieve the Bearer token from sessionStorage
            const token = sessionStorage.getItem('token');

            // Check if the token exists
            if (!token) {
                console.error('Access token not found in sessionStorage');
                return;
            }

            // console.log(updatedData);

            // fetch(`http://127.0.0.1:8001/api/stocks/` + data_id, {
            //     method: 'PUT',
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(updatedData),
            // })

            axios.put('http://127.0.0.1:8001/api/stocks/' + data_id, form, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {

                    console.log(response.data);

                    this.success = true;
                    this.$emit('fetch-success');
                    this.$emit('close');

                    // this.SKU = "";
                    // this.name = "";
                    // this.category = "";
                    // this.description = "";
                    // this.price = "";


                }).catch((error) => {
                    // om svar från api inte är OK (200)
                    console.error('Error:', error);
                    if (error.response) {
                        console.error('Response Data:', error.response.data);
                        console.error('Response Data:', error.response.data.errors.SKU);
                        this.errors.push(error.response.data.errors.SKU);
                        this.errors.push(error.response.data.errors.image);

                        this.success = false;
                    }
                })

            // .then((response) => {
            //     // If the request is successful
            //     if (response.ok) {
            //         this.success = true
            //         this.$emit('fetch-success'); //sending emit to load method
            //         this.$emit('close');
            //         return response.json();

            //     }
            //     // Handle non-2xx responses here
            //     throw new Error('Network response was not ok.');
            // })
            // .then((data) => {
            //     // Handle successful response data here
            //     console.log('Data successfully updated in the database:', data);
            // })
            // .catch((error) => {
            //     // Handle errors here
            //     console.error('Error when updating database:', error);
            // });
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
    right: 15px;
    cursor: pointer;
    font-size: 30px;
}

.form input {
    height: 2em;
}

.edit-btn {
    padding: 0.5em 1.5em;
    background-color: black;
    transition: 0.2s;
    color: white;
    border-radius: 20px;
    border: none;

}

.edit-btn:hover {
    padding: 0.5em 1.5em;
    background-color: rgb(35, 35, 35);
}
</style>
