import Observable from "../Observable";

class RefreshButton extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <button
        type="button"
        class="inline-flex items-center justify-center h-9 px-4
               text-sm font-medium rounded-lg
               bg-linear-to-r from-indigo-500 to-purple-500 text-white
               hover:from-indigo-400 hover:to-purple-400 cursor-pointer transition-all duration-200 shadow-md shadow-indigo-500/20">
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
