<template>
    <div class="wrapper container">

        <div class="justify-content-center">
            <h4 class="title mt-4 mb-3">My added products</h4>
            <SearchForm @deleteStock="deleteStock(result.id)" />
            <MyStock />
        </div>

    </div>
</template>
  
<script>
import MyStock from '../components/MyStock.vue';
import SearchForm from '../components/SearchForm.vue';

export default {
    components: {
        MyStock,
        SearchForm,
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

  