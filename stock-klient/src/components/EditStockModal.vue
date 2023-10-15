<template>
    <div v-if="stock"   class="modal" @click="closeModal">
        <div class="modal-content">
            <h5>Edit product</h5>
            <span class="close" @click="$emit('close')">&times;</span>

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
                        <input v-model="stock.SKU" type="text" class="form-control" id="SKU" name="SKU"
                            aria-describedby="SKU">
                    </div>
                    <div class="form-group mt-2">
                        <label for="name">Product name:</label>
                        <input v-model="stock.name" type="text" class="form-control" id="name" name="name"
                            aria-describedby="name">
                    </div>
                    <div class="form-group mt-2">
                        <label for="category">Category:</label>
                        <input v-model="stock.category" type="text" class="form-control" id="category" name="category"
                            aria-describedby="category">
                    </div>
                    <div class="form-group mt-2">
                        <label for="description">Description:</label>
                        <input v-model="stock.description" type="text" class="form-control" id="description"
                            name="description" aria-describedby="description">
                    </div>
                    <div class="form-group mt-2">
                        <label for="price">Price:</label>
                        <input v-model="stock.price" type="number" class="form-control" id="price" name="price"
                            aria-describedby="price">
                    </div>
                    <!-- <div class="form-group mt-2">
                        <label for="image" class="form-label">Product image</label>
                        <input @change="handleFileUpload" class="form-control form-control-sm" id="image" type="file">
                    </div> -->

                    <button type="submit" class="edit-btn mt-3">Save Changes</button>

                    <p class="success" v-if="success">
                        <b>The product has been updated!</b>
                    </p>
                </form>

            </div>
            <!-- ... modal content with input fields for 'name', 'category', 'description', 'price' ... -->

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            // formData: {
            //     SKU: "",
            //     name: "",
            //     category: "",
            //     description: "",
            //     price: "",
            // },
            // beauty: "",
            errors: [],
            success: false
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
        closeModal(event) {
            // Close the modal only if the click event target is the modal background
            if (event.target.className === 'modal') {
                this.$emit('close');
            }
        },
        async saveChanges(data_id) {

            this.errors = [];
            // this.errors2 = [];

            // if (!this.formData.SKU) {
            //     this.errors.push('Enter SKU.');
            //     this.success = false;
            // }
            // if (!this.formData.name) {
            //     this.errors.push('Enter product name.');
            //     this.success = false;
            // }
            // if (!this.formData.category) {
            //     this.errors.push('Enter category.');
            //     this.success = false;
            // }
            // if (!this.formData.description) {
            //     this.errors.push('Write a description');
            //     this.success = false;
            // }
            // if (!this.formData.price) {
            //     this.errors.push('Enter price.');
            //     this.success = false;
            // }
            // Check if any of the formData properties are undefined or empty

            // for (let key in this.formData) {
            //     if (!this.formData[key]) {
            //         this.errors.push(`Enter ${key.toUpperCase()}.`);
            //     }
            // }

            // If there are errors, do not proceed with the API call
            if (this.errors.length > 0) {
                return;
            }


            // Manually collect form data
            let skuEl = document.getElementById("SKU");
            let nameEl = document.getElementById("name");
            let categoryEl = document.getElementById("category");
            let descriptionEl = document.getElementById("description");
            let priceEl = document.getElementById("price");



            let sku = skuEl.value;
            let name = nameEl.value;
            let category = categoryEl.value;
            let description = descriptionEl.value;
            let price = priceEl.value;

            // console.log(sku, name, category, description, price);

            //Prepare data object for the API request
            // let data = {
            //     sku: skuName,
            //     name: nameName,
            //     category: categoryName,
            //     description: descriptionName,
            //     price: priceName,
            // };

            const updatedData = {
                SKU: sku,
                name: name,
                category: category,
                description: description,
                price: price,
            };

            let data = JSON.stringify(updatedData);
            console.log(data);
            console.log(data_id);


            // Retrieve the Bearer token from sessionStorage
            const token = sessionStorage.getItem('token');

            // Check if the token exists
            if (!token) {
                console.error('Access token not found in sessionStorage');
                return;
            }

            fetch(`http://127.0.0.1:8001/api/stocks/` + data_id, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData),
            })

            // axios.put('http://127.0.0.1:8001/api/stocks/' + data_id, data, {
            //     method: 'PUT',
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'application/json'
            //     }
            // })

                .then((response) => {
                    // If the request is successful
                    if (response.ok) {
                        this.success = true
                        this.$emit('fetch-success', data); //sending emit to load method
                        return response.json();
                        
                    }
                    // Handle non-2xx responses here
                    throw new Error('Network response was not ok.');
                })
                .then((data) => {
                    // Handle successful response data here
                    console.log('Data successfully updated in the database:', data);
                })
                .catch((error) => {
                    // Handle errors here
                    console.error('Error when updating database:', error);
                });
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
    right: 10px;
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
