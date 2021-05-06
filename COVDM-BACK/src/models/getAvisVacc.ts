import mongoose, {Schema, Document} from "mongoose"

export interface IAvisVacc extends Document {
    user_id: string,
    note: number,
    titre: string,
    com: string
}

const getAvisVaccSchema: Schema = new Schema({
    center_id: {type: String},
    user_id: {type: String},
    note: {type: Number},
    titre: {type: String},
    com: {type: String},
})

export default mongoose.model<IAvisVacc>("avis_vacc", getAvisVaccSchema, "avis_vacc")
