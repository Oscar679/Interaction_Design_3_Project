import Service from "./AbstractService"

class SheetService extends Service {
    constructor(sheetId, url) {
        super();
        this.sheetId = sheetId;
        this.url = url;
    }

    async fetchData() {
        const url = `${this.url}${this.sheetId}/gviz/tq?tqx=out:json`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response Status: ${response.status}`);
            }

            const text = await response.text();
            const json = JSON.parse(
                text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
            );
            return json;
        } catch (e) {
            throw new Error("Failed to fetch data from Google Sheets. Please try again later.");
        }
    }
}

export default SheetService;