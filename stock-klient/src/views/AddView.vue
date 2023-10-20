<template>
    <div class="wrapper">
        <div class="mb-5">
            <h4 class="title mt-4 mb-3">Add product</h4>
            <AddStock @triggerLoadallproducts="Load" />

        </div>
        <div>

            <SearchForm v-if="isDetailView" :showDiv="false" ref="RunLoadAllProducts" />

        </div>

    </div>
</template>


<script>

import { toHandlers } from "vue";

import Stock from "../components/Stock.vue";
import AddStock from "../components/Addstock.vue";
import SearchForm from "../components/SearchForm.vue";

export default {
    data() {
        return {
            stocks: [],
            editingStock: null,
            triggerChildMethod: false,
            isDetailView: true,
        }
    },
    components: {
        Stock,
        AddStock,
        SearchForm,
    },
    methods: {
        Load() {
            this.$refs.RunLoadAllProducts.loadAllProducts();

        }
    }
}

</script>


<style scoped>


</style>
