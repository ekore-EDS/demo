
export const PLOT_SIZE: any = {
    '15x24': 5000,
    '12x18': 4000,
    '9x12': 2000
}

export const YES_NO_LIST: any[] = [{ value: 'y', label: {eng: 'Yes'}}, { value: 'n', label: {eng: 'No'}}]

export const NOR_ABN_LIST: any[] = [{ value: 'normal', label: {eng: 'Normal'}}, { value: 'abnormal', label: {eng: 'Abnormal'}}]

export const FIELD_VALUE_LIST: any = {
    patient_identifier: 'Patient Identifier',
    patient_name: 'Patient Name',
    RR: 'Respiratory rate (RR) ≥ 22 breaths per minute',
    AM: 'Altered mentation (Glasgow Coma Scale [GCS] < 15)',
    R_RATE: 'Respiration rate <8, >25',
    OXY_SAT: 'Oxygen saturation <91',
    SBP: 'Systolic blood pressure',
    P_RATE: 'Pulse rate <40 >131',
    LE_CON: 'Level of consciousness or new confusion',
    TEM_35: 'Temperature <35 >39.1',
    FEVER: 'Fever',
    HEADCHE: 'Headache',
    ALTERED_SEN: 'Altered sensorium',
    DYSPONIA: 'Dyspnoea',
    CHEST_PAIN: 'Chest pain',
    COUGH: 'Cough',
    PROD_SPUT: 'Productive sputum',
    VOMATING: 'Vomiting',
    LOOSE_STOOLS: 'Loose stools',
    PAIN_ABD: 'Pain abdomen',
    LOC_SWEL: 'Local swelling',
    WOU_ULC: 'Wound/ulcer',
    DYSRIA: 'Dysuria',
    CHILLS: 'Chills',
    URG_MEC: 'Urgency to micturate',
    OTHERS: 'Others',
    HISTORY: 'History',
    ALERGIES: 'Allergies',
    COR_BIOD: 'Co-morbidities',
    DIA_MELL: 'Diabetes mellitus',
    HYPERTENSIN: 'Hypertension',
    BRON_AST: 'Bronchial asthma',
    COPD: 'COPD',
    TUBER_COL: 'Tuberculosis',
    ISCH_HEART: 'Ischemic heart disease',
    CHOR_KID: 'Chronic kidney disease',
    CHOR_LIVER: 'Chronic liver disease',
    CANCER: 'Cancer',
    CEREB_ACCED:'Cerebrovascular accident',
    RHEU_HEART: 'Rheumatic heart disease',
    PRIO_SURG: 'Prior surgery',
    RECE_HOSPITAl: 'Recent hospitalization for similar complaint',
    PRO_HOSPITALIZATION: 'Prolonged hospitalization',
    PREV_INTBTN: 'Previous Intubations',
    DRUG_HIS: 'Drug history',
    SMOKING: 'Smoking',
    ALCOHOL: 'Alcohol',
    REC_DRUG: 'Recreational drugs',
    BREATHING_RR: 'RR (cpm)',
    SPO2: 'SpO2 (%@RA)',
    PERI_W_COLD: 'Peripheries warm cold',
    BPRN: 'Blood pressure recordable/ not recordable',
    BP_SYS: 'BP systolic in mm Hg',
    BP_DYST: 'BP diastolic in mm Hg',
    HR6090: 'HR 60-90 bpm',
    CRT2: 'CRT <2 seconds',
    SENSORIUM:'Sensorium (AVPU)',
    GCS:'GCS',
    SIZE:'Size (cm)',
    REACTIVE:'Reactive',
    LOCAL_EXA:'local examination',
    TEMP_DEG:'Temperature (in degrees Farenheit)',
    ECG:'ECG',
    CBG:'CBG (mg/dl)',
    POCUS:'POCUS ',
    LUNGS:'a. Lungs',
    RIGHT:'Right ',
    LUNG_SLID:'Lung sliding ',
     MULTIPLE_BLINE:'Multiple B lines ',
     RAGGED_PLE:'Ragged pleura ', 
     EFFUSION:'Effusion ',
     LEFT:'Left',
     LUNG_SLIDING:'Lung sliding ',
    MUL_BLIN:'Multiple B lines ',
    RAGG_PLE:'Ragged pleura ',
    EFFU:'Effusion ',
    CARDIA:'b. Cardia',
    EF:'EF ',
    IVC:'IVC- >50% collapsibility',
    FAST:'c. FAST',
    SUB_X:'Subxiphoid ',
    RIGHR_UPPER:'Right upper quadrant ',
    LEFT_UPPER:'Left upper quadrant ',
    SUPRA:'Suprapubic ',
    ABG:'ABG ',
    PH:'pH',
    PCO:'pCO2 (kPa)',
    PO2:'pO2 (kPa)',
    HCO3:'HCo3 (mEq)',
    LACTATE:'Lactate 0.5-1.6',
    BASE_DEF:'Base deficit, -2 to +2',
    PAIN_SCORE:'Pain score',
    SYSTA_EXA:'Systemic examination',
    RS:'RS ',
    DECR_AIR:'Decreased air entry',
    RHON:'Rhonchi',
    CREP:'Crepts',
    PER_ABD:'Per Abdomen',
    GUAR:'Guarding',
    RIGI:'Rigidity',
    BOW_SOU:'Bowel sounds',
    NECK_RIG:'Neck rigidity',
    INVES:'Investigations',
    HB:'Hb (mg/dl)',
    WBC:'WBC count (/cc m)',
    NOR_WBC:'Normal WBC count with greater than 10 percent immature forms.',
    PLA:'Platelets (/cc m)',
    GRBS:'GRBS (mg/dl)',
    CRP:'CRP (mg/L)',
    SODIUM:'Sodium (mEq/dL)',
    POTAS:'Potassium (mEq/dL)',
    CHLO:'Chloride (mEq/dL)',
    UREA:'Urea (mEq/dL)',
    CREAT:'Creatinine (mEq/dL)',
    PT_S:'PT (seconds)',
    APTT:'aPTT (seconds)',
    INR:'INR',
    TOTAL_BILU:'Total Bilirubin (mg/dL)',
    DIRE_BILI:'Direct Bilirubin (mg/dL)',
    INDIRECT_BIL:'Indirect Bilirubin (mg/dL)',
    SGOT:'SGOT (U/L)',
    SGPT:'SGPT (U/L)',
    ALP:'ALP (U/L)',
    ALBUMI:'Albumin (g/dL)',
    TSH:'TSH (micro g/mL)',
    PROCAL:'Procalcitonin- <0.05',
    TROP_T:'Trop T (ng/mL)',
    CKMB:'CKMB (ng/mL)',
    CULT_ISOL:'Cultures isolate- to be typed',
    IMAG:'Imaging',
    CXR:'CXR',
    OTHER_RELA:'Other relevant X ray',
    USG_ABDOMEN:'USG- abdomen and Pelvis',
    ANY_OTHERRELE:'Any other relevant USG',
    RELEV_CT:'Relevant CT',
    TWOD_ECH:'2D ECHO',
    RELEVENT_MRI:'Relevant MRI',
    TREAT:'Treatment',
    NEED_ESCLA:'Need for escalation of antibiotics',
    USE_VASO:'Use of vasopressors',
    NEED_MEDICAL:'Need for Mechanical ventilation',
    NEED_DYLI:'Need for dialysis',
    PROCCED:'Procedural need for source control',
}

    // const isLogdin: any = sessionStorage.getItem("iscustomerLogdin");
    // const issuperAdmin: any = sessionStorage.getItem("issuperAdmin");
    // const userinfo: any = sessionStorage.getItem("userInfo");
    // const userDataList: any = sessionStorage.getItem("userDataList");

    export const isUserAuthenticated: any = () => {
        const isLogdin: any = sessionStorage.getItem("iscustomerLogdin");
        return isLogdin && isLogdin === 'true' ? true : false;
    }

    export const isSuperUser: any = () => {
        const issuperAdmin: any = sessionStorage.getItem("issuperAdmin");
        return issuperAdmin && issuperAdmin === 'true' ? true : false;
    }

    export const getuserInfo = () => {
        const userinfo: any = sessionStorage.getItem("userInfo");
        if(isUserAuthenticated() || isSuperUser() && userinfo) {
            return JSON.parse(userinfo);
        }
        return null;
    }

    export const getuserDataList = () => {
        const userDataList: any = sessionStorage.getItem("userDataList");
        if(isUserAuthenticated() || isSuperUser()) {
            return JSON.parse(userDataList);
        }
        return null;
    }

    export const formatYesNoVal = (val: string) => {
        return val === 'y' ? 'Yes': 'No';
    }