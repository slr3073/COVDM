import * as L from "leaflet"

export class CustomMarker extends L.Marker {

    constructor(o1: any, o2: any, public option: {id: string, type: string}) {
        super(o1, o2);
    }
}
