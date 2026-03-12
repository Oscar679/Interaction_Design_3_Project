import SMHIService from "../../api/SMHIService";
import Observable from "../Observable";
import LocalStorage from "../ui/LocalStorage";
import "./Alert";

class AvgSmhiTemp extends HTMLElement {
    async connectedCallback() {
        this.period = 'Day';

        const observer = new Observable();
        observer.subscribe(this);

        this.store = new LocalStorage();

        this.innerHTML = `
            <alert-box></alert-box>
            <div class="flex items-start justify-between">
                <div>
                    <p class="text-gray-400 text-xs uppercase tracking-wider">SMHI</p>
                    <h2 class="text-white text-lg font-semibold mt-1">Average Temperature</h2>
                    <div id="avgSmhiTemp"></div>
                </div>
                <div class="rounded-lg bg-purple-500/10 p-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-purple-400"><path d="M2 12h10"/><path d="M9 4v16"/><path d="m3 9 3 3-3 3"/><circle cx="18" cy="12" r="4"/></svg>
                </div>
            </div>
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
                this.querySelector('#avgSmhiTemp').innerHTML = `<p class="text-blue-500 text-3xl font-bold mt-3">${avgTemp.toFixed(2)}°C</p>`;
            } else if (avgTemp.toFixed(2) > 25) {
                this.querySelector('#avgSmhiTemp').innerHTML = `<p class="text-red-500 text-3xl font-bold mt-3">${avgTemp.toFixed(2)}°C</p>`;
            } else {
                this.querySelector('#avgSmhiTemp').innerHTML = `<p class="text-green-300 text-3xl font-bold mt-3">${avgTemp.toFixed(2)}°C</p>`;
            }

            h2.style.display = '';
            alertBox.hide();
        } catch (e) {
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
