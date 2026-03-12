import SheetService from "../../api/SheetService";
import ApexCharts from "apexcharts";
import Observable from "../Observable";
import LocalStorage from "../ui/LocalStorage";
import "./Alert";

class SensorChart extends HTMLElement {
    async connectedCallback() {
        this.period = "Day";
        this.sheetService = new SheetService("1KY8RbI8XitA0deZxgZWD2Q1kTn8qEBQyriVR0GFslXo", "https://docs.google.com/spreadsheets/d/");

        const observer = new Observable();
        observer.subscribe(this);

        this.store = new LocalStorage();

        this.innerHTML = `
            <alert-box></alert-box>
            <div class="relative min-w-0 overflow-hidden">
                <div class="mb-6 border-b border-white/8 pb-5">
                    <div>
                        <p class="section-kicker">Sensor chart</p>
                        <h2 class="mt-3 text-2xl font-semibold text-white">Campus readings</h2>
                        <p class="mt-2 text-sm leading-7 text-slate-400">Temperature and humidity from the local sensor feed.</p>
                    </div>
                </div>
                <div id="sensorChart" class="min-h-[20rem] w-full min-w-0 overflow-hidden"></div>
            </div>
        `;

        await this.renderChart(this.period);
    }

    async renderChart(period) {
        const cachedPeriod = this.store.getItem("period");
        this.period = cachedPeriod || period;
        const heading = this.querySelector("h2");
        const alertBox = this.querySelector("alert-box");

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
            const humidity = filteredRows.map((row) => row.c[3].v);
            const isDay = this.period === "Day";
            const labels = filteredRows.map((row) => {
                const value = new Date(row.c[1].f);
                return isDay
                    ? value.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
                    : value.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
            });

            const ctx = this.querySelector("#sensorChart");

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
                    min: -30,
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

            heading.style.display = "block";
            alertBox.hide();
            this.chart.render();
        } catch (e) {
            alertBox.show(e.message);
            heading.style.display = "none";
        }
    }

    async updatePeriod(period) {
        this.store.setItem("period", period);
        await this.renderChart(period);
    }
}

customElements.define("sensor-chart", SensorChart);
