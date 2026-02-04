
class Documentation extends HTMLElement {
    connectedCallback() {
        const title = this.querySelector('h2').innerHTML || '';
        const description = this.querySelector('div').innerHTML || '';
        const content = this.querySelector('template').innerHTML || '';
        this.innerHTML =
            `
    <div class="m-6 max-w-[60%] mx-auto">
        <h3 class="text-white text-xl mb-4">${title || ""}</h3>
        <div class="text-gray-300">${description}</div>
        <pre class="line-numbers rounded-lg"><code class="language-javascript">${content}</code></pre>
    </div>
`
        Prism.highlightElement(this.querySelector('code'));
    }
}

customElements.define('docs-section', Documentation);