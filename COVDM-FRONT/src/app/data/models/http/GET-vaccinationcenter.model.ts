export interface GetVaccinationCenterResponse {
    _id: string;
    gid: number;
    nom: string;
    xy_precis: number;
    id_adr: string;
    adr_num: string;
    adr_voie: string;
    com_cp: number;
    com_insee: number;
    com_nom: string;
    lat_coor1: number;
    long_coor1: number;
    structure_siren: number;
    structure_type: string;
    structure_rais: string;
    structure_num: string;
    structure_voie: string;
    structure_cp: number;
    structure_insee: number;
    structure_com: string;
    _userid_creation: number;
    _userid_modification: number;
    _edit_datemaj: string;
    rdv_lundi: string;
    rdv_mardi: string;
    rdv_mercredi: string;
    rdv_jeudi: string;
    rdv_vendredi: string;
    rdv_samedi: string;
    rdv_dimanche: string;
    rdv: string;
    date_ouverture: string;
    rdv_site_web: string;
    rdv_tel: string;
    rdv_consultation_prevaccination: string;
}
