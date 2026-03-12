class Index extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <main>
                <section class="mx-auto max-w-7xl px-6 pb-10 pt-10 sm:pt-14">
                    <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
                        <div class="site-panel-strong rounded-[24px] p-8 sm:p-10">
                            <div class="section-kicker">Vaxjo campus</div>
                            <h1 class="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-[4.2rem]">
                                Sensor readings from campus next to SMHI station data.
                            </h1>
                            <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                                Built for comparing the campus sensor with the official weather station and for showing how the app is structured.
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
                            <div class="site-panel rounded-[22px] p-6 sm:p-7">
                                <h2 class="text-2xl font-semibold text-white">Dashboard</h2>
                                <p class="mt-4 text-sm leading-7 text-slate-300">
                                    Day and month views, average temperature cards, and both charts in one place.
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
                                <h2 class="text-2xl font-semibold text-white">Documentation</h2>
                                <p class="mt-4 text-sm leading-7 text-slate-300">
                                    Short notes on the services, chart components, and the observable used in the app.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        `;
    }
}

customElements.define("index-body", Index);
