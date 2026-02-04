import SMHIService from "../../api/SMHIService";
import ApexCharts from "apexcharts";
import Observable from "../Observable";

class SMHIChart extends HTMLElement {
    async connectedCallback(period = 'latest-day') {
        this.period = period;

        const observer = new Observable();
        observer.subscribe(this);

        await this.renderChart(this.period);
    }

    async renderChart(period) {
        this.period = period;
        const smhiServiceTemp = new SMHIService(1, 64510, this.period);
        const tempData = await smhiServiceTemp.fetchData();
        const START_DATE = new Date('2026-01-31T10:31:00');

        const smhiServiceHum = new SMHIService(6, 64510, this.period);
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
            xaxis: {
                categories: labels,
                tickAmount: 10,
            }
        }).render();
    }

    async updatePeriod(period) {
        const periodMap = { Day: "latest-day", Month: "latest-months" };
        await this.renderChart(periodMap[period]);
    }
}

customElements.define('smhi-chart', SMHIChart);