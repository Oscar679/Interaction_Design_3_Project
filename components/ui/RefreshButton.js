import Observable from "../Observable";

class RefreshButton extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <button
        type="button"
        class="inline-flex items-center justify-center h-10 px-6
               text-sm font-medium rounded-md
               bg-emerald-600 text-white
               hover:bg-emerald-500 cursor-pointer">
        <div class="inline-flex items-center gap-2 text-gray-300 loading-spinner">   
            <span class="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white"></span>                       
        </div>
        <p id="button-text">
            Refresh
        </p>
    </button>
`;

        const observer = new Observable();
        const loadingSpinner = this.querySelector('.loading-spinner');
        const button = this.querySelector('button');
        const buttonText = this.querySelector('#button-text');

        loadingSpinner.style.display = 'none';

        button.addEventListener('click', async () => {
            buttonText.textContent = "";
            loadingSpinner.style.display = 'flex';
            await observer.refresh();
            loadingSpinner.style.display = 'none';
            buttonText.textContent = "Refresh";
        });


    }
}

customElements.define('refresh-button', RefreshButton);
