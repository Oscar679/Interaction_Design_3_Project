import Observable from "../Observable";
import LocalStorage from "./LocalStorage";

class ButtonGroup extends HTMLElement {
    constructor() {
        super();
        this.store = new LocalStorage();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="inline-flex gap-1.5 rounded-full border border-white/10 bg-slate-950/80 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                <button type="button" data-period="Day" class="active cursor-pointer rounded-full border border-transparent px-4 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.1]">
                    Day
                </button>
                <button type="button" data-period="Month" class="cursor-pointer rounded-full border border-transparent px-4 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.1] hover:text-white">
                    Month
                </button>
            </div>
        `;

        const buttons = this.querySelectorAll("button");
        const observer = new Observable();
        const cachedPeriod = this.store.getItem("period");

        const syncActiveState = (period) => {
            buttons.forEach((button) => {
                button.classList.toggle("active", button.dataset.period === period);
            });
        };

        if (cachedPeriod !== null) {
            syncActiveState(cachedPeriod);
        } else {
            syncActiveState("Day");
        }

        buttons.forEach((button) => button.addEventListener("click", () => {
            const period = button.dataset.period || button.textContent.trim();
            syncActiveState(period);
            observer.notify(period);
        }));
    }
}

customElements.define("button-group", ButtonGroup);
