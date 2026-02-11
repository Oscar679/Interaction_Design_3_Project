import Observable from "../Observable";
import LocalStorage from "./LocalStorage";

class ButtonGroup extends HTMLElement {
  constructor() {
    super();
    this.store = new LocalStorage();
  }

  connectedCallback() {
    this.innerHTML = `

<div class="bg-gray-900 inline-flex -space-x-px rounded-md p-2">

  <button type="button" class="text-sm px-6 py-2 mx-2 cursor-pointer text-gray-400 hover:bg-white/5 hover:text-white rounded-md p-2 default: active">
    Day
  </button>

  <button type="button" class="text-sm px-6 py-2 mx-2 cursor-pointer text-gray-400 hover:bg-white/5 hover:text-white rounded-md p-2">
    Month
  </button>
</div>
`;

    const buttons = this.querySelectorAll('div button');
    const observer = new Observable();

    if (this.store.getItem('period') !== null) {
      const cachedPeriod = this.store.getItem('period');
      buttons.forEach(button => {
        if (button.textContent.trim() === cachedPeriod) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }

    buttons.forEach((button) =>
      button.addEventListener('click', () => {
        buttons.forEach(b =>
          b.classList.remove('active'));
        button.classList.add('active');

        observer.notify(button.textContent.trim());
      }));
  }
}

customElements.define('button-group', ButtonGroup);