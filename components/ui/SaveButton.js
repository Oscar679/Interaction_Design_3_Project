class SaveButton extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <button
        type="button"
        class="inline-flex items-center justify-center h-10 px-6
               text-sm font-medium rounded-md
               bg-emerald-600 text-white
               hover:bg-emerald-500
               focus:outline-2 focus:outline-offset-2 focus:outline-emerald-500">
        Save
      </button>
`;
    }
}

customElements.define('save-button', SaveButton);