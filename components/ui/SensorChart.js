import SheetService from "../../api/SheetService";
import ApexCharts from "apexcharts";
import Observable from "../Observable";
import LocalStorage from "../ui/LocalStorage";
import "./Alert";

class SensorChart extends HTMLElement {
    async connectedCallback(period = 'Day') {
        this.period = period;

        const observer = new Observable();
        observer.subscribe(this);

        this.store = new LocalStorage();

        this.innerHTML =

            `
                <alert-box></alert-box>
                <div class="relative h-96 w-full">
                <h2 class="text-white">Sensor Data</h2>
                <div id="sensorChart"></div>
            </div>`;

        await this.renderChart(this.period);
    }

    async renderChart(period = 'Month') {
        const cachedPeriod = this.store.getItem('period');
        this.period = cachedPeriod || period;
        console.log(cachedPeriod);
        const h2 = this.querySelector('h2');
        const alertBox = this.querySelector('alert-box');

        try {
            const sheetService = new SheetService('1KY8RbI8XitA0deZxgZWD2Q1kTn8qEBQyriVR0GFslXo', 'https://docs.google.com/spreadsheets/d/');


            const data = await sheetService.fetchData();

            const now = Date.now();
            const timestamps = {
                Hour: now - (60 * 60 * 1000),
                Day: now - (24 * 60 * 60 * 1000),
                Month: now - (30 * 24 * 60 * 60 * 1000)
            };

            const timestamp = timestamps[this.period];
            const rows = data.table.rows;

            const filteredRows = rows.filter(row => new Date(row.c[1].f).getTime() >= timestamp);

            const temperature = filteredRows.map(row => row.c[2].v);
            const humidity = filteredRows.map(row => row.c[3].v);
            //const eco2 = filteredRows.map(row => row.c[4].v);
            //const tvoc = filteredRows.map(row => row.c[5].v);
            const labels = filteredRows.map(row => row.c[1].f);

            const ctx = this.querySelector('#sensorChart');

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new ApexCharts(ctx, {
                chart: {
                    type: 'line',
                    height: '100%',
                },
                series: [
                    { name: 'Temp', data: temperature },
                    { name: 'Humidity', data: humidity }
                ],
                xaxis: {
                    categories: labels,
                    tickAmount: 10,
                },
                yaxis: {
                    min: -30
                },
                labels: {
                    rotate: -90
                }
            });

            h2.style.display = 'block'; // Ensure the title is visible when data is successfully rendered

            alertBox.hide(); // Hide the alert box if data is successfully rendered

            this.chart.render();
        } catch (e) {
            alertBox.show(e.message);
            h2.style.display = 'none';
            return;
        }
    }

    async updatePeriod(period) {
        this.store.setItem('period', period);
        await this.renderChart(period);
    }
}

customElements.define('sensor-chart', SensorChart);
