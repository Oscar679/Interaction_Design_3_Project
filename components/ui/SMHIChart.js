import SMHIService from "../../api/SMHIService";
import ApexCharts from "apexcharts";
import Observable from "../Observable";
import LocalStorage from "../ui/LocalStorage";
import "./Alert";

class SMHIChart extends HTMLElement {
    async connectedCallback() {
        this.period = 'Day';
        this.periodMap = { Day: "latest-day", Month: "latest-months" };

        const observer = new Observable();
        observer.subscribe(this);

        this.store = new LocalStorage();

        this.innerHTML =
            `
            <alert-box></alert-box>
            <div class="relative h-96 w-full">
                <h2 class="text-white font-semibold">SMHI Data</h2>
                <div id="smhiChart"></div>
            </div>`;

        await this.renderChart(this.period);
    }

    async renderChart(period) {
        const cachedPeriod = this.store.getItem('period');
        this.period = cachedPeriod || period;
        const smhiPeriod = this.periodMap[this.period] || this.period;
        const h2 = this.querySelector('h2');
        const alertBox = this.querySelector('alert-box');

        try {
            const smhiServiceTemp = new SMHIService(1, 64510, smhiPeriod);
            const tempData = await smhiServiceTemp.fetchData();
            const START_DATE = new Date('2026-01-31T10:31:00');

            const smhiServiceHum = new SMHIService(6, 64510, smhiPeriod);
            const humData = await smhiServiceHum.fetchData();

            const tempRows = tempData.value;
            const humRows = humData.value;

            const filteredRowsTemp = tempRows.filter(row => new Date(row.date) >= START_DATE);

            const filteredRowsHum = humRows.filter(row => new Date(row.date) >= START_DATE);

            const temperature = filteredRowsTemp.map(row => row.value);
            const humidity = filteredRowsHum.map(row => row.value);
            const isDay = this.period === 'Day';
            const labels = filteredRowsTemp.map(row => {
                const d = new Date(row.date);
                return isDay
                    ? d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            });


            const ctx = this.querySelector('#smhiChart');

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new ApexCharts(ctx, {
                chart: {
                    type: 'line',
                    height: '100%',
                    background: 'transparent',
                    toolbar: { show: false },
                },
                theme: { mode: 'dark' },
                colors: ['#f97316', '#38bdf8'],
                stroke: { width: 2, curve: 'smooth' },
                series: [
                    { name: 'Temp', data: temperature },
                    { name: 'Humidity', data: humidity }
                ],
                xaxis: {
                    categories: labels,
                    tickAmount: 10,
                    labels: { style: { colors: '#9ca3af' } },
                },
                yaxis: {
                    labels: { style: { colors: '#9ca3af' } },
                },
                grid: {
                    borderColor: 'rgba(255,255,255,0.06)',
                    strokeDashArray: 4,
                },
                tooltip: {
                    theme: 'dark',
                },
                legend: {
                    labels: { colors: '#d1d5db' },
                },
            });

            h2.style.display = '';
            alertBox.hide();

            this.chart.render();
        } catch (e) {
            alertBox.show(e.message);
            h2.style.display = 'none';
        }

    }

    async updatePeriod(period) {
        this.store.setItem('period', period);
        await this.renderChart(this.periodMap[period]);
    }
}

customElements.define('smhi-chart', SMHIChart);
