<template>
  <div >
    <div class=" my-5">
      <div class="mb-5">
        <h5 class="sub-title">Number of SKU's added per day</h5>
        <p class="paragraph">This chart show the amount of SKU's added to the stock each day. <br>
          The X-axis shows the date, and the Y-axis show the amount of SKU's added that date.
        </p>
      </div>
      <div v-if="showChart" class="chart-container">
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
            title: {
              display: true,
              text: 'Date',
            },
            labels: [],
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Products',
            },
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
          //loops through data
          const formattedData = data.map(item => {
            const createdAt = new Date(item.created_at);
            // add dates do variable, converts to string, adds 0 to make two two digits
            const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
            return formattedDate; 
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
          const datePart = createdAt.split('T')[0]; 
          countsByDate[datePart] = (countsByDate[datePart] || 0) + 1;
        }
      });

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
        chartInstance.update();
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

.chartjs-legend li span {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 5px;
  border-radius: 50%;
}

.chartjs-legend .product-category-1 span {
  background-color: #ff5733;
  /* Change color for category 1 */
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



@media screen and (max-width: 722px) {
  .chart-container {
    max-width: 100%;
    width: 100%;
    height: fit-content;
    margin: auto;
  }
}
</style>