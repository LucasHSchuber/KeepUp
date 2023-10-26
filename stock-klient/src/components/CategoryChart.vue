<template>
    <div>
        <div class=" my-5">
            <div class="mb-5">
                <h5 class="sub-title">Amount of products in each category</h5>
                <p class="paragraph">This chart show the amount of products in each category in the stock. <br>
                    The X-axis shows the category, and the Y-axis show the amount of products in that specific category.
                </p>
            </div>
            <div v-if="showChart" class="chart-container">
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
                labels: [],
                datasets: [
                    {
                        label: 'Number of Products',
                        data: [],
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
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Category',
                        },
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Products',
                        },
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
                const response = await axios.get('http://127.0.0.1:8001/api/stocks');
                const data = response.data;

                const categories = {};
                data.forEach(product => {
                    const category = product.category;
                    categories[category] = (categories[category] || 0) + 1;
                });

                this.chartData.labels = Object.keys(categories);
                this.chartData.datasets[0].data = Object.values(categories);

                this.showChart = true;
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        Chart.register(...registerables);
        setTimeout(() => {
            this.showChart = true;
        }, 900);
    },
};
</script>

<style scoped>
.chart-container {
    max-width: 75%;
    width: 50em;
    margin: auto;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
}

.chartjs-tooltip {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.7);
    color: #ffffff;
    border-radius: 5px;
    padding: 5px 10px;
    font-family: 'Arial', sans-serif;
    font-size: 14px;
}

.chartjs-legend {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding: 10px;
    font-family: 'Arial', sans-serif;
    font-size: 16px;
}

.chartjs-legend li span {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    border-radius: 50%;
}

.chartjs-legend .product-category-1 span {
    background-color: #ff5733;
}

.chartjs-legend .product-category-2 span {
    background-color: #33ff57;
}

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


@media screen and (max-width: 772px) {
    .chart-container {
        max-width: 100%;
        width: 100%;
        height: fit-content;
        margin: auto;
    }
}
</style>
