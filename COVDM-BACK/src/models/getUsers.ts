import mongoose, {Schema, Document} from "mongoose"

export interface User extends Document {
    _id: object,
    first_name: string,
    last_name: string,
    picture: string
}

const getUserSchema: Schema = new Schema({
    _id: {type: Object},
    first_name: {type: String},
    last_name: {type: String},
    picture: {type: String}
})

export default mongoose.model<User>("users", getUserSchema, "users")
