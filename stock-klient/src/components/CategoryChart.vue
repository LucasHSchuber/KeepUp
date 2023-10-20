<template>
    <div v-if="showChart">
        <div class="wrapper my-5">
            <h5 class="title mb-5">Amount of products in each category</h5>
            <div class="chart-container">
                <Bar ref="categoryChart" :data="chartData" :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { Bar } from 'vue-chartjs';

Chart.register(...registerables);

export default {
    name: 'CategoryChart',
    components: {
        Bar,
    },
    data() {
        return {
            showChart: false,
            chartData: {
                labels: [], // Categories will be added here
                datasets: [
                    {
                        label: 'Number of Products',
                        data: [], // Product counts will be added here
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            chartOptions: {
                responsive: true,
                scales: {
                    x: {
                        stacked: true, // For grouped bar chart
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        };
    },
    created() {
        this.fetchCategoryData();
    },
    methods: {
        async fetchCategoryData() {
            try {
                const response = await axios.get('http://127.0.0.1:8001/api/stocks'); // API endpoint for all products
                const data = response.data;

                // Calculate product counts for each category
                const categories = {};
                data.forEach(product => {
                    const category = product.category;
                    categories[category] = (categories[category] || 0) + 1;
                });

                // Extract category names and product counts from calculated data and update chart data
                this.chartData.labels = Object.keys(categories);
                this.chartData.datasets[0].data = Object.values(categories);

                this.showChart = true; // Show the chart once data is fetched and processed
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        Chart.register(...registerables);
        setTimeout(() => {
            this.showChart = true;
        }, 1200);
    },
};
</script>

<style scoped>
.wrapper {
}

.chart-container {
    max-width: 75%;
    width: 50em;
    margin: auto;
    height: 400px;
    /* Set your desired height */
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
}

/* Customize the chart tooltip style */
.chartjs-tooltip {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    border-radius: 5px;
    padding: 5px 10px;
    font-family: 'Arial', sans-serif;
    font-size: 14px;
}

/* Customize the chart legend style */
.chartjs-legend {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 10px;
    font-family: 'Arial', sans-serif;
    font-size: 16px;
}

/* Customize the chart legend labels */
.chartjs-legend li span {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    border-radius: 50%;
}

/* Customize the colors of the legend labels */
.chartjs-legend .product-category-1 span {
    background-color: #ff5733;
    /* Change color for category 1 */
}

.chartjs-legend .product-category-2 span {
    background-color: #33ff57;
    /* Change color for category 2 */
}

/* Add animation to the chart */
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.show-chart-animation {
    animation: fadeIn 1s ease-in-out;
}


@media screen and (max-width: 992px) {
    .chart-container {
        max-width: 100%;
        width: fit-content;
        margin: auto;
        height: fit-content;

    }
}
</style>
