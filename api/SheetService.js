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
            console.error(e.message);
        }
    }
}

export default SheetService;