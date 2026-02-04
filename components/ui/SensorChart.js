import SheetService from "../../api/SheetService";
import ApexCharts from "apexcharts";

class SensorChart extends HTMLElement {
    async connectedCallback() {
        const sheetService = new SheetService('1KY8RbI8XitA0deZxgZWD2Q1kTn8qEBQyriVR0GFslXo', 'https://docs.google.com/spreadsheets/d/');

        const data = await sheetService.fetchData();

        this.innerHTML =
            `<div class="relative h-96 w-full">
                <h2 class="text-white">Sensor Data</h2>
                <div id="sensorChart"></div>
            </div>`;

        const rows = data.table.rows;

        const temperature = rows.map(row => row.c[2].v);
        const humidity = rows.map(row => row.c[3].v);
        const eco2 = rows.map(row => row.c[4].v);
        const tvoc = rows.map(row => row.c[5].v);
        const labels = rows.map(row => row.c[1].f);
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
            xaxis: { categories: labels },
            yaxis: {
                min: -30
            }
        }).render();

    }
}

customElements.define('sensor-chart', SensorChart);