
<template>
    <div class="wrapper">
        <h4 class="title mt-4">Analytics</h4>

        <h5 class="title my-5">Current status:</h5>

        <div>
            <CurrentStatus />
        </div>

        <h5 class="title mt-5">Overall status:</h5>

        <div>
            <BarChart />
        </div>

        <div>
            <CategoryChart />
        </div>

        <div>
            <WeeklyChart />
        </div>
    </div>
</template>

<script>
import BarChart from '../components/BarChart.vue'
import CategoryChart from '../components/CategoryChart.vue'
import WeeklyChart from '../components/WeeklyChart.vue'
import CurrentStatus from '../components/CurrentStatus.vue'


export default {
    components: {
        BarChart,
        CategoryChart,
        WeeklyChart,
        CurrentStatus
    }
}

</script>

<style scoped>

@media screen and (max-width: 772px) {}
</style>