import SMHIService from "../../api/SMHIService";
import Observable from "../Observable";
import LocalStorage from "../ui/LocalStorage";
import "./Alert";

class AvgSmhiTemp extends HTMLElement {
    async connectedCallback() {
        this.period = "Day";

        const observer = new Observable();
        observer.subscribe(this);

        this.store = new LocalStorage();

        this.innerHTML = `
            <alert-box></alert-box>
            <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <p class="section-kicker">SMHI station</p>
                    <h2 class="mt-3 text-2xl font-semibold text-white">Average temperature</h2>
                    <p class="mt-2 text-sm leading-7 text-slate-400">Official readings mapped to the selected dashboard range.</p>
                    <div id="avgSmhiTemp" class="mt-6"></div>
                </div>
                <div class="flex h-14 w-14 items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.04] text-[var(--site-accent-warm)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h10"/><path d="M9 4v16"/><path d="m3 9 3 3-3 3"/><circle cx="18" cy="12" r="4"/></svg>
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

        return "text-[var(--site-accent)]";
    }

    async renderTemperature() {
        const heading = this.querySelector("h2");
        const alertBox = this.querySelector("alert-box");
        const cachedPeriod = this.store.getItem("period");
        const uiPeriod = cachedPeriod || this.period;
        const periodMap = { Day: "latest-day", Month: "latest-months" };
        const smhiPeriod = periodMap[uiPeriod] || "latest-day";

        try {
            const smhiService = new SMHIService(1, 64510, smhiPeriod);
            const tempData = await smhiService.fetchData();
            const startDate = new Date("2026-01-31T10:31:00");

            const filteredRowsTemp = tempData.value.filter((row) => new Date(row.date) >= startDate);
            const temperature = filteredRowsTemp
                .map((row) => Number(row.value))
                .filter((value) => Number.isFinite(value));

            if (temperature.length === 0) {
                throw new Error("No SMHI data available for selected period.");
            }

            const avgTemp = temperature.reduce((sum, value) => sum + value, 0) / temperature.length;
            const formattedTemp = avgTemp.toFixed(2);

            this.querySelector("#avgSmhiTemp").innerHTML = `
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

customElements.define("avg-smhi-temperature", AvgSmhiTemp);
