class ParticleCanvas extends HTMLElement {
    connectedCallback() {
        const container = document.createElement('div');
        container.id = 'particles-js';
        container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;';
        document.body.prepend(container);

        const script = document.createElement('script');
        script.src = '/particles.js';
        script.onload = () => {
            window.particlesJS.load('particles-js', '/particles-config.json');
        };
        document.head.appendChild(script);
    }
}

customElements.define('particle-canvas', ParticleCanvas);
