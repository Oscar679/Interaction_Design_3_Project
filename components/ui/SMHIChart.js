import SMHIService from "../../api/SMHIService";

class SMHIChart extends HTMLElement {
    connectedCallback() {
        const smhiService = new SMHIService(1, 64510, 'latest-day');

        const data = smhiService.fetchData();

        console.log(data);

        this.innerHTML =
            `<div>
                <canvas></canvas>
            </div>`;


        const ctx = this.querySelector('canvas');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
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