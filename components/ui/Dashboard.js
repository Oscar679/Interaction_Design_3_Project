class DashboardPage extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <main>
                <section class="mx-auto max-w-7xl px-6 pb-6 pt-10 sm:pt-14">
                    <div class="site-panel-strong overflow-hidden rounded-[24px] p-8 sm:p-10">
                        <div class="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                            <div>
                                <p class="section-kicker">Dashboard</p>
                                <h1 class="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                                    Compare campus sensor readings with SMHI.
                                </h1>
                                <p class="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                                    Compare temperature and humidity from both sources and switch between day and month views.
                                </p>
                            </div>

                            <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                                <div class="rounded-[18px] border border-white/10 bg-white/[0.03] p-5">
                                    <p class="text-[11px] uppercase tracking-[0.14em] text-slate-500">Range</p>
                                    <p class="mt-3 text-sm leading-7 text-slate-200">Choose day or month.</p>
                                </div>
                                <div class="rounded-[18px] border border-white/10 bg-white/[0.03] p-5">
                                    <p class="text-[11px] uppercase tracking-[0.14em] text-slate-500">Metrics</p>
                                    <p class="mt-3 text-sm leading-7 text-slate-200">Average temperature from each source.</p>
                                </div>
                                <div class="rounded-[18px] border border-white/10 bg-white/[0.03] p-5">
                                    <p class="text-[11px] uppercase tracking-[0.14em] text-slate-500">Charts</p>
                                    <p class="mt-3 text-sm leading-7 text-slate-200">Line charts for temperature and humidity.</p>
                                </div>
                            </div>
                        </div>
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
                    <div class="site-panel mb-5 flex flex-col gap-4 rounded-[20px] p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p class="section-kicker">Charts</p>
                            <h2 class="mt-2 text-2xl font-semibold text-white">Temperature and humidity</h2>
                            <p class="mt-2 text-sm leading-7 text-slate-300">Change the period or refresh both charts here.</p>
                        </div>
                        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
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
