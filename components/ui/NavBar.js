class NavBar extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname;

        const navLinks = [
            { href: '/index.html', label: 'Home' },
            { href: '/dashBoard.html', label: 'Dashboard' },
            { href: '/docs.html', label: 'Docs' },
        ];

        const isHome = currentPath === '/' || currentPath.endsWith('/index.html');

        const renderLink = (link) => {
            const isActive = link.href === '/index.html'
                ? isHome
                : currentPath.endsWith(link.href);
            const activeClasses = isActive
                ? 'text-white border-b-2 border-indigo-500'
                : 'text-gray-300 hover:bg-white/5 hover:text-white';
            return `<a href="${link.href}" class="rounded-md px-3 py-2 text-sm font-medium ${activeClasses}">${link.label}</a>`;
        };

        const renderMobileLink = (link) => {
            const isActive = link.href === '/index.html'
                ? isHome
                : currentPath.endsWith(link.href);
            const activeClasses = isActive
                ? 'bg-indigo-500/10 text-white border-l-2 border-indigo-500'
                : 'text-gray-300 hover:bg-white/5 hover:text-white';
            return `<a href="${link.href}" class="block rounded-md px-4 py-2.5 text-sm font-medium ${activeClasses}">${link.label}</a>`;
        };

        this.innerHTML = ` <nav class="sticky top-0 z-50 bg-gray-800/80 backdrop-blur-md border-b border-white/10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <button id="mobile-menu-btn" type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                        <span class="sr-only">Open main menu</span>
                        <svg id="menu-icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" class="size-6">
                            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg id="menu-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" class="size-6 hidden">
                            <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div class="hidden sm:flex shrink-0 items-center gap-2.5">
                    <a href="/index.html" class="flex items-center gap-2.5 text-indigo-500 hover:text-indigo-400 transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-thermometer-icon lucide-thermometer"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                       <span class="text-white text-sm font-semibold">Campus Weather</span>
                    </a>
                </div>
                <div class="hidden sm:flex absolute left-1/2 -translate-x-1/2">
                    <div class="flex space-x-4">
                        ${navLinks.map(renderLink).join('\n                        ')}
                    </div>
                </div>
            </div>
        </div>
        <!-- Mobile menu -->
        <div id="mobile-menu" class="hidden sm:hidden border-t border-white/10 bg-gray-900/95 backdrop-blur-md">
            <div class="space-y-1 px-3 py-3">
                ${navLinks.map(renderMobileLink).join('\n                ')}
            </div>
        </div>
    </nav>`;

        const menuBtn = this.querySelector('#mobile-menu-btn');
        const mobileMenu = this.querySelector('#mobile-menu');
        const iconOpen = this.querySelector('#menu-icon-open');
        const iconClose = this.querySelector('#menu-icon-close');

        menuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            iconOpen.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
            menuBtn.setAttribute('aria-expanded', !isOpen);
        });
    }
}

customElements.define('nav-bar', NavBar);