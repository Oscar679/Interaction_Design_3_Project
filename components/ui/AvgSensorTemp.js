import SheetService from "../../api/SheetService";
import Observable from "../Observable";
import LocalStorage from "./LocalStorage";
import "./Alert";

class AvgSensorTemp extends HTMLElement {
    async connectedCallback() {
        this.period = 'Day';
        this.sheetService = new SheetService('1KY8RbI8XitA0deZxgZWD2Q1kTn8qEBQyriVR0GFslXo', 'https://docs.google.com/spreadsheets/d/');

        const observer = new Observable();
        observer.subscribe(this);

        this.store = new LocalStorage();

        this.innerHTML = `
            <alert-box></alert-box>
            <div class="flex items-start justify-between">
                <div>
                    <p class="text-gray-400 text-xs uppercase tracking-wider">Sensor</p>
                    <h2 class="text-white text-lg font-semibold mt-1">Average Temperature</h2>
                    <div id="avgTemp"></div>
                </div>
                <div class="rounded-lg bg-indigo-500/10 p-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-400"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                </div>
            </div>
        `;

        await this.renderTemperature();
    }

    async renderTemperature() {
        const h2 = this.querySelector('h2');
        const alertBox = this.querySelector('alert-box');
        const cachedPeriod = this.store.getItem('period');
        this.period = cachedPeriod || this.period;

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
            const avgTemp = temperature.reduce((sum, value) => sum + value, 0) / temperature.length;

            if (avgTemp.toFixed(2) < 0) {
                this.querySelector('#avgTemp').innerHTML = `<p class="text-blue-500 text-3xl font-bold mt-3">${avgTemp.toFixed(2)}°C</p>`;
            } else if (avgTemp.toFixed(2) > 25) {
                this.querySelector('#avgTemp').innerHTML = `<p class="text-red-500 text-3xl font-bold mt-3">${avgTemp.toFixed(2)}°C</p>`;
            } else {
                this.querySelector('#avgTemp').innerHTML = `<p class="text-orange-400 text-3xl font-bold mt-3">${avgTemp.toFixed(2)}°C</p>`;
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

customElements.define('avg-temperature', AvgSensorTemp);
