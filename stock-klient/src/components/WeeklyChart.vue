<template>
    <div >
        <div class=" my-5">
            <div class="mb-5">
                <h5 class="sub-title">The total amount of SKU's in stock each week</h5>
                <p class="paragraph">
                    This chart shows the amount of SKU's existing in the stock each week.
                    <br />
                    The X-axis represents weeks, and the Y-axis represents the amount of SKU's existing in the database.
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
    name: 'WeeklyChart',
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
                        title: {
                            display: true,
                            text: 'Weeks',
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

                // Group products by week and calculate the total number of products in each week
                const productsByWeek = {};
                data.forEach(product => {
                    const createdAt = new Date(product.created_at);
                    const weekNumber = this.getWeekNumber(createdAt);
                    if (!productsByWeek[weekNumber]) {
                        productsByWeek[weekNumber] = 0;
                    }
                    productsByWeek[weekNumber]++;
                });

                // Calculate the total number of products for each week
                let totalProducts = 0;
                for (const weekNumber in productsByWeek) {
                    totalProducts += productsByWeek[weekNumber];
                    productsByWeek[weekNumber] = totalProducts; // Update the count to represent total products
                }

                // Extract week numbers and product counts 
                this.chartData.labels = Object.keys(productsByWeek);
                this.chartData.datasets[0].data = Object.values(productsByWeek);

                this.showChart = true;
            } catch (error) {
                console.error(error);
            }
        },
        getWeekNumber(date) {
            const startOfYear = new Date(date.getFullYear(), 0, 1);
            const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
            const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
            return weekNumber;
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
