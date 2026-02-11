

class Alert extends HTMLElement {
    constructor() {
        super();
        this.msg = "";
        this.elem = null;
        this.textElem = null;
    }
    connectedCallback() {
        this.innerHTML = `
<div id="alert-box" class="p-4 mb-4 text-sm bg-red-200 hidden text-white rounded-lg" role="alert">
  <span class="font-medium text-red-800"></span>
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
