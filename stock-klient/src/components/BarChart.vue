<template>
  <div v-if="showChart">
    <div class=" my-5">
      <div class="mb-5">
        <h5 class="title">Number of products added per day</h5>
        <p>This chart show the amount of number added to the stock each day. <br>
          The X-axis shows the date, and the Y-axis show the amount of product added that date.
        </p>
      </div>
      <div class="chart-container">
        <Bar ref="myChart" :data="chartData" :options="chartOptions" />
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
  name: 'BarChart',
  components: {
    Bar
  },

  data() {
    return {
      showChart: false,
      chartData: {
        labels: [],
        datasets: [{
          label: 'Number of Products',
          data: [],
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }]
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            time: {
              unit: 'day',
              tooltipFormat: 'll',
            },
            labels: [],
          },
          y: {
            beginAtZero: true,
          },
        }
      }
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    chartData: {
      handler: 'updateChart',
      deep: true,
    },
  },
  methods: {
    fetchData() {
      axios.get('http://127.0.0.1:8001/api/stocks')
        .then(response => {
          const data = response.data;
          const formattedData = data.map(item => {
            const createdAt = new Date(item.created_at);
            const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
            return formattedDate; // Only include the formatted date
          });
          this.updateChartData(formattedData);

        })
        .catch(error => {
          console.error(error);
        });
    },
    getCountsByDate(products) {
      const countsByDate = {};
      products.forEach(product => {
        const createdAt = product.created_at;
        if (createdAt) {
          const datePart = createdAt.split('T')[0]; // Extract date part from created_at
          countsByDate[datePart] = (countsByDate[datePart] || 0) + 1;
        }
      });

      console.log(countsByDate); // Log countsByDate
      return countsByDate;

    },
    updateChartData(formattedData) {
      const countsByDate = {};

      formattedData.forEach(date => {
        countsByDate[date] = (countsByDate[date] || 0) + 1;
      });

      this.chartData.labels = Object.keys(countsByDate);
      this.chartData.datasets[0].data = Object.values(countsByDate);

      // Update x-axis labels
      this.chartOptions.scales.x.labels = this.chartData.labels;

      const chartInstance = this.$refs.myChart;



      if (chartInstance && chartInstance.update) {
        chartInstance.update(); // Call update method to re-render the chart with new data
      }
    },
    updateChart() {
      const chartInstance = this.$refs.myChart;
      if (chartInstance && chartInstance.update) {
        chartInstance.update();
      }
    },
  },
  mounted() {
    Chart.register(...registerables);
    this.fetchData();
    setTimeout(() => {
      this.showChart = true;
    }, 800);
  },
};
</script>

<style scoped>
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