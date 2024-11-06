import * as yup from "yup";
import { getCurrentDateWithMonth } from "../../utils/utils";
export const initialReportData = {
    patient_identifier: '',
    patient_name: '',
    // rrate: '',
    // mentation: '',
    // systolicBP: '',
    // news_rrate: '',
    // news_mentation: '',
    // news_systolicBP: '',
    // news_prate: '',
    // news_loc: '',
    // news_temprature: '',
    qSOFA_score: '',
    news_score: '',
    fever: 'n',
    headache: 'n',
    altered_sensoriam: 'n',
    dyspnoea: 'n',
    cheast_pain: 'n',
    cough: 'n',
    productive_sputum: 'n',
    vomiting: 'n',
    loose_stools: 'n',
    pain_abdomen: 'n',
    local_swelling: 'n',
    wound_ulcer: 'n',
    dysuria: 'n',
    chills: 'n',
    urgency_to_micturate: 'n',
    others: '',
    allergies: 'n',
    dia_mellitus: 'n',
    hypertension: 'n',
    bronchial_asthma: 'n',
    copd: 'n',
    tuberculosis: 'n',
    ischemic_heart_disease: 'n',
    chronic_kidney_disease: 'n',
    chronic_liver_disease: 'n',
    cancer: 'n',
    cerebrovascular_accident: 'n',
    rheumatic_heart_disease: 'n',
    history_others: '',
    prior_surgery: 'n',
    rct_hospitalization: 'n',
    prolonged_hospitalization: 'n',
    previous_intubations: 'n',
    drug_history: '',
    smoking: 'n',
    alcohol: 'n',
    recreational_drugs: 'n',
    breathing_rr: '',
    breathing_spo2: '',
    peripheries_warm_cold: 'n',
    circulation_bp: 'n',
    circulation_bpsys: '',
    circulation_bpdyst: '',
    circulation_hr: '',
    circulation_crt: 'n',
    disability_sensorium: '',
    disability_gcs: '',
    pupils_rsize: '',
    pupils_reactive: 'n',
    pupils_lsize: '',
    pupils_leactive: 'n',
    local_examination: '',
    exposure_temp: '',
    ecg: '',
    cbg: '',
    lung_rsliding: 'n',
    lung_rmultipleBlines: 'n',
    lung_rragged_pleura: 'n',
    lung_reffusion: 'n',
    lung_lsliding: 'n',
    lung_lmultipleBlines: 'n',
    lung_lragged_pleura: 'n',
    lung_leffusion: 'n',
    cardia_ef: '',
    cardia_ivc: '',
    fast_positive: 'n',
    fast_subxiphoid: 'n',
    fast_rgtupr_quadrant: 'n',
    fast_lftupr_quadrant: 'n',
    fast_suprapubic: 'n',
    abg_ph: '',
    abg_pco2: '',
    abg_po2: '',
    abg_hco3: '',
    abg_lactate: '',
    abg_basedefict: '',
    pain_score: '',
    rs_decreased_air_entry: 'n',
    rs_rhonchi: 'n',
    rs_crepts: 'n',
    rs_decreased_air_entry_side: '',
    rs_rhonchi_side: '',
    rs_crepts_side: '',
    guarding: 'n',
    rigidity: 'n',
    bowel_sounds: '',
    neck_rigidity: 'n',
    invest_hb: '',
    invest_wbc_count: '',
    invest_normal_wbc_count: '',
    invest_platelets: '',
    invest_grbs: '',
    invest_crp: '',
    invest_sodium: '',
    invest_potassium: '',
    invest_chloride: '',
    invest_urea: '',
    invest_creatinine: '',
    invest_pt: '',
    invest_aptt: '',
    invest_inr: '',
    invest_total_bilirubin: '',
    invest_direct_bilirubin: '',
    invest_indirect_bilirubin: '',
    invest_SGOT: '',
    invest_SGPT: '',
    invest_ALP: '',
    invest_albumin: '',
    invest_TSH: '',
    invest_procalcitonin: '',
    invest_trop: '',
    invest_CKMB: '',
    invest_cultures_isolate: '',
    imaging_cxr: '',
    imaging_oxray: '',
    imaging_usg: '',
    imaging_orusg: '',
    imaging_relevantct: '',
    imaging_2decho: '',
    imaging_relevant_MRI: '',
    need_escalation_antibiotics: '',
    use_vasopressors: '',
    need_mechanical_ventilation: '',
    need_dialysis: '',
    need_source_control: ''
}

