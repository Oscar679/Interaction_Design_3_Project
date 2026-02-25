import SheetService from "../../api/SheetService";
import ApexCharts from "apexcharts";
import Observable from "../Observable";
import LocalStorage from "../ui/LocalStorage";
import "./Alert";

class SensorChart extends HTMLElement {
    async connectedCallback() {
        this.period = 'Day';
        this.sheetService = new SheetService('1KY8RbI8XitA0deZxgZWD2Q1kTn8qEBQyriVR0GFslXo', 'https://docs.google.com/spreadsheets/d/');

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

    async renderChart(period) {
        const cachedPeriod = this.store.getItem('period');
        this.period = cachedPeriod || period;
        const h2 = this.querySelector('h2');
        const alertBox = this.querySelector('alert-box');

        try {
            const data = await this.sheetService.fetchData();

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

            h2.style.display = 'block';
            alertBox.hide();

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
