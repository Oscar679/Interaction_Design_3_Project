class Index extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
    <!-- Upper part of background. -->
    <div aria-hidden="true" class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"></div>
    </div>
    <!-- Hero header. -->
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="text-center">
            <!-- Badge -->
            <div class="mb-8 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5">
                <span class="relative flex h-2 w-2">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span class="text-sm text-gray-300">Live Weather Data</span>
            </div>
            <h1 class="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">Real Life Measured Data Compared to Weather Stations</h1>
            <!-- Hero text -->
            <p class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">Weather data collected from Campus Växjö, compared side-by-side with official SMHI station readings.</p>
            <!-- Hero calls to actions. -->
            <div class="mt-10 flex items-center justify-center gap-x-4">
                <a href="./dashBoard.html" class="rounded-md bg-linear-to-r from-indigo-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:from-indigo-400 hover:to-purple-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all duration-200">Start Comparing</a>
                <a href="./docs.html" class="rounded-md px-5 py-2.5 text-sm font-semibold text-gray-300 border border-white/15 hover:bg-white/5 hover:text-white transition-all duration-200">View Docs</a>
            </div>
        </div>
    </div>
    <!-- Lower part of background. -->
    <div aria-hidden="true" class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"></div>
    </div>`;
    }

}

customElements.define('index-body', Index);