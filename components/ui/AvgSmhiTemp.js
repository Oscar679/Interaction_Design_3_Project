import SMHIService from "../../api/SMHIService";
import Observable from "../Observable";
import LocalStorage from "../ui/LocalStorage";
import "./Alert";

class AvgSmhiTemp extends HTMLElement {
    async connectedCallback(period = 'Day') {
        this.period = period;

        const observer = new Observable();
        observer.subscribe(this);

        this.store = new LocalStorage();

        this.innerHTML = `
            <alert-box></alert-box>
            <h2 class="text-white">Average SMHI Temperature</h2>
            <div id="avgSmhiTemp"></div>
        `;

        await this.renderTemperature();
    }

    async renderTemperature() {
        const h2 = this.querySelector('h2');
        const alertBox = this.querySelector('alert-box');
        const cachedPeriod = this.store.getItem('period');
        const uiPeriod = cachedPeriod || this.period;
        const periodMap = { Day: "latest-day", Month: "latest-months" };
        const smhiPeriod = periodMap[uiPeriod] || "latest-day";

        try {
            const smhiService = new SMHIService(1, 64510, smhiPeriod);
            const tempData = await smhiService.fetchData();
            const START_DATE = new Date('2026-01-31T10:31:00');

            const tempRows = tempData.value;
            const filteredRowsTemp = tempRows.filter(row => new Date(row.date) >= START_DATE);
            const temperature = filteredRowsTemp
                .map(row => Number(row.value))
                .filter(value => Number.isFinite(value));

            if (temperature.length === 0) {
                throw new Error("No SMHI data available for selected period.");
            }

            const avgTemp = temperature.reduce((sum, value) => sum + value, 0) / temperature.length;



            if (avgTemp.toFixed(2) < 0) {
                this.querySelector('#avgSmhiTemp').innerHTML = `<p class="text-blue-500 text-lg mt-4">${avgTemp.toFixed(2)}°C</p>`;
            } else if (avgTemp.toFixed(2) > 25) {
                this.querySelector('#avgSmhiTemp').innerHTML = `<p class="text-red-500 text-lg mt-4">${avgTemp.toFixed(2)}°C</p>`;
            } else {
                this.querySelector('#avgSmhiTemp').innerHTML = `<p class="text-green-300 text-lg mt-4">${avgTemp.toFixed(2)}°C</p>`;
            }

            h2.style.display = '';
            alertBox.hide();
        } catch (e) {
            this.querySelector('#avgSmhiTemp').innerHTML = `<p class="text-red-500 text-lg mt-4">Error: ${e.message}</p>`;
            alertBox.show(e.message);
            h2.style.display = 'none';
        }
    }

    async updatePeriod(period) {
        this.store.setItem('period', period);
        await this.renderTemperature();
    }
}

customElements.define('avg-smhi-temperature', AvgSmhiTemp);
