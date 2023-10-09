<template>
    <tbody class="">
        <tr>
            <td><a :href="stock.image" target="_blank">{{ stock.SKU }}</a></td>
            <td>{{ stock.name }}</td>
            <td>{{ stock.category }}</td>
            <td>{{ stock.description }}</td>
            <td>{{ stock.price }}</td>
            <td><button @click="$emit('deleteStock')" class="del-btn"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
    </tbody>
</template>

<script>


export default {
    props: {
        stock: Object
    }
}
</script>

<style>

.del-btn {
    background-color:transparent;
    border: none;
    color: rgb(235, 1, 1);
    width: 3em;
    height: 2em;
    transition: 0.3s;
}

.del-btn:hover {
    color: rgb(109, 0, 0);
}
</style>