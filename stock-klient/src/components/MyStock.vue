<template>
    <!-- <div>
        <ul>
            <li v-for="grocery in groceries" :key="grocery.id">{{ grocery.name }}</li>
        </ul>
    </div> -->

    <tbody class="article table-striped">
        <tr >
            <td><a :href="grocery.image" target="_blank">{{ grocery.SKU }}</a></td>
            <td>{{ grocery.name }}</td>
            <td>{{ grocery.category }}</td>
            <td>{{ grocery.description }}</td>
            <td>{{ grocery.price }}</td>
            <td><button @click="$emit('deleteStock')" class="del-btn"><i class="fa-solid fa-trash-can"></i></button></td>
        </tr>
    </tbody>
</template>

<script>


export default {
    props: {
        grocery: Object
    }
};
</script>
