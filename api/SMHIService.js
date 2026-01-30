import Service from "./AbstractService";

class SMHIService extends Service {
    constructor(parameter, station, period) {
        super();
        this.parameter = parameter;
        this.station = station;
        this.period = period;
    }

    async fetchData() {
        const url = `https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/${this.parameter}/station/${this.station}/period/${this.period}/data.json`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (e) {
            console.error(e.message);
        }
    }
}

export default SMHIService;