import express, {Express, NextFunction, Request, Response} from "express"
import bodyParser from "body-parser"
import Post, {IPost} from "./models/post"
import mongoose from "mongoose"

export class Server {
    constructor(readonly port: number) {
    }

    start(): void {
        const app: Express = express()
        const dbURL: string = "mongodb+srv://slr3073:Du5xXZncyC9acs8k@covdm-cluster.fhcmf.mongodb.net/covdm?retryWrites=true&w=majority"
        mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
            console.log("Connected to database")
        }).catch(err => {
            console.log("DB Connection Error:" + err.message);
        });

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: false}))

        app.use((req: Request, res: Response, next: NextFunction) => {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
            next()
        })

        //Du5xXZncyC9acs8k
        app.post("/posts", (req: Request, res: Response) => {
            const post: IPost = new Post({
                title: req.body.title,
                content: req.body.content
            })
            post.save()
            res.status(201).json({message: "Bien ouej"})
        })

        app.get("/posts", (req: Request, res: Response) => {
            Post.find().then(posts => {
                res.status(200).json(posts)
            })
        })

        app.listen(this.port)
    }
}
