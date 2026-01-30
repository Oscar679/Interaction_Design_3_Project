import SMHIService from "../../api/SMHIService";

class SMHIChart extends HTMLElement {
    async connectedCallback() {
        const smhiService = new SMHIService(1, 64510, 'latest-day');

        const data = await smhiService.fetchData();

        console.log(data.parameter['unit']);
        console.log(data.parameter['key']);

        this.innerHTML =
            `<div class="relative h-96 w-full">
                <canvas></canvas>
            </div>`;


        const ctx = this.querySelector('canvas');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }
}

customElements.define('smhi-chart', SMHIChart);