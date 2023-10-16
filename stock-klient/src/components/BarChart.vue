<template>
  <div class="wrapper">
    <div class="chart-container">
      <Bar ref="myChart" :data="chartData" :options="chartOptions" />
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
  mounted() {
    Chart.register(...registerables);
    this.fetchData();
  },
  data() {
    return {
      chartData: {
        labels: [], // Initialize labels array
        datasets: [{
          label: 'Number of Products',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color for bars
          borderColor: 'rgba(75, 192, 192, 1)', // Border color for bars
          borderWidth: 1, // Border width for bars
        }]
      },
      chartOptions: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            time: {
              unit: 'day', // Display by day
              tooltipFormat: 'll', // Format for tooltip (can be adjusted based on your preference)
            },
            labels: [], // Array of x-axis labels
          },
          y: {
            beginAtZero: true,
          },
        }
      }
    };
  },
  mounted() {
    Chart.register(...registerables);
    this.fetchData();
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
          console.log(formattedData); // Log the formatted data
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
      console.log(formattedData);
      const countsByDate = {};

      formattedData.forEach(date => {
        countsByDate[date] = (countsByDate[date] || 0) + 1;
      });

      this.chartData.labels = Object.keys(countsByDate);
      this.chartData.datasets[0].data = Object.values(countsByDate);

      // Update x-axis labels
      this.chartOptions.scales.x.labels = this.chartData.labels;
      console.log(this.chartOptions.scales.x.labels);
      console.log(this.chartData.datasets[0].data);

      // Get the chart instance using the ref
      const chartInstance = this.$refs.myChart;

      // Check if the chart instance is available before calling the update method
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
};
</script>

<style scoped>
.wrapper {
  padding: 5em;
}

.chart-container {
  max-width: 75%;
  width: 50em;
  margin: auto;
  height: fit-content;
  border: 1px solid #ccc;
  /* border-radius: 5px; */
  overflow: hidden;
  /* Optional: Hide overflow to prevent chart overflow */
}
</style>