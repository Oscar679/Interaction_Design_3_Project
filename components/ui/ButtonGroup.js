class ButtonGroup extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `

<div class="bg-gray-900 inline-flex -space-x-px rounded-md p-2">
  <button type="button" class="text-sm px-6 py-2 cursor-pointer text-gray-400 hover:bg-white/5 hover:text-white rounded-md p-2">
    Profile
  </button>

  <button type="button" class="text-sm px-6 py-2 cursor-pointer text-gray-400 hover:bg-white/5 hover:text-white rounded-md p-2">
    Settings
  </button>

  <button type="button" class="text-sm px-6 py-2 cursor-pointer text-gray-400 hover:bg-white/5 hover:text-white rounded-md p-2">
    Profile
  </button>
</div>
`;
    }
}

customElements.define('button-group', ButtonGroup);