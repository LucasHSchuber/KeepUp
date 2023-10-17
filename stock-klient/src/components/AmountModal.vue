
<template>
    <div v-if="stock" class="modal" @click="closeModal">
        <div class="modal-content">
            <h5 class="d-flex my-3 justify-content-center">Amount of products</h5>
            <h6 class="d-flex justify-content-center">{{ stock.name }}</h6>
            <span title="Close" class="close" @click="$emit('close')">&times;</span>
            <div class="modal-innercontent d-flex my-4 justify-content-center">

                <button @click="removeFromDatabase" class="counter-btn remove">-</button>
                <div class="mx-5">
                    <h3>#{{ counter }}</h3>
                </div>
                <button @click="addToDatabase" class="counter-btn add">+</button>


            </div>
            <button @click="saveAmount(stock.id)" class="save my-3">Save</button>
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
                this.$emit('close');
            }
        },
        addToDatabase() {
            console.log("adding");
            this.counter++;

        },
        removeFromDatabase() {
            console.log("removing");
            this.counter--;

        },
        saveAmount(data_id) {
            console.log("saveAmount function triggered, counter: " + this.counter);

            const updateData = {
                volume: this.counter
            };

            console.log(updateData);

            const token = sessionStorage.getItem('token');

            // Check if the token exists
            if (!token) {
                console.error('Access token not found in sessionStorage');
                return;
            }

            console.log(this.counter);
            console.log(data_id);

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
    font-size: 2em;
}
.add{
    background-color: rgb(60, 242, 60);
}
.remove{
    background-color: rgb(239, 76, 76);
}
.save{
    padding: 0.5em 1.5em;
    background-color: black;
    transition: 0.2s;
    color: white;
    border-radius: 20px;
    border: none;
   width: 6em;
    margin:auto;
}
</style>
