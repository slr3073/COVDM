import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {User} from "./models/user.model"
import {Observable, Subject} from "rxjs"
import {GetUserResponse} from "./models/http/GET-user.model"


@Injectable({
    providedIn: "root"
})
export class UserService {

    private _users: User[] = []
    private _usersUpdated: Subject<User[]> = new Subject<User[]>()

    constructor(private http: HttpClient) {
    }

    fetchUsers(callback: () => void): void {
        this.http.get<GetUserResponse[]>("http://localhost:4000/getUsers")
            .subscribe((data: GetUserResponse[]) => {
                let tmp: User[] = []
                for (const user of data)
                    tmp.push({first_name: user.first_name, last_name: user.last_name})

                this._users = [...tmp]
                this._usersUpdated.next(this._users)
                callback()
            })

    }

    get userObservable(): Observable<User[]> {
        return this._usersUpdated.asObservable()
    }
}
