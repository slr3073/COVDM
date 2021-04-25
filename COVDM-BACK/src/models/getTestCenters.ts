import mongoose, { Schema, Document } from 'mongoose';

export interface TestCenter extends Document {
    _id: object,
    ID: string,
    id_ej: number,
    finess: number,
    rs: string,
    adresse: string,
    do_prel: string,
    do_antigenic: string,
    longitutde: number,
    latitude: number,
    mod_prel: string,
    public: string,
    horaire: string,
    check_rdv: string,
    tel_rdv: string,
    date_modif: object
}

const getTestCentersSchema: Schema = new Schema({
    _id: {type: Object},
    ID: {type: String},
    id_ej: {type: Number},
    finess: {type: Number},
    rs: {type: String},
    adresse: {type: String},
    do_prel: {type: String},
    do_antigenic: {type: String},
    longitutde: {type: Number},
    latitude: {type: Number},
    mod_prel: {type: String},
    public: {type: String},
    horaire: {type: String},
    check_rdv: {type: String},
    tel_rdv: {type: String},
    date_modif: {type: Object}
})

export default mongoose.model<TestCenter>('test_centers', getTestCentersSchema)
