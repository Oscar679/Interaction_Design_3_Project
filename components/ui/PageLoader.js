
class PageLoader extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
            `
            <div class="page-loader fixed inset-0 bg-gray-900 flex items-center justify-center z-50" role="status" aria-live="polite">
                <div class="loader"></div>
            </div>
`;

        const overlay = this.querySelector('.page-loader');

        const hideOverlay = () => {
            setTimeout(() => {
                overlay.classList.add('is-hidden');
            }, 1500);
        };

        window.addEventListener('load', hideOverlay, { once: true });
    }
}

customElements.define('page-loader', PageLoader);
