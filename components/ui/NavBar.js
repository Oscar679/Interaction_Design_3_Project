class NavBar extends HTMLElement {
    connectedCallback() {
        const currentPath = window.location.pathname;

        const navLinks = [
            { href: "./index.html", label: "Home" },
            { href: "./dashBoard.html", label: "Dashboard" },
            { href: "./docs.html", label: "Docs" },
        ];

        const isHome = currentPath === "/" || currentPath.endsWith("/") || currentPath.endsWith("/index.html");

        const renderLink = (link) => {
            const isActive = link.href === "./index.html"
                ? isHome
                : currentPath.endsWith(link.href.replace("./", "/"));

            return `<a href="${link.href}" class="rounded-md px-3 py-2 text-sm font-medium transition ${isActive
                ? "bg-white/8 text-white"
                : "text-slate-300 hover:bg-white/[0.04] hover:text-white"}">${link.label}</a>`;
        };

        const renderMobileLink = (link) => {
            const isActive = link.href === "./index.html"
                ? isHome
                : currentPath.endsWith(link.href.replace("./", "/"));

            return `<a href="${link.href}" class="block rounded-md px-4 py-3 text-sm font-medium transition ${isActive
                ? "bg-white/8 text-white"
                : "text-slate-300 hover:bg-white/[0.04] hover:text-white"}">${link.label}</a>`;
        };

        this.innerHTML = `
            <nav class="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
                <div class="site-panel-strong mx-auto flex max-w-7xl items-center justify-between rounded-[18px] px-4 py-3 sm:px-5">
                    <a href="./index.html" class="flex items-center gap-3 rounded-md px-1 py-1 text-white transition hover:bg-white/[0.03]">
                        <span class="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--site-accent)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/></svg>
                        </span>
                        <span>
                            <span class="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Campus Weather</span>
                            <span class="block text-sm font-medium text-slate-100">Vaxjo campus</span>
                        </span>
                    </a>

                    <div class="hidden items-center gap-1 rounded-lg border border-white/8 bg-black/10 p-1 sm:flex">
                        ${navLinks.map(renderLink).join("")}
                    </div>

                    <button id="mobile-menu-btn" type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-200 transition hover:bg-white/[0.06] sm:hidden">
                        <span class="sr-only">Toggle navigation</span>
                        <svg id="menu-icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" class="size-6">
                            <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <svg id="menu-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" class="size-6 hidden">
                            <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>

                <div id="mobile-menu" class="site-panel-strong mx-auto mt-3 hidden max-w-7xl rounded-[18px] p-3 sm:hidden">
                    <div class="space-y-2">
                        ${navLinks.map(renderMobileLink).join("")}
                    </div>
                </div>
            </nav>
        `;

        const menuBtn = this.querySelector("#mobile-menu-btn");
        const mobileMenu = this.querySelector("#mobile-menu");
        const iconOpen = this.querySelector("#menu-icon-open");
        const iconClose = this.querySelector("#menu-icon-close");

        menuBtn?.addEventListener("click", () => {
            const isOpen = !mobileMenu.classList.contains("hidden");
            mobileMenu.classList.toggle("hidden");
            iconOpen.classList.toggle("hidden");
            iconClose.classList.toggle("hidden");
            menuBtn.setAttribute("aria-expanded", String(!isOpen));
        });
    }
}

customElements.define("nav-bar", NavBar);
