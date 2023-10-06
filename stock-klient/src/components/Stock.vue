<template>
    <tbody class="article table-striped">
        <tr>
            <td>{{ stock.SKU }}</td>
            <td>{{ stock.name }}</td>
            <td>{{ stock.category }}</td>
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
    background-color:inherit;
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