import Observable from "../Observable";

class RefreshButton extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <button type="button" class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--site-accent)]/30 bg-[var(--site-accent)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110">
                <span class="loading-spinner hidden h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></span>
                <span id="button-text">Refresh data</span>
            </button>
        `;

        const observer = new Observable();
        const loadingSpinner = this.querySelector(".loading-spinner");
        const button = this.querySelector("button");
        const buttonText = this.querySelector("#button-text");

        button.addEventListener("click", async () => {
            buttonText.textContent = "Refreshing";
            loadingSpinner.classList.remove("hidden");
            await observer.refresh();
            loadingSpinner.classList.add("hidden");
            buttonText.textContent = "Refresh data";
        });
    }
}

customElements.define("refresh-button", RefreshButton);
