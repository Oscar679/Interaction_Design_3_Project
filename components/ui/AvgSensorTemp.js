import SheetService from "../../api/SheetService";
import Observable from "../Observable";
import LocalStorage from "./LocalStorage";
import "./Alert";

class AvgSensorTemp extends HTMLElement {
    async connectedCallback() {
        this.period = "Day";
        this.sheetService = new SheetService("1KY8RbI8XitA0deZxgZWD2Q1kTn8qEBQyriVR0GFslXo", "https://docs.google.com/spreadsheets/d/");

        const observer = new Observable();
        observer.subscribe(this);

        this.store = new LocalStorage();

        this.innerHTML = `
            <alert-box></alert-box>
            <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h2 class="text-2xl font-semibold text-white">Campus sensor</h2>
                    <p class="mt-2 text-sm leading-7 text-slate-400">Average temperature for the selected period.</p>
                    <div id="avgTemp" class="mt-5"></div>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-[14px] border border-white/10 bg-white/[0.03] text-[var(--site-accent)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                </div>
            </div>
        `;

        await this.renderTemperature();
    }

    getTemperatureTone(value) {
        if (value < 0) {
            return "text-sky-300";
        }

        if (value > 25) {
            return "text-rose-300";
        }

        return "text-[var(--site-accent-warm)]";
    }

    async renderTemperature() {
        const heading = this.querySelector("h2");
        const alertBox = this.querySelector("alert-box");
        const cachedPeriod = this.store.getItem("period");
        this.period = cachedPeriod || this.period;

        try {
            const data = await this.sheetService.fetchData();
            const now = Date.now();
            const timestamps = {
                Hour: now - (60 * 60 * 1000),
                Day: now - (24 * 60 * 60 * 1000),
                Month: now - (30 * 24 * 60 * 60 * 1000),
            };

            const timestamp = timestamps[this.period];
            const rows = data.table.rows;
            const filteredRows = rows.filter((row) => new Date(row.c[1].f).getTime() >= timestamp);
            const temperature = filteredRows.map((row) => row.c[2].v);
            const avgTemp = temperature.reduce((sum, value) => sum + value, 0) / temperature.length;
            const formattedTemp = avgTemp.toFixed(2);

            this.querySelector("#avgTemp").innerHTML = `
                <div class="flex items-end gap-3">
                    <p class="metric-value ${this.getTemperatureTone(avgTemp)} text-5xl font-semibold tracking-[-0.05em]">${formattedTemp}</p>
                    <span class="pb-2 text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Celsius</span>
                </div>
            `;

            heading.style.display = "";
            alertBox.hide();
        } catch (e) {
            alertBox.show(e.message);
            heading.style.display = "none";
        }
    }

    async updatePeriod(period) {
        this.store.setItem("period", period);
        await this.renderTemperature();
    }
}

customElements.define("avg-temperature", AvgSensorTemp);
