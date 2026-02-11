// Implements Singleton design pattern, Implements Observer design pattern
class Observable {
    static instance;

    constructor() {
        if (Observable.instance) {
            return Observable.instance;
        }

        Observable.instance = this;

        this.charts = [];
    }

    subscribe(func) {
        console.log('in subscribe');
        this.charts.push(func);
    }

    notify(period) {
        console.log('in notify');
        console.log(this.charts);
        this.charts.forEach((chart) => chart.updatePeriod(period));

    }

    refresh() {
        console.log('in refresh');
        return Promise.all(this.charts.map(chart => {
            if (typeof chart.renderChart === 'function') {
                return chart.renderChart(chart.period);
            }
            if (typeof chart.renderTemperature === 'function') {
                return chart.renderTemperature();
            }
            return Promise.resolve();
        }));
    }
}

export default Observable;
