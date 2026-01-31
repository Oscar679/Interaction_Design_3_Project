import SMHIService from "../../api/SMHIService";
import ApexCharts from "apexcharts";

class SMHIChart extends HTMLElement {
    async connectedCallback() {
        const smhiServiceTemp = new SMHIService(1, 64510, 'latest-months');
        const tempData = await smhiServiceTemp.fetchData();
        const START_DATE = new Date('2026-01-31T10:31:00');

        const smhiServiceHum = new SMHIService(6, 64510, 'latest-months');
        const humData = await smhiServiceHum.fetchData();

        const tempRows = tempData.value;
        const humRows = humData.value;

        const filteredRowsTemp = tempRows.filter(row => new Date(row.date) >= START_DATE);

        const filteredRowsHum = humRows.filter(row => new Date(row.date) >= START_DATE);

        const temperature = filteredRowsTemp.map(row => row.value);
        const humidity = filteredRowsHum.map(row => row.value);

        const labels = filteredRowsTemp.map(row => {
            const d = new Date(row.date);
            return d.toLocaleString('en-US');
        });

        console.log(temperature);
        console.log(humidity);

        this.innerHTML =
            `<div class="relative h-96 w-full">
                <h2 class="text-white">SMHI Data</h2>
                <div id="smhiChart"></div>
            </div>`;


        const ctx = this.querySelector('#smhiChart');

        new ApexCharts(ctx, {
            chart: {
                type: 'line',
                height: '100%',
            },
            series: [
                { name: 'Temp', data: temperature },
                { name: 'Humidity', data: humidity }
            ],
            xaxis: { categories: labels }
        }).render();
    }
}

customElements.define('smhi-chart', SMHIChart);