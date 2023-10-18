<template>
    <div class="wrapper">

        <div class="justify-content-center">
            <h4 class="title mt-4 mb-3">My added products</h4>

            <Users />

            <!-- <SearchForm @deleteStock="deleteStock(stock.id)" /> -->
            <MyStock @deleteStock="deleteStock(stock.id)" />


            <!-- <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">SKU </th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Radera</th>
                    </tr>
                </thead>
                <MyStock @deleteStock="deleteStock(grocery.id)" v-for="grocery in groceries" :grocery="grocery"
                    :key="grocery.id" />
            </table> -->

        </div>

    </div>
    
 
</template>
  
<script>
import MyStock from '../components/MyStock.vue';
import SearchForm from '../components/SearchForm.vue';
import Users from '../components/Users.vue';

export default {
    data() {
        return {
            stocks: [],
            editingStock: null,
        };
    },
    components: {
        MyStock,
        SearchForm,
        Users,
    },
    
    methods: {
        // fetchGroceries() {
        //     // Assuming you have stored the authentication token in localStorage
        //     const token = sessionStorage.getItem('token');

        //     axios.get("http://127.0.0.1:8001/api/groceries", {
        //         headers: {
        //             'Authorization': `Bearer ${token}`,
        //             "Accept": "application/json",
        //             "Content-type": "application/json"
        //         }
        //     })
        //         .then(response => {
        //             this.groceries = response.data;
        //             console.log(this.groceries);
        //         })
        //         .catch(error => {
        //             console.error(error);
        //         });
        // },
        async deleteStock(id) {
            if (confirm("Are you sure you want to delete this product?")) {
                const resp = await fetch("http://127.0.0.1:8001/api/stocks/" + id, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    }
                });
                const data = await resp.json();
                this.fetchGroceries();
            }
        }
    },
    
};
</script>

<style scoped>
.title {
    font-weight: 700;
}

.form-control {
    width: 50%;
}

.table {
    margin: 2em 0;

}
</style>

  