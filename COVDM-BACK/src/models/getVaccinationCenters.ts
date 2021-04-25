import mongoose, { Schema, Document } from 'mongoose';

export interface VaccinationCenter extends Document {
    _id: object,
    gid: number,
    nom: string,
    xy_precis: number,
    id_adr: string,
    adr_num: string,
    adr_voie: string,
    com_cp: number,
    com_insee: number,
    com_nom: string,
    lat_coor1: number,
    long_coor1: number,
    structure_siren: number,
    structure_type: string,
    structure_rais: string,
    structure_num: string,
    structure_voie: string,
    structure_cp: number,
    structure_insee: number,
    structure_com: string,
    _userid_creation: number,
    _userid_modification: number,
    _edit_datemaj: object,
    rdv_lundi: string,
    rdv_mardi: string,
    rdv_mercredi: string,
    rdv_jeudi: string,
    rdv_vendredi: string,
    rdv_samedi: string,
    rdv_dimanche: string,
    rdv: string,
    date_ouverture: object,
    rdv_site_web: string,
    rdv_tel: string,
    rdv_consultation_prevaccination: string
}

const getVaccinationCentersSchema: Schema = new Schema({
    _id: {type: Object},
    gid: {type: Number},
    nom: {type: String},
    xy_precis: {type: Number},
    id_adr: {type: String},
    adr_num: {type: String},
    adr_voie: {type: String},
    com_cp: {type: Number},
    com_insee: {type: Number},
    com_nom: {type: String},
    lat_coor1: {type: Number},
    long_coor1: {type: Number},
    structure_siren: {type: Number},
    structure_type: {type: String},
    structure_rais: {type: String},
    structure_num: {type: String},
    structure_voie: {type: String},
    structure_cp: {type: Number},
    structure_insee: {type: Number},
    structure_com: {type: String},
    _userid_creation: {type: Number},
    _edit_datemaj: {type: Object},
    rdv_lundi: {type: String},
    rdv_mardi: {type: String},
    rdv_mercredi: {type: String},
    rdv_jeudi: {type: String},
    rdv_vendredi: {type: String},
    rdv_samedi: {type: String},
    rdv_dimanche: {type: String},
    rdv: {type: String},
    date_ouverture: {type: Object},
    rdv_site_web: {type: String},
    rdv_tel: {type: String},
    rdv_consultation_prevaccination: {type: String}
})

export default mongoose.model<VaccinationCenter>('vaccination_centers', getVaccinationCentersSchema)
