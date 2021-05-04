import express, {Express, NextFunction, Request, Response} from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import avis_test from "./models/getAvisTest"
import avis_vacc from "./models/getAvisVacc"
import vaccination_centers from "./models/getVaccinationCenters"
import users from "./models/getUsers"
import test_centers from "./models/getTestCenters"

export class Server {
    constructor(readonly port: number) {
    }

    start(): void {
        const app: Express = express()
        const dbURL: string = "mongodb+srv://slr3073:Du5xXZncyC9acs8k@covdm-cluster.fhcmf.mongodb.net/covdm?retryWrites=true&w=majority"
        mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
            console.log("Connected to database")
        }).catch(err => {
            console.log("DB Connection Error:" + err.message)
        })

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: false}))

        app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
            next()
        })

        app.get("/getUsers", (req: Request, res: Response) => {
            users.find().then(users => {
                res.status(200).json(users)
            })
        })

        app.get("/getVaccinationCenters", (req: Request, res: Response) => {
            vaccination_centers.find().then(centers => {
                res.status(200).json(centers)
            })
        })

        app.get("/getTestCenters", (req: Request, res: Response) => {
            test_centers.find().then(centers => {
                res.status(200).json(centers)
            })
        })

        app.get("/getAvisVacc", (req: Request, res: Response) => {
            avis_vacc.find().then(avis => {
                res.status(200).json(avis)
            })
        })

        app.get("/getAvisTest", (req: Request, res: Response) => {
            avis_test.find().then(posts => {
                res.status(200).json(posts)
            })
        })

        app.listen(this.port)
    }
}
