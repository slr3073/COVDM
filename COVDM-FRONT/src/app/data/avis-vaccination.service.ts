import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {Avis} from "./models/avis.model"
import {Observable, Subject} from "rxjs"
import {GetAvisResponse} from "./models/http/GET-avis.model"

@Injectable({
    providedIn: "root"
})
export class AvisVaccinationService {
    private _avisFetched: boolean = false
    private _avis: Avis[] = []
    private _avisUpdated: Subject<Avis[]> = new Subject<Avis[]>()

    constructor(private http: HttpClient) {
    }

    get testAvisTestObservable(): Observable<Avis[]> {
        return this._avisUpdated.asObservable()
    }

    fetchAvisVaccination(callback: () => void): void {
        if (this._avisFetched) callback()
        this.http.get<GetAvisResponse[]>("http://localhost:4000/getAvisVacc")
            .subscribe((data: GetAvisResponse[]) => {
                let listeAvis: Avis[] = []
                for (const avis of data)
                    listeAvis.push({
                        _id: avis["_id"],
                        title: avis["titre"],
                        content: avis["com"],
                        rating: avis["note"],
                        userID: avis["user_id"],
                        testCenterID: avis["center_id"]
                    })

                this._avis = [...listeAvis]
                this._avisUpdated.next(this._avis)
                this._avisFetched = true
                callback()
            })
    }

    getAvisByCenterID(id: string ): Avis[] {
        let result: Avis[] = []
        if (!this._avisFetched){
            this.fetchAvisVaccination(()=> {
                for (const avis of this._avis)
                    if (avis.testCenterID == id ) result.push(avis)
                return result
            })
        }
        for (const avis of this._avis)
            if (avis.testCenterID == id ) result.push(avis)
        return result
    }

    getAvisByUserID(id: string ): Avis[] {
        let result: Avis[] = []
        if (!this._avisFetched){
            this.fetchAvisVaccination(()=> {
                for (const avis of this._avis)
                    if (avis.userID == id ) result.push(avis)
                return result
            })
        }
        for (const avis of this._avis)
            if (avis.userID == id ) result.push(avis)

        return result
    }
}
