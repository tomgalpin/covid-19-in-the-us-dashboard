<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,

  props: {
    labels: {
      type: Array,
      required: true,
      default: null
    }
  },

  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        title: {
          display: true,
          position: 'top',
          text: 'Year 2013 Total Revenue By Month'
        },
        scales: {
          yAxes: [
            {
              display: true,
              position: 'right',
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                drawOnChartArea: false
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false
              }
            }
          ]
        }
      }
    };
  },

  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Data One',
            data: [40]
          },
          {
            label: 'Data 2',
            data: [10]
          },
          {
            label: 'Data 3',
            data: [30]
          },
          {
            label: 'Data 4',
            data: [50]
          }
        ]
      };
    }
  },

  mounted() {
    // Set bar background color on each dataset:
    this.chartData.datasets.forEach(item => {
      // const tomtom = '--gray-bar-chart';
      // console.log(tomtom);
      item.backgroundColor = 'var(--red-bg)';
      return item;
    });

    this.renderChart(this.chartData, this.options);
  }
};
</script>
