import SheetService from "../../api/SheetService";

class SensorChart extends HTMLElement {
    async connectedCallback() {
        const sheetService = new SheetService('1EH95aGJZQTrfI6G-5Hx73yCgkbQTKzk1QX_YJ9E7Dlk', 'https://docs.google.com/spreadsheets/d/');

        const data = await sheetService.fetchData();

        this.innerHTML =
            `<div class="relative h-96 w-full">
                <canvas></canvas>
            </div>`;

        const rows = data.table.rows;

        for (let row in rows) {
            // console.log(rows[row].c[0]); INDEX
            // console.log(rows[row].c[1]); DATE OBJECT {f, v}
            // console.log(rows[row].c[2]); TEMPERATURE
            // console.log(rows[row].c[3]); HUMIDITY
            // console.log(rows[row].c[4]); ECO2
            // console.log(rows[row].c[5]); TVOC
        }

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

customElements.define('sensor-chart', SensorChart);