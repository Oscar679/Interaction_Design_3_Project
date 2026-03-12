import Observable from "../Observable";
import LocalStorage from "./LocalStorage";

class ButtonGroup extends HTMLElement {
    constructor() {
        super();
        this.store = new LocalStorage();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="inline-flex rounded-full border border-white/10 bg-slate-950/80 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <button type="button" class="active rounded-full border border-transparent px-5 py-2 text-sm font-medium text-slate-300 transition">
                    Day
                </button>
                <button type="button" class="rounded-full border border-transparent px-5 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/[0.04] hover:text-white">
                    Month
                </button>
            </div>
        `;

        const buttons = this.querySelectorAll("button");
        const observer = new Observable();
        const cachedPeriod = this.store.getItem("period");

        if (cachedPeriod !== null) {
            buttons.forEach((button) => {
                if (button.textContent.trim() === cachedPeriod) {
                    button.classList.add("active");
                } else {
                    button.classList.remove("active");
                }
            });
        }

        buttons.forEach((button) => button.addEventListener("click", () => {
            buttons.forEach((candidate) => candidate.classList.remove("active"));
            button.classList.add("active");
            observer.notify(button.textContent.trim());
        }));
    }
}

customElements.define("button-group", ButtonGroup);
