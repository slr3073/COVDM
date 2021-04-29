import {Injectable} from "@angular/core"
import {HttpClient} from "@angular/common/http"
import {User} from "./models/user.model"
import {Observable, Subject} from "rxjs"
import {GetUserResponse} from "./models/http/GET-user.model"

@Injectable({
    providedIn: "root"
})
export class UserService {
    private _usersFetched: boolean = false
    private _users: User[] = []
    private _usersUpdated: Subject<User[]> = new Subject<User[]>()

    constructor(private http: HttpClient) {
    }

    fetchUsers(callback: () => void): void {
        if(this._usersFetched) callback()
        this.http.get<GetUserResponse[]>("http://localhost:4000/getUsers")
            .subscribe((data: GetUserResponse[]) => {
                let users: User[] = []
                for (const user of data)
                    users.push({_id: user._id, first_name: user.first_name, last_name: user.last_name})

                this._users = [...users]
                this._usersUpdated.next(this._users)

                this._usersFetched = true
                callback()
            })

    }

    getUserByID(id: string): User {
        console.log("get by id" + id)
        for (const user of this._users)
            if (id == user._id) return user
        return null
    }

    get userObservable(): Observable<User[]> {
        return this._usersUpdated.asObservable()
    }
}
