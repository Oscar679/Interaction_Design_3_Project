import SMHIService from "../../api/SMHIService";
import ApexCharts from "apexcharts";
import Observable from "../Observable";
import LocalStorage from "../ui/LocalStorage";
import "./Alert";

class SMHIChart extends HTMLElement {
    async connectedCallback() {
        this.period = "Day";
        this.periodMap = { Day: "latest-day", Month: "latest-months" };

        const observer = new Observable();
        observer.subscribe(this);

        this.store = new LocalStorage();

        this.innerHTML = `
            <alert-box></alert-box>
            <div class="relative min-w-0 overflow-hidden">
                <div class="mb-6 border-b border-white/8 pb-5">
                    <div>
                        <p class="section-kicker">SMHI chart</p>
                        <h2 class="mt-3 text-2xl font-semibold text-white">Official readings</h2>
                        <p class="mt-2 text-sm leading-7 text-slate-400">Temperature and humidity from the selected SMHI station.</p>
                    </div>
                </div>
                <div id="smhiChart" class="min-h-[20rem] w-full min-w-0 overflow-hidden"></div>
            </div>
        `;

        await this.renderChart(this.period);
    }

    async renderChart(period) {
        const cachedPeriod = this.store.getItem("period");
        this.period = cachedPeriod || period;
        const smhiPeriod = this.periodMap[this.period] || this.period;
        const heading = this.querySelector("h2");
        const alertBox = this.querySelector("alert-box");

        try {
            const smhiServiceTemp = new SMHIService(1, 64510, smhiPeriod);
            const tempData = await smhiServiceTemp.fetchData();
            const startDate = new Date("2026-01-31T10:31:00");

            const smhiServiceHum = new SMHIService(6, 64510, smhiPeriod);
            const humData = await smhiServiceHum.fetchData();

            const filteredRowsTemp = tempData.value.filter((row) => new Date(row.date) >= startDate);
            const filteredRowsHum = humData.value.filter((row) => new Date(row.date) >= startDate);
            const temperature = filteredRowsTemp.map((row) => row.value);
            const humidity = filteredRowsHum.map((row) => row.value);
            const isDay = this.period === "Day";
            const labels = filteredRowsTemp.map((row) => {
                const value = new Date(row.date);
                return isDay
                    ? value.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
                    : value.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
            });

            const ctx = this.querySelector("#smhiChart");

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new ApexCharts(ctx, {
                chart: {
                    type: "line",
                    height: 320,
                    width: "100%",
                    background: "transparent",
                    parentHeightOffset: 0,
                    redrawOnParentResize: true,
                    redrawOnWindowResize: true,
                    toolbar: { show: false },
                },
                theme: { mode: "dark" },
                colors: ["#f3c98b", "#7dd3c6"],
                dataLabels: { enabled: false },
                stroke: { width: 2.5, curve: "smooth" },
                series: [
                    { name: "Temperature", data: temperature },
                    { name: "Humidity", data: humidity },
                ],
                xaxis: {
                    categories: labels,
                    tickAmount: 8,
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                    labels: { style: { colors: "#8fa6b0", fontSize: "12px" } },
                },
                yaxis: {
                    labels: { style: { colors: "#8fa6b0", fontSize: "12px" } },
                },
                grid: {
                    borderColor: "rgba(255,255,255,0.06)",
                    strokeDashArray: 5,
                    padding: {
                        left: 4,
                        right: 8,
                    },
                },
                tooltip: { theme: "dark" },
                legend: {
                    position: "bottom",
                    horizontalAlign: "left",
                    fontSize: "12px",
                    itemMargin: {
                        horizontal: 10,
                        vertical: 0,
                    },
                    labels: { colors: "#c7d5db" },
                },
            });

            heading.style.display = "";
            alertBox.hide();
            this.chart.render();
        } catch (e) {
            alertBox.show(e.message);
            heading.style.display = "none";
        }
    }

    async updatePeriod(period) {
        this.store.setItem("period", period);
        await this.renderChart(this.periodMap[period]);
    }
}

customElements.define("smhi-chart", SMHIChart);
