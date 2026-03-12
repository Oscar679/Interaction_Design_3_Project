class DashboardPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <main>
                <section class="mx-auto max-w-7xl px-6 pb-6 pt-10 sm:pt-14">
                    <div class="border-b border-white/10 pb-5">
                        <h1 class="text-3xl font-semibold text-white sm:text-4xl">Dashboard</h1>
                        <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                            Campus sensor data compared with SMHI for the selected period.
                        </p>
                    </div>
                </section>

                <section class="mx-auto max-w-7xl px-6 pb-6">
                    <div class="grid gap-5 lg:grid-cols-2">
                        <div class="site-panel rounded-[22px] p-6 sm:p-7">
                            <avg-temperature></avg-temperature>
                        </div>
                        <div class="site-panel rounded-[22px] p-6 sm:p-7">
                            <avg-smhi-temperature></avg-smhi-temperature>
                        </div>
                    </div>
                </section>

                <section class="mx-auto max-w-7xl px-6 pb-20">
                    <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h2 class="text-xl font-semibold text-white">Temperature and humidity</h2>
                        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <button-group></button-group>
                            <refresh-button></refresh-button>
                        </div>
                    </div>
                    <div class="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
                        <div class="site-panel min-w-0 overflow-hidden rounded-[22px] p-5 sm:p-7">
                            <sensor-chart></sensor-chart>
                        </div>
                        <div class="site-panel min-w-0 overflow-hidden rounded-[22px] p-5 sm:p-7">
                            <smhi-chart></smhi-chart>
                        </div>
                    </div>
                </section>
            </main>
        `;
    }
}

customElements.define("dashboard-page", DashboardPage);
