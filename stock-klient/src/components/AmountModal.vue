
<template>
    <div v-if="stock" class="modal" @click="closeModal">
        <div class="modal-content">
            <h5 class="d-flex my-3 justify-content-center">Amount in stock</h5>
            <h6 class="d-flex justify-content-center">{{ stock.name }}</h6>
            <span title="Close" class="close" @click="$emit('close')">&times;</span>
            <div class="modal-innercontent d-flex mt-4 justify-content-center">
                <button @click="removeFromDatabaseZero" class="counter-btn remove mx-1">#0</button>
                <button @click="removeFromDatabase" class="counter-btn remove">-</button>
                <div class="mx-4 counter-box">
                    <h3>#{{ counter }}</h3>
                </div>
                <button @click="addToDatabase" class="counter-btn add">+</button>
                <button @click="addToDatabaseTen" class="counter-btn add mx-1">+10</button>
            </div>



            <button @click="saveAmount(stock.id)" class="save my-5">Save</button>
        </div>
    </div>

    <!-- http://localhost:5174/src/images/film_img2.jpg -->
</template>

<script>

import axios from 'axios';

export default {
    data() {
        return {
            errors: [],
            success: false,
            counter: this.stock.volume,
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
                if (confirm("You need to click the Save button not loose your changes. Do you still want tot proceed?")) {
                    this.$emit('close');
                }
            }
        },
        addToDatabase() {
            this.counter++;

        },
        removeFromDatabase() {
            this.counter--;

        },
        addToDatabaseTen() {
            this.counter += 10;

        },
        removeFromDatabaseZero() {
            this.counter = 0;
        },
        saveAmount(data_id) {

            const updateData = {
                volume: this.counter
            };

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
                body: JSON.stringify(updateData),
            })
                .then((response) => {
                    // If the request is successful
                    if (response.ok) {
                        this.$emit('fetch-success');
                        return response.json();
                    }
                    // Handle non-2xx responses here
                    throw new Error('Network response was not ok.');
                })
                .then((data) => {
                    // Handle successful response data here
                    console.log('Data successfully updated in the database:', data);
                    this.$emit('close');
                })
                .catch((error) => {
                    // om svar från api inte är OK (200)
                    console.error('Error:', error);
                    if (error.response) {
                        console.error('Response Data:', error.response.data);
                        console.error('Response Data:', error.response.data.errors.SKU);

                    }

                })
        }
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

.counter-btn {
    width: 4em;
    height: 2em;
    transition: 0.2s;
    color: white;
    border: none;
    box-shadow: 0 2px 6px rgb(233, 233, 233);
    font-size: 1.5em;
}

.counter-box {
    width: fit-content;
    margin:auto;
}

.add {
    background-color: rgb(0, 112, 0);
}

.remove {
    background-color: rgb(239, 76, 76);
}

.save {
    padding: 0.5em 1.5em;
    background-color: black;
    transition: 0.2s;
    color: white;
    border-radius: 20px;
    border: none;
    width: 6em;
    margin: auto;
}

.save:hover {
    background-color: rgb(52, 51, 51);

}

@media screen and (max-width: 772px) {}
</style>
