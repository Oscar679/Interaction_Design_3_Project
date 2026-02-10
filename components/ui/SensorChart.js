import SheetService from "../../api/SheetService";
import ApexCharts from "apexcharts";
import Observable from "../Observable";

class SensorChart extends HTMLElement {
    async connectedCallback(period = 'Day') {
        this.period = period;

        const observer = new Observable();
        observer.subscribe(this);

        await this.renderChart(this.period);
    }

    async renderChart(period = 'Month') {
        this.period = period;
        const sheetService = new SheetService('1KY8RbI8XitA0deZxgZWD2Q1kTn8qEBQyriVR0GFslXo', 'https://docs.google.com/spreadsheets/d/');

        const data = await sheetService.fetchData();

        const now = Date.now();
        const timestamps = {
            Hour: now - (60 * 60 * 1000),
            Day: now - (24 * 60 * 60 * 1000),
            Month: now - (30 * 24 * 60 * 60 * 1000)
        };

        const timestamp = timestamps[period];
        const rows = data.table.rows;

        const filteredRows = rows.filter(row => new Date(row.c[1].f).getTime() >= timestamp);

        const temperature = filteredRows.map(row => row.c[2].v);
        const humidity = filteredRows.map(row => row.c[3].v);
        const eco2 = filteredRows.map(row => row.c[4].v);
        const tvoc = filteredRows.map(row => row.c[5].v);
        const labels = filteredRows.map(row => row.c[1].f);

        this.innerHTML =
            `<div class="relative h-96 w-full">
                <h2 class="text-white">Sensor Data</h2>
                <div id="sensorChart"></div>
            </div>`;


        const ctx = this.querySelector('#sensorChart');

        new ApexCharts(ctx, {
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
        }).render();
    }

    async updatePeriod(period) {
        await this.renderChart(period);
    }
}

customElements.define('sensor-chart', SensorChart);