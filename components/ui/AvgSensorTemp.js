import SheetService from "../../api/SheetService";
import Observable from "../Observable";
import LocalStorage from "./LocalStorage";
import "./Alert";

class AvgSensorTemp extends HTMLElement {
    async connectedCallback(period = 'Day') {
        this.period = period;

        const observer = new Observable();
        observer.subscribe(this);

        this.store = new LocalStorage();

        this.innerHTML = `
            <alert-box></alert-box>
            <h2 class="text-white">Average Sensor Temperature</h2>
            <div id="avgTemp"></div>
        `;

        await this.renderTemperature();
    }

    async renderTemperature() {
        const h2 = this.querySelector('h2');
        const alertBox = this.querySelector('alert-box');
        const cachedPeriod = this.store.getItem('period');
        this.period = cachedPeriod || this.period;

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
            const avgTemp = temperature.reduce((sum, value) => sum + value, 0) / temperature.length;

            if (avgTemp.toFixed(2) < 0) {
                this.querySelector('#avgTemp').innerHTML = `<p class="text-blue-500 text-lg mt-4">${avgTemp.toFixed(2)}°C</p>`;
            } else if (avgTemp.toFixed(2) > 25) {
                this.querySelector('#avgTemp').innerHTML = `<p class="text-red-500 text-lg mt-4">${avgTemp.toFixed(2)}°C</p>`;
            } else {
                this.querySelector('#avgTemp').innerHTML = `<p class="text-orange-400 text-lg mt-4">${avgTemp.toFixed(2)}°C</p>`;
            }

            h2.style.display = '';
            alertBox.hide();
        } catch (e) {
            this.querySelector('#avgTemp').innerHTML = `<p class="text-red-500 text-lg mt-4">Error: ${e.message}</p>`;
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
