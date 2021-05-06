import mongoose, {Schema, Document} from "mongoose"

export interface IAvisTest extends Document {
    center_id: string,
    user_id: string,
    note: number,
    titre: string,
    com: string
}

const getAvisTestSchema: Schema = new Schema({
    center_id: {type: String},
    user_id: {type: String},
    note: {type: Number},
    titre: {type: String},
    com: {type: String},
})

export default mongoose.model<IAvisTest>("avis_test", getAvisTestSchema, "avis_test")
