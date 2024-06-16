import React, {useState, useEffect} from 'react';
import { Formik, FormikConfig, FormikHelpers, FormikValues, useFormikContext } from "formik";
import { Box, Button, Grid, Typography } from "@mui/material";
import { initialReportData, validationSchema } from './data';
import InputField from '../InputField';
import DiscreteSlider from '../DiscreteSlider';
import { FIELD_VALUE_LIST, NOR_ABN_LIST, YES_NO_LIST, getuserDataList, getuserInfo } from '../../utils/utils';
import Radiogroup from '../Radiogroup';
import SelectField from '../SelectField';

interface EntryFormData {
    formData: any
}

const EntryForm = (props: EntryFormData) => {
    const {formData} = props;
    const [_initialReportData, setInitialReportData] = useState(initialReportData);
    
    const uList: any = getuserDataList() || {};

    useEffect(() => {
        if(formData) {
            setInitialReportData(formData);
        }
    }, [formData])
    
    const handleFormSubmit = async(values: any) => {
        saveData(values, 'REPORT');
    }

    const handleSaveDraft = (val: any) => {
        saveData(val, 'DRAFT');
    }

    const saveData = (value: any, title: string) => {
        const userInfo: any = getuserInfo();
        const uid = `${title} ANC + ${Math.floor(Math.random() * 10000)} GBSCDFR`;
        const draftdata = {[userInfo.username]: JSON.stringify({...value, uid})}
        sessionStorage.setItem('userDataList', JSON.stringify({...uList, ...draftdata}));
    }

    return (
        <div className="App container">
            <Formik
                initialValues={_initialReportData}
                enableReinitialize={true}
                validationSchema={validationSchema}
                onSubmit={values => {
                    // same shape as initial values
                    handleFormSubmit(values);
                    console.log(values);
                }}
            >
                {({ handleSubmit, handleChange, values, handleReset, status }) => (
                   <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2}}>
                                    qSOFA (score=/{'>'} 2 high risk of sepsis and high mortality)
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="rrate" label={FIELD_VALUE_LIST.RR} min={0} max={100} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="mentation" label={FIELD_VALUE_LIST.AM} min={0} max={100} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="systolicBP" label={FIELD_VALUE_LIST.SBP} min={0} max={100} step={1}/>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2,  mt: 2}}>
                                    NEWS ( score chart is in the attachment)
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="news_rrate" label={FIELD_VALUE_LIST.RR} min={0} max={100} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="news_mentation" label={FIELD_VALUE_LIST.AM} min={0} max={100} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="news_systolicBP" label={FIELD_VALUE_LIST.SBP} min={0} max={90} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="news_prate" label={FIELD_VALUE_LIST.P_RATE} min={0} max={200} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="news_loc" label={FIELD_VALUE_LIST.LE_CON} min={0} max={100} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="news_temprature" label={FIELD_VALUE_LIST.TEM_35} min={0} max={100} step={1}/>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:0, mt: 2}}>
                                    Present illness-Symptoms and signs specific to an infectious source
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="fever" label={{eng: FIELD_VALUE_LIST.FEVER}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="headache" label={{eng: FIELD_VALUE_LIST.HEADCHE}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="altered_sensoriam" label={{eng: FIELD_VALUE_LIST.ALTERED_SEN}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="dyspnoea" label={{eng: FIELD_VALUE_LIST.DYSPONIA}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="cheast_pain" label={{eng: FIELD_VALUE_LIST.CHEST_PAIN}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="cough" label={{eng: FIELD_VALUE_LIST.COUGH}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="productive_sputum" label={{eng: FIELD_VALUE_LIST.PROD_SPUT}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="vomiting" label={{eng: FIELD_VALUE_LIST.VOMATING}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="loose_stools" label={{eng: FIELD_VALUE_LIST.LOOSE_STOOLS}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="pain_abdomen" label={{eng: FIELD_VALUE_LIST.PAIN_ABD}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="local_swelling" label={{eng: FIELD_VALUE_LIST.LOC_SWEL}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="wound_ulcer" label={{eng: FIELD_VALUE_LIST.WOU_ULC}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="dysuria" label={{eng: FIELD_VALUE_LIST.DYSRIA}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="chills" label={{eng: FIELD_VALUE_LIST.CHILLS}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="urgency_to_micturate" label={{eng: FIELD_VALUE_LIST.URG_MEC}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                                <InputField name="others" label={{eng: FIELD_VALUE_LIST.OTHERS}} rows={3} multiline={true} />
                            </Grid>
                            
                        </Grid>

                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:0, mt: 2}}>
                                    History
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="allergies" label={{eng: FIELD_VALUE_LIST.ALERGIES}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="dia_mellitus" label={{eng: FIELD_VALUE_LIST.DIA_MELL}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="hypertension" label={{eng: FIELD_VALUE_LIST.HYPERTENSIN}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="bronchial_asthma" label={{eng: FIELD_VALUE_LIST.BRON_AST}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="copd" label={{eng: FIELD_VALUE_LIST.COPD}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="tuberculosis" label={{eng: FIELD_VALUE_LIST.TUBER_COL}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="ischemic_heart_disease" label={{eng: FIELD_VALUE_LIST.ISCH_HEART}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="chronic_kidney_disease" label={{eng: FIELD_VALUE_LIST. CHOR_KID}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="chronic_liver_disease" label={{eng: FIELD_VALUE_LIST.CHOR_LIVER}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="cancer" label={{eng: FIELD_VALUE_LIST.CANCER}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="cerebrovascular_accident" label={{eng: FIELD_VALUE_LIST.CEREB_ACCED}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="rheumatic_heart_disease" label={{eng: FIELD_VALUE_LIST.RHEU_HEART}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                                <InputField name="history_others" label={{eng: FIELD_VALUE_LIST.OTHERS}} type='textarea' rows={3} multiline={true}/>
                            </Grid>
                            
                        </Grid>

                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:0, mt: 2}}>
                                    Past History
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={5}>
                                <Radiogroup name="prior_surgery" label={{eng: FIELD_VALUE_LIST.PRIO_SURG}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                                <Radiogroup name="rct_hospitalization" label={{eng: FIELD_VALUE_LIST.RECE_HOSPITAl}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                                <Radiogroup name="prolonged_hospitalization" label={{eng: FIELD_VALUE_LIST.PRO_HOSPITALIZATION}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                                <Radiogroup name="previous_intubations" label={{eng: FIELD_VALUE_LIST.PREV_INTBTN}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                                <InputField name="drug_history" label={{eng: FIELD_VALUE_LIST.DRUG_HIS}} type='textarea' rows={3} multiline={true}/>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:0, mt: 2}}>
                                    Habits
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="smoking" label={{eng: FIELD_VALUE_LIST.SMOKING}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="alcohol" label={{eng: FIELD_VALUE_LIST.ALCOHOL}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="recreational_drugs" label={{eng: FIELD_VALUE_LIST.REC_DRUG}} radioList={YES_NO_LIST}/>
                            </Grid>
                        </Grid>

                        {/* // Breathing */}
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                    Breathing 
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="breathing_rr" label={FIELD_VALUE_LIST.BREATHING_RR} min={0} max={60} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="breathing_spo2" label={FIELD_VALUE_LIST.SPO2} min={0} max={100} step={1}/>
                            </Grid>
                        </Grid>

                        
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                    Circulation 
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="peripheries_warm_cold" label={{eng: FIELD_VALUE_LIST.PERI_W_COLD}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="circulation_bp" label={{eng: FIELD_VALUE_LIST.BPRN}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="circulation_bpsys" label={FIELD_VALUE_LIST.BP_SYS} min={40} max={280} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="circulation_bpdyst" label={FIELD_VALUE_LIST.BP_DYST} min={40} max={200} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="circulation_hr" label={FIELD_VALUE_LIST.HR6090} min={0} max={300} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Radiogroup name="circulation_crt" label={{eng: FIELD_VALUE_LIST.CRT2}} radioList={YES_NO_LIST}/>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                    Disability 
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4} sx={{pr: 4}}>
                                <SelectField name="disability_sensorium" label={{eng: FIELD_VALUE_LIST.SENSORIUM}} menuItem={['A', 'V', 'P', 'U']} handleChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="disability_gcs" label={FIELD_VALUE_LIST.GCS} min={3} max={15} step={1}/>
                            </Grid>
                        </Grid>

                        
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                    Pupils  
                                </Typography>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                        Right  
                                    </Typography>
                                    <hr style={{width: '70%'}}/>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={6}>
                                    <DiscreteSlider name="pupils_rsize" label={FIELD_VALUE_LIST.SIZE} min={1} max={5} step={1} width={150}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="pupils_reactive" label={{eng: FIELD_VALUE_LIST.REACTIVE}} radioList={YES_NO_LIST}/>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                        Left  
                                    </Typography>
                                    <hr style={{width: '70%'}}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <DiscreteSlider name="pupils_lsize" label={FIELD_VALUE_LIST.SIZE} min={1} max={5} step={1} width={150}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="pupils_leactive" label={{eng: FIELD_VALUE_LIST.REACTIVE}} radioList={YES_NO_LIST}/>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                        
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                    Exposure  
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={6} sx={{pr: 3}}>
                                <InputField name="local_examination" label={{eng: FIELD_VALUE_LIST.LOCAL_EXA}} rows={3} multiline={true} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="exposure_temp" label={FIELD_VALUE_LIST.TEMP_DEG} min={95.0} max={105.0} step={0.1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} sx={{mt:2}}>
                                <Radiogroup name="ecg" label={{eng: FIELD_VALUE_LIST.ECG}} radioList={NOR_ABN_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{mt:2}}>
                                <DiscreteSlider name="cbg" label={FIELD_VALUE_LIST.CBG} min={0} max={500} step={0.1}/>
                            </Grid>
                        </Grid>

                        {/* // NEW FORM POCUS */}
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mt: 2}}>
                                    POCUS  
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                    a. Lungs  
                                </Typography>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                        Right  
                                    </Typography>
                                    <hr style={{width: '70%'}}/>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="lung_rsliding" label={{eng: FIELD_VALUE_LIST.LUNG_SLID}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="lung_rmultipleBlines" label={{eng: FIELD_VALUE_LIST.MULTIPLE_BLINE}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="lung_rragged_pleura" label={{eng: FIELD_VALUE_LIST.RAGGED_PLE}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="lung_reffusion " label={{eng: FIELD_VALUE_LIST.EFFUSION}} radioList={YES_NO_LIST}/>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                        Left  
                                    </Typography>
                                    <hr style={{width: '70%'}}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="lung_lsliding" label={{eng: FIELD_VALUE_LIST.LUNG_SLID}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="lung_lmultipleBlines" label={{eng: FIELD_VALUE_LIST.MULTIPLE_BLINE}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="lung_lragged_pleura" label={{eng: FIELD_VALUE_LIST.RAGGED_PLE}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="lung_leffusion " label={{eng: FIELD_VALUE_LIST.EFFUSION}} radioList={YES_NO_LIST}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                    b. Cardia  
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <DiscreteSlider name="cardia_ef" label={FIELD_VALUE_LIST.EF} min={0} max={100} step={1} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Radiogroup name="cardia_ivc" label={{eng: FIELD_VALUE_LIST.IVC}} radioList={YES_NO_LIST}/>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                    c. FAST 
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Radiogroup name="fast_subxiphoid" label={{eng: FIELD_VALUE_LIST.SUB_X}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Radiogroup name="fast_rgtupr_quadrant" label={{eng: FIELD_VALUE_LIST.RIGHR_UPPER}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Radiogroup name="fast_lftupr_quadrant" label={{eng: FIELD_VALUE_LIST.LEFT_UPPER}} radioList={YES_NO_LIST}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Radiogroup name="fast_suprapubic" label={{eng: FIELD_VALUE_LIST.SUPRA}} radioList={YES_NO_LIST}/>
                            </Grid>
                        </Grid>

                        {/* // NEW FORM ABG */}
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                    ABG 
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="abg_ph" label={FIELD_VALUE_LIST.PH} min={6.50} max={7.80} step={0.01}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="abg_pco2" label={FIELD_VALUE_LIST.PCO} min={5} max={130} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="abg_po2" label={FIELD_VALUE_LIST.PO2} min={30} max={500} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="abg_hco3" label={FIELD_VALUE_LIST.HCO3} min={1} max={50} step={1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="abg_lactate" label={FIELD_VALUE_LIST.LACTATE} min={0.5} max={30} step={0.1}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="abg_basedefict" label={FIELD_VALUE_LIST.BASE_DEF} min={-2} max={2} step={1}/>
                            </Grid>
                        </Grid>

                        {/* // NEW FORM Pain Score */}
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                Pain score 
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <DiscreteSlider name="pain_score" label={FIELD_VALUE_LIST.PAIN_SCORE} min={0} max={10} step={1}/>
                            </Grid>
                            
                        </Grid>

                        {/* // NEW FORM Systemic examination */}
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mt: 2}}>
                                    Systemic examination  
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                    RS
                                </Typography>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                        Right  
                                    </Typography>
                                    <hr style={{width: '70%'}}/>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="rs_right_decreased_air_entry" label={{eng: FIELD_VALUE_LIST.DECR_AIR}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="rs_right_rhonchi" label={{eng: FIELD_VALUE_LIST.RHON}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="rs_right_crepts" label={{eng: FIELD_VALUE_LIST.CREP}} radioList={YES_NO_LIST}/>
                                </Grid>
                            </Grid>
                            <Grid container item xs={6}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                        Left  
                                    </Typography>
                                    <hr style={{width: '70%'}}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="ts_left_decreased_air_entry" label={{eng: FIELD_VALUE_LIST.DECR_AIR}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="rs_left_rhonchi" label={{eng: FIELD_VALUE_LIST.RHON}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Radiogroup name="rs_left_crepts" label={{eng: FIELD_VALUE_LIST.CREP}} radioList={YES_NO_LIST}/>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                        Per Abdomen 
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Radiogroup name="guarding" label={{eng: FIELD_VALUE_LIST.GUAR}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Radiogroup name="rigidity" label={{eng: FIELD_VALUE_LIST.RIGI}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="bowel_sounds" label={FIELD_VALUE_LIST.BOW_SOU} min={40} max={280} step={1}/>
                                </Grid>
                            </Grid>
                            {/* CNS */}
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                        CNS
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Radiogroup name="neck_rigidity" label={{eng: FIELD_VALUE_LIST.NECK_RIG}} radioList={YES_NO_LIST}/>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:2,  mt: 2}}>
                                        Investigations
                                    </Typography>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_hb" label={FIELD_VALUE_LIST.HB} min={1} max={20} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_wbc_count" label={FIELD_VALUE_LIST.WBC} min={50} max={100000} step={10}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Radiogroup name="invest_normal_wbc_count" label={{eng: FIELD_VALUE_LIST.NOR_WBC}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_platelets" label={FIELD_VALUE_LIST.PLA} min={500} max={500000} step={100}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_grbs" label={FIELD_VALUE_LIST.GRBS} min={0} max={1000} step={10}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_crp" label={FIELD_VALUE_LIST.CRP} min={0} max={300} step={1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_sodium" label={FIELD_VALUE_LIST.SODIUM} min={95} max={170} step={1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_potassium" label={FIELD_VALUE_LIST.POTAS} min={1} max={9} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_chloride" label={FIELD_VALUE_LIST.CHLO} min={90} max={110} step={1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_urea" label={FIELD_VALUE_LIST.UREA} min={10} max={350} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_creatinine" label={FIELD_VALUE_LIST.CREAT} min={0.5} max={20} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_pt" label={FIELD_VALUE_LIST.PT_S} min={8} max={50} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_aptt" label={FIELD_VALUE_LIST.APTT} min={15} max={100} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_inr" label={FIELD_VALUE_LIST.INR} min={0.0} max={7} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_total_bilirubin" label={FIELD_VALUE_LIST.TOTAL_BILU} min={0} max={50} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_direct_bilirubin" label={FIELD_VALUE_LIST.DIRE_BILI} min={0} max={50} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_indirect_bilirubin" label={FIELD_VALUE_LIST.INDIRECT_BIL} min={0} max={30} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_SGOT" label={FIELD_VALUE_LIST.SGOT} min={0} max={5000} step={1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_SGPT" label={FIELD_VALUE_LIST.SGPT} min={0} max={5000} step={1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_ALP" label={FIELD_VALUE_LIST.ALP} min={20} max={500} step={1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_albumin" label={FIELD_VALUE_LIST.ALBUMI} min={1} max={6} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_TSH" label={FIELD_VALUE_LIST.TSH} min={0} max={100} step={0.1}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_procalcitonin" label={FIELD_VALUE_LIST.PROCAL} min={0} max={200} step={0.01}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_trop" label={FIELD_VALUE_LIST.TROP_T} min={0} max={20} step={0.01}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <DiscreteSlider name="invest_CKMB" label={FIELD_VALUE_LIST.CKMB} min={0} max={20} step={0.01}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                    <InputField name="invest_cultures_isolate" label={{eng: FIELD_VALUE_LIST.CULT_ISOL}} rows={3} multiline={true} />
                                </Grid>
                            </Grid>
                            {/* Imaging */}
                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:2,  mt: 2}}>
                                        Imaging
                                    </Typography>
                                </Grid>
                                
                                <Grid item xs={12} sm={12} md={6}>
                                    <InputField name="imaging_cxr" label={{eng: FIELD_VALUE_LIST.CXR}} rows={3} multiline={true} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <InputField name="imaging_oxray" label={{eng: FIELD_VALUE_LIST.OTHER_RELA}} rows={3} multiline={true} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <InputField name="imaging_usg" label={{eng: FIELD_VALUE_LIST.USG_ABDOMEN}} rows={3} multiline={true} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <InputField name="imaging_orusg" label={{eng: FIELD_VALUE_LIST.ANY_OTHERRELE}} rows={3} multiline={true} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <InputField name="imaging_relevantct" label={{eng: FIELD_VALUE_LIST.RELEV_CT}} rows={3} multiline={true} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <InputField name="imaging_2decho" label={{eng: FIELD_VALUE_LIST.TWOD_ECH}} rows={3} multiline={true} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <InputField name="imaging_relevant_MRI" label={{eng: FIELD_VALUE_LIST.RELEVENT_MRI}} rows={3} multiline={true} />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:0, mt: 2}}>
                                        Treatment
                                    </Typography>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={4}>
                                    <Radiogroup name="need_escalation_antibiotics" label={{eng: FIELD_VALUE_LIST.NEED_ESCLA}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Radiogroup name="use_vasopressors" label={{eng: FIELD_VALUE_LIST.USE_VASO}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Radiogroup name="need_mechanical_ventilation" label={{eng: FIELD_VALUE_LIST.NEED_MEDICAL}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Radiogroup name="need_dialysis" label={{eng: FIELD_VALUE_LIST.NEED_DYLI}} radioList={YES_NO_LIST}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Radiogroup name="need_source_control" label={{eng: FIELD_VALUE_LIST.PROCCED}} radioList={YES_NO_LIST}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div className="divider my-3"/>
                    <Box sx={{ flex: '1 1 auto', justifyContent: 'end', textAlign: 'end', pt: 2 }}>
                        <Button type="submit" variant="contained" sx={{ mt: 2, mx: 2 }}>
                            Preview
                        </Button>
                        <Button type="button" variant="contained" sx={{ mt: 2, mx: 2 }} onClick={() => handleSaveDraft(values)}>
                            Save as Draft
                        </Button>
                    </Box>
                    {/* <p>{JSON.stringify(values, null, 2)}</p> */}
                   </form>
                )}
            </Formik>
        </div>
    )
}

export default EntryForm;