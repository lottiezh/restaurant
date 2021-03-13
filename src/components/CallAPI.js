import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                label: "west",
                borderColor: "red",
                data: [],
                fill: false
            },
            {
                label: "national",
                borderColor: "blue",
                data: [],
                fill: false
            },
            {
                label: "east",
                borderColor: "purple",
                data: [],
                fill: false
            },
            {
                label: "central",
                borderColor: "cyan",
                data: [],
                fill: false
            },
            {
                label: "south",
                borderColor: "gray",
                data: [],
                fill: false
            },
            {
                label: "north",
                borderColor: "green",
                data: [],
                fill: false
            }
        ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            response.data.items.forEach(data => { 
                this.datacollection.labels.push(data.timestamp)
                this.datacollection.datasets[0].data.push(data.readings.psi_twenty_four_hourly.west)
                this.datacollection.datasets[1].data.push(data.readings.psi_twenty_four_hourly.national)
                this.datacollection.datasets[2].data.push(data.readings.psi_twenty_four_hourly.east)
                this.datacollection.datasets[3].data.push(data.readings.psi_twenty_four_hourly.central)
                this.datacollection.datasets[4].data.push(data.readings.psi_twenty_four_hourly.south)
                this.datacollection.datasets[5].data.push(data.readings.psi_twenty_four_hourly.north)
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}

