class TestChart extends HTMLElement {
    connectedCallback() {
        this.innerHTML =
            `<div>
                <canvas id="myChart"></canvas>
            </div>`;


        const ctx = this.querySelector('#myChart');

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

customElements.define('test-chart', TestChart);