import SheetService from "../../api/SheetService";

class SensorChart extends HTMLElement {
    connectedCallback() {
        const sheetService = new SheetService('1EH95aGJZQTrfI6G-5Hx73yCgkbQTKzk1QX_YJ9E7Dlk', 'https://docs.google.com/spreadsheets/d/');

        const data = sheetService.fetchData();

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

customElements.define('sensor-chart', SensorChart);