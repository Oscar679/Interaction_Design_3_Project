import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

class DocumentationPage extends HTMLElement {
    connectedCallback() {
        const sections = this.innerHTML;

        this.innerHTML = `
            <main>
                <section class="mx-auto max-w-7xl px-6 pb-6 pt-10 sm:pt-14">
                    <div class="site-panel-strong overflow-hidden rounded-[24px] p-8 sm:p-10">
                        <div class="max-w-4xl">
                            <p class="section-kicker">Documentation</p>
                            <h1 class="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                                Notes on how the app is put together.
                            </h1>
                            <p class="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                                This page gives a short overview of the main classes used in the project: the service layer, the chart components, and the observable that keeps the dashboard in sync.
                            </p>
                            <div class="mt-8 flex flex-wrap gap-2 text-sm text-slate-300">
                                <span class="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5">Services</span>
                                <span class="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5">Charts</span>
                                <span class="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5">Observable</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="docs-stack mx-auto max-w-7xl px-6 pb-24 pt-2">
                    ${sections}
                </section>
            </main>
        `;
    }
}

class DocumentationSection extends HTMLElement {
    connectedCallback() {
        const title = this.querySelector("h2")?.innerHTML || "";
        const description = this.querySelector("div")?.innerHTML || "";
        const content = this.querySelector("template")?.innerHTML || "";
        const fileLabel = `${title.replace(/\s+/g, "-").toLowerCase()}.js`;

        this.innerHTML = `
            <section class="docs-section-card group site-panel relative mx-auto w-full max-w-5xl overflow-hidden rounded-[22px] transition duration-300 hover:border-[var(--site-line-strong)] hover:bg-[rgba(10,16,21,0.96)]">
                <div class="relative grid gap-6 border-b border-white/8 px-6 py-6 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-start">
                    <div class="max-w-3xl">
                        <h3 class="max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-[2rem]">${title}</h3>
                        <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-[15px]">${description}</p>
                    </div>
                    <div aria-hidden="true" class="hidden min-w-44 rounded-[16px] border border-white/10 bg-black/10 p-4 text-right lg:block">
                        <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">Module</p>
                        <p class="mt-2 font-mono text-sm text-slate-200">${fileLabel}</p>
                    </div>
                </div>
                <div class="relative px-3 py-3 sm:px-4 sm:py-4">
                    <div class="overflow-hidden rounded-[16px] border border-white/10 bg-[#08111a] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                        <div class="flex items-center justify-between border-b border-white/8 bg-white/[0.03] px-4 py-3">
                            <div class="flex items-center gap-2">
                                <span class="h-2.5 w-2.5 rounded-full bg-rose-300/80"></span>
                                <span class="h-2.5 w-2.5 rounded-full bg-amber-200/80"></span>
                                <span class="h-2.5 w-2.5 rounded-full bg-emerald-300/80"></span>
                            </div>
                            <span class="font-mono text-[11px] text-slate-400">${fileLabel}</span>
                        </div>
                        <pre class="line-numbers docs-code-block border-t border-white/4 bg-slate-950/90 p-2 sm:p-4"><code class="language-javascript">${content}</code></pre>
                    </div>
                </div>
            </section>
        `;

        const codeElement = this.querySelector("code");
        if (codeElement) {
            Prism.highlightElement(codeElement);
        }
    }
}

customElements.define("documentation-page", DocumentationPage);
customElements.define("docs-section", DocumentationSection);
