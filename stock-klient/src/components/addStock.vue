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
                <input v-model="SKU" type="text" class="form-control" id="sku" aria-describedby="sku" placeholder="">
            </div>
            <div class="form-group mt-2">
                <label for="name">Product name:</label>
                <input v-model="name" type="text" class="form-control" id="name" aria-describedby="name" placeholder="">
            </div>
            <div class="form-group mt-2">
                <label for="category">Category:</label>
                <input v-model="category" type="text" class="form-control" id="category" aria-describedby="category"
                    placeholder="">
            </div>
            <div class="form-group mt-2">
                <label for="description">Description:</label>
                <input v-model="description" type="text" class="form-control" id="description"
                    aria-describedby="description" placeholder="">
            </div>
            <div class="form-group mt-2">
                <label for="price">Price:</label>
                <input v-model="price" type="number" class="form-control" id="price" aria-describedby="price"
                    placeholder="">
            </div>
            <div class="form-group mt-2">
                <label for="image" class="form-label">Product image</label>
                <input class="form-control form-control-sm" id="image" v-on:change="onFileChange" type="file">
            </div>

            <button type="submit" class="submit-btn mt-4">Add product</button>

            <p class="success" v-if="success">
                <b>The product is registered!</b>
            </p>
        </form>
    </div>
</template>



<script>

export default {
    data() {
        return {
            SKU: "",
            name: "",
            category: "",
            description: "",
            price: "",
            image: "",
            beauty: "",
            errors: [],
            success: false
        }
    },
    emits: ["stockAdded"],
    methods: {
        async addStock() {

            this.errors = [];
            this.errors2 = [];

            if (!this.SKU) {
                this.errors.push('Enter SKU.');
                this.success = false;
            }
            if (!this.name) {
                this.errors.push('Enter product name.');
                this.success = false;
            }
            if (!this.category) {
                this.errors.push('Enter category.');
                this.success = false;
            }
            if (!this.description) {
                this.errors.push('Write a description');
                this.success = false;
            }
            if (!this.price) {
                this.errors.push('Enter price.');
                this.success = false;
            }


            if (this.SKU.length > 0) {

                let stockBody = {
                    SKU: this.SKU,
                    name: this.name,
                    category: this.category,
                    description: this.description,
                    price: this.price,
                    image: this.image

                };

                const resp = await fetch("http://127.0.0.1:8001/api/stocks", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        // "Authorization": "Bearer " + token
                    },
                    body: JSON.stringify(stockBody)
                });

                if (!resp.ok) {
                    this.success = true;// om svar från api inte är OK (200)
                } else {
                    const data = await resp.json(); // vid OK svar

                    this.success = true;

                    // this.SKU = "";
                    // this.name = "";
                    // this.category = "";
                    // this.description = "";
                    // this.price = "";

                    this.$emit("stockAdded");
                }


            } else {
                console.log("Det finns väl ingen produkt utan titel?");
            }



        }
    }
}

</script>

<style scoped>
.form input {
    height: 2em;
}

.submit-btn {
    padding: 0.5em 1.5em;
    background-color: black;
    transition: 0.2s;
    color: white;
    border-radius: 20px;
    border:none;

}
.submit-btn:hover {
    padding: 0.5em 1.5em;
    background-color: rgb(35, 35, 35);
}

.error-box b {
    color: red;
}

.error-box li b {
    color: red;
}

.error-box li {
    color: red;
}



/* @media screen and (max-width: 771px) {
    .form-controll{
        width: 50%;
    }
} */
</style>