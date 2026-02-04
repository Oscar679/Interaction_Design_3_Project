import Observable from "../Observable";

class ButtonGroup extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `

<div class="bg-gray-900 inline-flex -space-x-px rounded-md p-2">

  <button type="button" class="text-sm px-6 py-2 cursor-pointer text-gray-400 hover:bg-white/5 hover:text-white rounded-md p-2 default: active">
    Day
  </button>

  <button type="button" class="text-sm px-6 py-2 cursor-pointer text-gray-400 hover:bg-white/5 hover:text-white rounded-md p-2">
    Month
  </button>
</div>
`;

    const observer = new Observable();

    const buttons = this.querySelectorAll('div button');
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