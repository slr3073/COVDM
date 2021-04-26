import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Observable, Subject} from "rxjs"
import {VaccinationCenter} from "./models/vaccinationcenter.model"
import {GetVaccinationCenterResponse} from "./models/http/GET-vaccinationcenter.model"

@Injectable({
    providedIn: "root"
})
export class VaccinationCenterService {

    private _vaccinationCenters: VaccinationCenter[] = []
    private _vaccinationCentersUpdated: Subject<VaccinationCenter[]> = new Subject<VaccinationCenter[]>()


    constructor(private http: HttpClient) {
    }

    fetchVaccinationCenters(): void {
        this.http.get<GetVaccinationCenterResponse[]>("http://localhost:4000/getVaccinationCenters")
            .subscribe((data: GetVaccinationCenterResponse[]) => {
                let tmp: VaccinationCenter[] = []
                for (const vaccinationCenter of data) {
                    const tempis: VaccinationCenter = {
                        _id: vaccinationCenter._id,
                        adr_num: vaccinationCenter.adr_num,
                        adr_voie: vaccinationCenter.adr_voie,
                        com_cp: vaccinationCenter.com_cp,
                        com_nom: vaccinationCenter.com_nom,
                        date_ouverture: vaccinationCenter.date_ouverture,
                        lat_coor1: vaccinationCenter.lat_coor1,
                        long_coor1: vaccinationCenter.long_coor1,
                        nom: vaccinationCenter.nom,
                        rdv: vaccinationCenter.rdv,
                        rdv_consultation_prevaccination: vaccinationCenter.rdv_consultation_prevaccination,
                        rdv_dimanche: vaccinationCenter.rdv_dimanche,
                        rdv_jeudi: vaccinationCenter.rdv_jeudi,
                        rdv_lundi: vaccinationCenter.rdv_lundi,
                        rdv_mardi: vaccinationCenter.rdv_mardi,
                        rdv_mercredi: vaccinationCenter.rdv_mercredi,
                        rdv_samedi: vaccinationCenter.rdv_samedi,
                        rdv_site_web: vaccinationCenter.rdv_site_web,
                        rdv_tel: vaccinationCenter.rdv_tel,
                        rdv_vendredi: vaccinationCenter.rdv_vendredi,
                        structure_cp: vaccinationCenter.structure_cp,
                        structure_num: vaccinationCenter.structure_num,
                        structure_rais: vaccinationCenter.structure_rais,
                        structure_type: vaccinationCenter.structure_type,
                        structure_voie: vaccinationCenter.structure_voie

                    }
                    tmp.push(tempis)
                }
                this._vaccinationCenters = [...tmp]
                this._vaccinationCentersUpdated
                    .next(this._vaccinationCenters)
            })
    }

    get vaccinationCentersObservable(): Observable<VaccinationCenter[]> {
        return this._vaccinationCentersUpdated.asObservable()
    }
}
