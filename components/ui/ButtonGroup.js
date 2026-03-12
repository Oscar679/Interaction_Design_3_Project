import Observable from "../Observable";
import LocalStorage from "./LocalStorage";

class ButtonGroup extends HTMLElement {
  constructor() {
    super();
    this.store = new LocalStorage();
  }

  connectedCallback() {
    this.innerHTML = `

<div class="bg-white/5 backdrop-blur-md border border-white/10 inline-flex rounded-lg p-1 gap-1">

  <button type="button" class="text-sm px-5 py-1.5 cursor-pointer text-gray-400 hover:text-white rounded-md transition-all duration-200 active">
    Day
  </button>

  <button type="button" class="text-sm px-5 py-1.5 cursor-pointer text-gray-400 hover:text-white rounded-md transition-all duration-200">
    Month
  </button>
</div>
`;

    const buttons = this.querySelectorAll('div button');
    const observer = new Observable();

    const cachedPeriod = this.store.getItem('period');
    if (cachedPeriod !== null) {
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