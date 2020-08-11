<script>
import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,

  props: {
    data: {
      type: Array,
      required: true
    },

    labels: {
      type: Array,
      required: true
    },

    meta: {
      type: Object,
      required: true
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
          display: false
        },
        tooltips: {
          mode: 'index',
          displayColors: false,
          titleAlign: 'left',
          bodyAlign: 'left',
          xPadding: 10,
          yPadding: 10,
          callbacks: {
            title: (tooltipItem, data) => {
              const day = tooltipItem[0].xLabel.day;
              const month = tooltipItem[0].xLabel.month;
              const year = tooltipItem[0].xLabel.year;

              return `${month} ${day}, ${year}`;
            },
            label: (tooltipItems, data) => {
              return `${
                this.meta.tooltipText
              } ${tooltipItems.yLabel.toLocaleString()}`;
            }
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false
              },
              ticks: {
                distribution: 'series',
                autoSkip: false,
                padding: 10,
                maxRotation: 0,
                minRotation: 0,
                callback: (value, index, values) => {
                  if (value.day === '01') {
                    return `${value.month} ${value.day}`;
                  }
                }
              }
            }
          ],
          yAxes: [
            {
              display: true,
              position: 'right',
              ticks: {
                beginAtZero: true,
                callback: (value, index, values) => {
                  return this.numFormatter(value);
                }
              },
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
            backgroundColor: this.meta.backgroundColor,
            hoverBackgroundColor: this.meta.hoverBackgroundColor,
            data: this.data
          }
        ]
      };
    }
  },

  methods: {
    numFormatter(num) {
      switch (true) {
        case num < 9999:
          return num;
          break;
        case num < 1000000:
          return `${Math.round(num / 1000)}K`;
          break;
        case num < 10000000:
          return `${num / 1000000}M`;
          break;
        case num < 1000000000:
          console.log('adsfasfsdfsd');
          return `${Math.round(num / 1000000)}M`;
          break;
        case num < 1000000000000:
          return `${num}B`;
          return `${Math.round(num / 1000000000)}B`;
          break;
        default:
          return num;
      }
    }
  },

  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>

<style lang="scss" scoped>
.custom__tooltip {
  position: absolute;
  width: 200px;
  height: 200px;
  background: red;
  border: 1px solid black;
}
</style>
