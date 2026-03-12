

class Alert extends HTMLElement {
    constructor() {
        super();
        this.msg = "";
        this.elem = null;
        this.textElem = null;
    }
    connectedCallback() {
        this.innerHTML = `
<div id="alert-box" class="p-4 mb-4 text-sm hidden rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-md" role="alert">
  <div class="flex items-center gap-3">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400 shrink-0"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
    <span class="font-medium text-red-300"></span>
  </div>
</div>
`;

        this.elem = this.querySelector('#alert-box');
        this.textElem = this.elem.querySelector('span');
    }

    show(msg) {
        if (msg) {
            this.msg = msg;
            if (this.textElem) {
                this.textElem.textContent = this.msg;
            }
        }
        this.elem.classList.remove('hidden');
    }

    hide() {
        if (this.elem) {
            this.elem.classList.add('hidden');
        }
    }
}

customElements.define('alert-box', Alert);
export default Alert;