export const validationSchema = yup.object({
    // patient_identifier: yup.string().required("Please enter the above field"),
    patient_name: yup.string().required("Please enter the above field"),
    // rrate: yup.number().required("Please enter the above field"),
    // mentation: yup.number().required("Please enter the above field"),
    // systolicBP: yup.number().required("Please enter the above field"),
    // news_rrate: yup.number().required("Please enter the above field"),
    // news_mentation: yup.number().required("Please enter the above field"),
    // news_systolicBP: yup.number().required("Please enter the above field"),
    // news_loc: yup.number().required("Please enter the above field"),
    // news_temprature: yup.number().required("Please enter the above field"),
    fever: yup.string().required("Please enter the above field"),
    headache: yup.string().required("Please enter the above field"),
    altered_sensoriam: yup.string().required("Please enter the above field"),
    dyspnoea: yup.string().required("Please enter the above field"),
    cheast_pain: yup.string().required("Please enter the above field"),
    cough: yup.string().required("Please enter the above field"),
    productive_sputum: yup.string().required("Please enter the above field"),
    vomiting: yup.string().required("Please enter the above field"),
    loose_stools: yup.string().required("Please enter the above field"),
    pain_abdomen: yup.string().required("Please enter the above field"),
    local_swelling: yup.string().required("Please enter the above field"),
    wound_ulcer: yup.string().required("Please enter the above field"),
    dysuria: yup.string().required("Please enter the above field"),
    chills: yup.string().required("Please enter the above field"),
    urgency_to_micturate: yup.string().required("Please enter the above field"),
    others: yup.string().required("Please enter the above field"),
    allergies: yup.string().required("Please enter the above field"),
    dia_mellitus: yup.string().required("Please enter the above field"),
    hypertension: yup.string().required("Please enter the above field"),
    bronchial_asthma: yup.string().required("Please enter the above field"),
    copd: yup.string().required("Please enter the above field"),
    tuberculosis: yup.string().required("Please enter the above field"),
    ischemic_heart_disease: yup.string().required("Please enter the above field"),
    chronic_kidney_disease: yup.string().required("Please enter the above field"),
    chronic_liver_disease: yup.string().required("Please enter the above field"),
    cancer: yup.string().required("Please enter the above field"),
    cerebrovascular_accident: yup.string().required("Please enter the above field"),
    rheumatic_heart_disease: yup.string().required("Please enter the above field"),
    history_others: yup.string().required("Please enter the above field"),
    prior_surgery: yup.string().required("Please enter the above field"),
    rct_hospitalization: yup.string().required("Please enter the above field"),
    prolonged_hospitalization: yup.string().required("Please enter the above field"),
    previous_intubations: yup.string().required("Please enter the above field"),
    drug_history: yup.string().required("Please enter the above field"),
    smoking: yup.string().required("Please enter the above field"),
    alcohol: yup.string().required("Please enter the above field"),
    recreational_drugs: yup.string().required("Please enter the above field"),
    breathing_rr: yup.number().required("Please enter the above field"),
    breathing_spo2: yup.number().required("Please enter the above field"),
    peripheries_warm_cold: yup.string().required("Please enter the above field"),
    circulation_bp: yup.string().required("Please enter the above field"),
    circulation_bpsys: yup.number().required("Please enter the above field"),
    circulation_bpdyst: yup.number().required("Please enter the above field"),
    circulation_hr: yup.number().required("Please enter the above field"),
    circulation_crt: yup.string().required("Please enter the above field"),
    disability_sensorium: yup.string().required("Please enter the above field"),
    disability_gcs: yup.string().required("Please enter the above field"),
    pupils_rsize: yup.number().required("Please enter the above field"),
    pupils_reactive: yup.string().required("Please enter the above field"),
    pupils_lsize: yup.number().required("Please enter the above field"),
    pupils_leactive: yup.string().required("Please enter the above field"),
    local_examination: yup.string().required("Please enter the above field"),
    exposure_temp: yup.number().required("Please enter the above field"),
    ecg: yup.string().required("Please enter the above field"),
    cbg: yup.number().required("Please enter the above field"),
    lung_rsliding: yup.string().required("Please enter the above field"),
    lung_rmultipleBlines: yup.string().required("Please enter the above field"),
    lung_rragged_pleura: yup.string().required("Please enter the above field"),
    lung_reffusion: yup.string().required("Please enter the above field"),
    lung_lsliding: yup.string().required("Please enter the above field"),
    lung_lmultipleBlines: yup.string().required("Please enter the above field"),
    lung_lragged_pleura: yup.string().required("Please enter the above field"),
    lung_leffusion: yup.string().required("Please enter the above field"),
    cardia_ef: yup.number().required("Please enter the above field"),
    cardia_ivc: yup.string().required("Please enter the above field"),
    fast_positive: yup.string().required("Please enter the above field"),
    fast_subxiphoid: yup.string().when('fast_positive', {
        is: (r:any) => r === 'y', 
        then: yup.string().required('Please enter the above field')
    }),
    fast_rgtupr_quadrant: yup.string().when('fast_positive', {
        is: (r:any) => r === 'y', 
        then: yup.string().required('Please enter the above field')
    }),
    fast_lftupr_quadrant: yup.string().when('fast_positive', {
        is: (r:any) => r === 'y', 
        then: yup.string().required('Please enter the above field')
    }),
    fast_suprapubic: yup.string().when('fast_positive', {
        is: (r:any) => r === 'y', 
        then: yup.string().required('Please enter the above field')
    }),
    abg_ph: yup.number().required("Please enter the above field"),
    abg_pco2: yup.number().required("Please enter the above field"),
    abg_po2: yup.number().required("Please enter the above field"),
    abg_hco3: yup.number().required("Please enter the above field"),
    abg_lactate: yup.number().required("Please enter the above field"),
    abg_basedefict: yup.number().required("Please enter the above field"),
    pain_score: yup.number().required("Please enter the above field"),
    rs_decreased_air_entry: yup.string().required("Please enter the above field"),
    rs_rhonchi: yup.string().required("Please enter the above field"),
    rs_crepts: yup.string().required("Please enter the above field"),
    rs_decreased_air_entry_side: yup.string().when('rs_decreased_air_entry', {
        is: (r:any) => r === 'y', 
        then: yup.string().required('Please enter the above field')
    }),
    rs_rhonchi_side: yup.string().when('rs_rhonchi', {
        is: (r:any) => r === 'y', 
        then: yup.string().required('Please enter the above field')
    }),
    rs_crepts_side: yup.string().when('rs_crepts', {
        is: (r:any) => r === 'y', 
        then: yup.string().required('Please enter the above field')
    }),
    guarding: yup.string().required("Please enter the above field"),
    rigidity: yup.string().required("Please enter the above field"),
    bowel_sounds: yup.number().required("Please enter the above field"),
    neck_rigidity: yup.string().required("Please enter the above field"),
    invest_hb: yup.number().required("Please enter the above field"),
    invest_wbc_count: yup.number().required("Please enter the above field"),
    invest_normal_wbc_count: yup.string().required("Please enter the above field"),
    invest_platelets: yup.number().required("Please enter the above field"),
    invest_grbs: yup.number().required("Please enter the above field"),
    invest_crp: yup.number().required("Please enter the above field"),
    invest_sodium: yup.number().required("Please enter the above field"),
    invest_potassium: yup.number().required("Please enter the above field"),
    invest_chloride: yup.number().required("Please enter the above field"),
    invest_urea: yup.number().required("Please enter the above field"),
    invest_creatinine: yup.number().required("Please enter the above field"),
    invest_pt: yup.number().required("Please enter the above field"),
    invest_aptt: yup.number().required("Please enter the above field"),
    invest_inr: yup.number().required("Please enter the above field"),
    invest_total_bilirubin: yup.number().required("Please enter the above field"),
    invest_direct_bilirubin: yup.number().required("Please enter the above field"),
    invest_indirect_bilirubin: yup.number().required("Please enter the above field"),
    invest_SGOT: yup.number().required("Please enter the above field"),
    invest_SGPT: yup.number().required("Please enter the above field"),
    invest_ALP: yup.number().required("Please enter the above field"),
    invest_albumin: yup.number().required("Please enter the above field"),
    invest_TSH: yup.number().required("Please enter the above field"),
    invest_procalcitonin: yup.number().required("Please enter the above field"),
    invest_trop: yup.number().required("Please enter the above field"),
    invest_CKMB: yup.number().required("Please enter the above field"),
    invest_cultures_isolate: yup.string().required("Please enter the above field"),
    imaging_cxr: yup.string().required("Please enter the above field"),
    imaging_oxray: yup.string().required("Please enter the above field"),
    imaging_usg: yup.string().required("Please enter the above field"),
    imaging_orusg: yup.string().required("Please enter the above field"),
    imaging_relevantct: yup.string().required("Please enter the above field"),
    imaging_2decho: yup.string().required("Please enter the above field"),
    imaging_relevant_MRI: yup.string().required("Please enter the above field"),
    need_escalation_antibiotics: yup.string().required("Please enter the above field"),
    use_vasopressors: yup.string().required("Please enter the above field"),
    need_mechanical_ventilation: yup.string().required("Please enter the above field"),
    need_dialysis: yup.string().required("Please enter the above field"),
    need_source_control: yup.string().required("Please enter the above field")
});