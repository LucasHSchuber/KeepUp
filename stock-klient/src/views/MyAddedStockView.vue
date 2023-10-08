<template>
    <div class="wrapper container">

        <div class="justify-content-center">
            <h4 class="title mt-4 mb-3">My added products</h4>
            <h6 class="d-flex">By: &nbsp;
                <Users />
            </h6>

            <SearchForm @deleteStock="deleteStock(result.id)" />
    
            <table class="table table-hover">
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
                <MyStock />
            </table>

           
        </div>

    </div>
</template>
  
<script>
import MyStock from '../components/MyStock.vue';
import SearchForm from '../components/SearchForm.vue';
import Users from '../components/Users.vue';

export default {
    components: {
        MyStock,
        SearchForm,
        Users,
    }
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

  