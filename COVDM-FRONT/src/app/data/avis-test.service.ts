import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {GetAvisResponse} from "./models/http/GET-avis.model"
import {Avis} from "./models/avis.model"
import {Subject} from "rxjs"

@Injectable({
    providedIn: "root"
})
export class AvisTestService {
    avisFetched: boolean = false
    private _avis: Avis[] = []
    private _avisUpdated: Subject<Avis[]> = new Subject<Avis[]>()

    constructor(private http: HttpClient) {
    }

    fetchAvisTest(callback: () => void): void {
        if (this.avisFetched) callback()
        this.http.get<GetAvisResponse[]>("http://localhost:4000/getAvisTest")
            .subscribe((data: GetAvisResponse[]) => {
                let listeAvis: Avis[] = []
                for (const avis of data) {
                    listeAvis.push({
                        _id: avis["_id"],
                        title: avis["titre"],
                        content: avis["com"],
                        rating: avis["note"],
                        userID: avis["user_id"],
                        testCenterID: avis["center_id"]
                    })
                }


                this._avis = [...listeAvis]
                this._avisUpdated.next(this._avis)
                this.avisFetched = true
                callback()
            })
    }

    getAvisByCenterID(id: string, callback: (result: Avis[]) => void) {
        let result: Avis[] = []
        if (!this.avisFetched) {
            this.fetchAvisTest(() => {
                for (const avis of this._avis)
                    if (avis.testCenterID == id) result.push(avis)
                callback(result)
            })
            return
        }
        for (const avis of this._avis)
            if (avis.testCenterID == id) result.push(avis)


        callback(result)
    }

    getAvisByUserID(id: string): Avis[] {
        let result: Avis[] = []
        if (!this.avisFetched) {
            this.fetchAvisTest(() => {
                for (const avis of this._avis)
                    if (avis.userID == id) result.push(avis)
                return result
            })
        }

        for (const avis of this._avis) {
            if (avis.userID == id) result.push(avis)
        }

        return result
    }

    addAvis(avis, callback: (avis: Avis) => void) {
        this.http.post("http://localhost:4000/postAvisTest",avis).subscribe((response)=>{
            let avis2: Avis = {
                rating: avis.rating,
                title: avis.title,
                content: avis.content,
                _id: response["id"],
                testCenterID: avis.testCenterID,
                userID: avis.userID
            }
            console.log(avis2)
            this._avis.push(avis2)
            callback(avis2)
        })
    }
}
