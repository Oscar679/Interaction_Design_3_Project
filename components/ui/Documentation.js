import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

class Documentation extends HTMLElement {
    connectedCallback() {
        const title = this.querySelector('h2').innerHTML || '';
        const description = this.querySelector('div').innerHTML || '';
        const content = this.querySelector('template').innerHTML || '';
        this.innerHTML =
            `
    <div class="m-6 max-w-[60%] mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all duration-300">
        <h3 class="text-white text-xl font-semibold mb-2">${title || ""}</h3>
        <p class="text-gray-400 text-sm mb-4">${description}</p>
        <pre class="line-numbers rounded-lg"><code class="language-javascript">${content}</code></pre>
    </div>
`
        Prism.highlightElement(this.querySelector('code'));
    }
}

customElements.define('docs-section', Documentation);