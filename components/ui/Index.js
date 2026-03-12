class Index extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <main>
                <section class="mx-auto max-w-7xl px-6 pb-10 pt-10 sm:pt-14">
                    <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
                        <div class="site-panel-strong overflow-hidden rounded-[24px] p-8 sm:p-10">
                            <div class="section-kicker">Campus Weather</div>
                            <h1 class="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-[4.2rem]">
                                Compare sensor data from campus with SMHI station data.
                            </h1>
                            <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                                This site shows the local campus readings next to official weather station data, with a dashboard for the live comparison and a docs page for the code behind it.
                            </p>

                            <div class="mt-10 flex flex-wrap gap-3">
                                <a href="./dashBoard.html" class="rounded-md bg-[var(--site-accent)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                                    Open Dashboard
                                </a>
                                <a href="./docs.html" class="rounded-md border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]">
                                    Read Documentation
                                </a>
                            </div>
                        </div>

                        <div class="grid gap-6">
                            <div class="site-panel overflow-hidden rounded-[22px] p-6 sm:p-7">
                                <div>
                                    <p class="section-kicker">Dashboard</p>
                                    <h2 class="mt-3 text-2xl font-semibold text-white">View the data</h2>
                                </div>
                                <p class="mt-4 text-sm leading-7 text-slate-300">
                                    Switch between day and month, compare the averages, and look at the two charts side by side.
                                </p>
                                <div class="mt-6 grid gap-3">
                                    <div class="rounded-[16px] border border-white/10 bg-black/10 p-4">
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-slate-300">Sensor average</span>
                                            <span class="metric-value text-lg font-semibold text-[var(--site-accent)]">18.4 C</span>
                                        </div>
                                    </div>
                                    <div class="rounded-[16px] border border-white/10 bg-black/10 p-4">
                                        <div class="flex items-center justify-between">
                                            <span class="text-sm text-slate-300">SMHI average</span>
                                            <span class="metric-value text-lg font-semibold text-[var(--site-accent-warm)]">16.9 C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="site-panel rounded-[22px] p-6 sm:p-7">
                                <p class="section-kicker">Documentation</p>
                                <h2 class="mt-3 text-2xl font-semibold text-white">Read the code structure</h2>
                                <p class="mt-4 text-sm leading-7 text-slate-300">
                                    The docs page explains the service classes, the chart components, and the observable that connects them.
                                </p>
                                <div class="mt-6 flex flex-wrap gap-2">
                                    <span class="rounded-md border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-slate-300">Services</span>
                                    <span class="rounded-md border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-slate-300">Charts</span>
                                    <span class="rounded-md border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-slate-300">Observer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        `;
    }
}

customElements.define("index-body", Index);
