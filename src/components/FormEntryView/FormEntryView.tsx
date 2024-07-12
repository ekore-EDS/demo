import React, { useEffect, useState } from 'react';
import { Grid, Box, Button, Typography } from "@mui/material";
import "./FormEntryView.scss";
import FieldValue from '../FieldValue';
import { FIELD_VALUE_LIST, formatYesNoVal, getuserInfo } from '../../utils/utils';
import { setDoc, doc } from 'firebase/firestore';
import { useAppStateContext } from '../../state/provider';
import { setFormData } from '../../state/ed/actions';
import { db } from '../..';
import AlertMessage from '../AlertMessage';

interface FormEntryViewData {
    formData: any
}
function FormEntryView(props: FormEntryViewData) {
    const { state, dispatch } = useAppStateContext();
    const [isSubmitting, setIsSubmitted] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    const [alertConfig, setAlertConfig] = useState<any>({open: false, severity: '', variant: '', message: ''});
    const {formData} = props;

    const handleSubmit = () => {
        writeDatatoFirestore(formData, 'REPORT');
    }

    const handleApproved = () => {
        writeDatatoFirestore(formData, 'APPROVE');
    }

    useEffect(() => {
        if(formData?.uid) {
            setIsSubmitted(false);
        }
    }, [formData?.uid]);

    const writeDatatoFirestore = async(value: any, title: string) => {
        try {
            // const userInfo: any = getuserInfo();
            const uname:string = state?.ED?.userDetails?.activeUser ? state?.ED?.userDetails?.activeUser : state?.ED?.userDetails?.currentUser;
            // const uid = `${title}-CASEDSMYS-${Math.floor(Math.random() * 10000)}`;
            if(state.ED?.docId) {
                let uid = value?.uid?.split('-');
                uid[0] = 'REPORT';
                uid = uid.join('-');
                let req: any = {...value, uid, isSubmitted: true, submitted_date: new Date().toLocaleString()};
                if(title === 'APPROVE') {
                    req = {...value, isApproved: true, approved_date: new Date().toLocaleString(), username: uname, approver: state?.ED?.userDetails?.currentUser}
                }
                await setDoc(doc(db, uname, state.ED?.docId), req);
                if(title === 'APPROVE') {
                    setIsApproved(true);
                    await setDoc(doc(db, 'approved_records', state.ED?.docId), req);
                    setAlertConfig({isOpen: true, severity: 'success', message: 'Successfully Approved !!'});
                } else {
                    setIsSubmitted(true)
                    setAlertConfig({isOpen: true, severity: 'success', message: 'Successfully Updated !!'});
                }
                dispatch(setFormData({}));
            } 
        } catch (e) {
            setIsSubmitted(false);
            setAlertConfig({isOpen: true, severity: 'error', message: 'Something went wrong, Please try again !!'});
            console.error("Error adding document: ", e);
        }
    }

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAlertConfig({isOpen: false});
    };

    return (
        <>
        <AlertMessage isOpen={alertConfig.isOpen} handleClose={handleClose} severity={alertConfig.severity} message={alertConfig.message}/>
        <div className="App container-fluid">
            {formData?.uid ? <div className='shadow px-5 py-3 my-3 '>
                    <Button type="button" variant="contained" sx={{ mt: 3, mb: 2, mx: 3, float: 'right' }} onClick={() => window?.print()} className='noPrint'>
                        Print
                    </Button>
                   <Grid container spacing={2}>
                        <Grid container item xs={12} className='grid-section'>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2}}>
                                    qSOFA (score=/{'>'} 2-----high risk of sepsis and high mortality)
                                </Typography>
                            </Grid>
                            <Grid item  sx={{my: '0rem', mx: '0.5rem'}} className='grid-content'>
                                <FieldValue value={formData?.rrate} name="rrate" label={FIELD_VALUE_LIST.RR}/>
                                {/* <FieldValue name="dimension" label={{eng: "Site Dimention", kan: 'ಸೈಟ್ ಆಯಾಮಗಳು'}} radioList={dimensionList}/> */}
                            </Grid>
                            <Grid item  sx={{paddingLeft: '0.5rem'}} className='responsive-css grid-content'>
                                <FieldValue name="mentation" label={FIELD_VALUE_LIST.AM} placeholder="Enter Booth Name" value={formData?.mentation}/>
                            </Grid>
                            <Grid item  sx={{paddingLeft: '0.5rem'}} className='grid-content-small responsive-css'>
                                <FieldValue value={formData?.systolicBP} name="systolicBP" label={FIELD_VALUE_LIST.SBP} />
                            </Grid>
                            {/* <Grid item  sx={{paddingLeft: '0.5rem'}} className='responsive-css grid-content-small specific'>
                                <FieldValue value={formData?.totalVotersCount} type='number' name="totalVotes" label={{eng: "Total Voters Count:", kan: 'ಮತಗಟ್ಟೆಯ ಒಟ್ಟು ಮತದಾರರ ಸಂಖ್ಯೆ'}} placeholder="Enter Total Voters Count" />
                            </Grid> */}
            
                        </Grid>
                        <Grid container item xs={12} className='grid-section'>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2}}>
                                    NEWS ( score chart is in the attachment)
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.news_rrate || 0}  name="news_rrate" label={FIELD_VALUE_LIST.RR} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.news_mentation || 0} name="news_mentation" label={FIELD_VALUE_LIST.AM} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.news_systolicBP || 0} name="news_systolicBP" label={FIELD_VALUE_LIST.SBP} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.news_prate || 0} name="news_prate" label={FIELD_VALUE_LIST.P_RATE} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.news_loc || 0 } name="news_loc" label={FIELD_VALUE_LIST.LE_CON} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.news_temprature || 0} name="news_temprature" label={FIELD_VALUE_LIST.TEM_35} />
                            </Grid>
                        </Grid>
                        
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2}}>
                                    Present illness-Symptoms and signs specific to an infectious source
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.fever === 'y' ? 'Yes' : 'No'} name="fever" label={{eng: FIELD_VALUE_LIST.FEVER}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.headache === 'y' ? 'Yes' : 'No'} name="headache" label={{eng: FIELD_VALUE_LIST.HEADCHE}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.altered_sensoriam === 'y' ? 'Yes' : 'No'} name="altered_sensoriam" label={{eng: FIELD_VALUE_LIST.ALTERED_SEN}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.dyspnoea === 'y' ? 'Yes' : 'No'} name="dyspnoea" label={{eng: FIELD_VALUE_LIST.DYSPONIA}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.cheast_pain === 'y' ? 'Yes' : 'No'} name="cheast_pain" label={{eng: FIELD_VALUE_LIST.CHEST_PAIN}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.cough === 'y' ? 'Yes' : 'No'} name="cough" label={{eng: FIELD_VALUE_LIST.COUGH}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.productive_sputum === 'y' ? 'Yes' : 'No'} name="productive_sputum" label={{eng: FIELD_VALUE_LIST.PROD_SPUT}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.vomiting === 'y' ? 'Yes' : 'No'} name="vomiting" label={{eng: FIELD_VALUE_LIST.VOMATING}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.loose_stools === 'y' ? 'Yes' : 'No'} name="loose_stools" label={{eng: FIELD_VALUE_LIST.LOOSE_STOOLS}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.pain_abdomen === 'y' ? 'Yes' : 'No'} name="pain_abdomen" label={{eng: FIELD_VALUE_LIST.PAIN_ABD}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.local_swelling === 'y' ? 'Yes' : 'No'} name="local_swelling" label={{eng: FIELD_VALUE_LIST.LOC_SWEL}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.wound_ulcer === 'y' ? 'Yes' : 'No'} name="wound_ulcer" label={{eng: FIELD_VALUE_LIST.WOU_ULC}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.dysuria === 'y' ? 'Yes' : 'No'} name="dysuria" label={{eng: FIELD_VALUE_LIST.DYSRIA}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.chills === 'y' ? 'Yes' : 'No'} name="chills" label={{eng: FIELD_VALUE_LIST.CHILLS}} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.urgency_to_micturate === 'y' ? 'Yes' : 'No'} name="urgency_to_micturate" label={{eng: FIELD_VALUE_LIST.URG_MEC}} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} sx={{paddingLeft: '0.5rem'}} className='responsive-css'>
                                <FieldValue value={formData?.others || ''} name="others" label={{eng: FIELD_VALUE_LIST.OTHERS}} />
                            </Grid>
                        </Grid>

                        {/* History Section View */}
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:0, mt: 2}}>
                                    History
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="allergies" label={{eng: FIELD_VALUE_LIST.ALERGIES}} value={formData?.allergies ? formatYesNoVal(formData?.allergies) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="dia_mellitus" label={{eng: FIELD_VALUE_LIST.DIA_MELL}} value={formData?.dia_mellitus ? formatYesNoVal(formData?.dia_mellitus) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="hypertension" label={{eng: FIELD_VALUE_LIST.HYPERTENSIN}} value={formData?.hypertension ? formatYesNoVal(formData?.hypertension) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="bronchial_asthma" label={{eng: FIELD_VALUE_LIST.BRON_AST}} value={formData?.bronchial_asthma ? formatYesNoVal(formData?.bronchial_asthma) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="copd" label={{eng: FIELD_VALUE_LIST.COPD}} value={formData?.copd ? formatYesNoVal(formData?.copd) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="tuberculosis" label={{eng: FIELD_VALUE_LIST.TUBER_COL}} value={formData?.tuberculosis ? formatYesNoVal(formData?.tuberculosis) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="ischemic_heart_disease" label={{eng: FIELD_VALUE_LIST.ISCH_HEART}} value={formData?.ischemic_heart_disease ? formatYesNoVal(formData?.ischemic_heart_disease) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="chronic_kidney_disease" label={{eng: FIELD_VALUE_LIST. CHOR_KID}} value={formData?.chronic_kidney_disease ? formatYesNoVal(formData?.chronic_kidney_disease) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="chronic_liver_disease" label={{eng: FIELD_VALUE_LIST.CHOR_LIVER}} value={formData?.chronic_liver_disease ? formatYesNoVal(formData?.chronic_liver_disease) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="cancer" label={{eng: FIELD_VALUE_LIST.CANCER}} value={formData?.cancer ? formatYesNoVal(formData?.cancer) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="cerebrovascular_accident" label={{eng: FIELD_VALUE_LIST.CEREB_ACCED}} value={formData?.cerebrovascular_accident ? formatYesNoVal(formData?.cerebrovascular_accident) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="rheumatic_heart_disease" label={{eng: FIELD_VALUE_LIST.RHEU_HEART}} value={formData?.rheumatic_heart_disease ? formatYesNoVal(formData?.rheumatic_heart_disease) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                                <FieldValue name="history_others" label={{eng: FIELD_VALUE_LIST.OTHERS}} value={formData?.history_others ? formData?.history_others : '-'}/>
                            </Grid>
                            
                        </Grid>

                        {/* Past History Section View */}
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:0, mt: 2}}>
                                    Past History
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={5}>
                                <FieldValue name="prior_surgery" label={{eng: FIELD_VALUE_LIST.PRIO_SURG}} value={formData?.prior_surgery ? formatYesNoVal(formData?.prior_surgery) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                                <FieldValue name="rct_hospitalization" label={{eng: FIELD_VALUE_LIST.RECE_HOSPITAl}} value={formData?.rct_hospitalization ? formatYesNoVal(formData?.rct_hospitalization) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                                <FieldValue name="prolonged_hospitalization" label={{eng: FIELD_VALUE_LIST.PRO_HOSPITALIZATION}} value={formData?.prolonged_hospitalization ? formatYesNoVal(formData?.prolonged_hospitalization) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={5}>
                                <FieldValue name="previous_intubations" label={{eng: FIELD_VALUE_LIST.PREV_INTBTN}} value={formData?.previous_intubations ? formatYesNoVal(formData?.previous_intubations) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={12} md={10}>
                                <FieldValue name="drug_history" label={{eng: FIELD_VALUE_LIST.DRUG_HIS}} value={formData?.drug_history ? formData?.drug_history : '-'}/>
                            </Grid>
                        </Grid>

                        {/* Habits Section View */}
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:0, mt: 2}}>
                                    Habits
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="smoking" label={{eng: FIELD_VALUE_LIST.SMOKING}} value={formData?.smoking ? formatYesNoVal(formData?.smoking) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="alcohol" label={{eng: FIELD_VALUE_LIST.ALCOHOL}} value={formData?.alcohol ? formatYesNoVal(formData?.alcohol) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="recreational_drugs" label={{eng: FIELD_VALUE_LIST.REC_DRUG}} value={formData?.recreational_drugs ? formatYesNoVal(formData?.recreational_drugs) : '-'}/>
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
                                <FieldValue name="breathing_rr" label={FIELD_VALUE_LIST.BREATHING_RR} value={formData?.breathing_rr ? formData?.breathing_rr : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="breathing_spo2" label={FIELD_VALUE_LIST.SPO2} value={formData?.breathing_spo2 ? formData?.breathing_spo2 : '-'}/>
                            </Grid>
                        </Grid>

                        {/* // Circulation */}
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                    Circulation 
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="peripheries_warm_cold" label={{eng: FIELD_VALUE_LIST.PERI_W_COLD}} value={formData?.peripheries_warm_cold ? formatYesNoVal(formData?.peripheries_warm_cold) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="circulation_bp" label={{eng: FIELD_VALUE_LIST.BPRN}} value={formData?.circulation_bp ? formatYesNoVal(formData?.circulation_bp) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="circulation_bpsys" label={FIELD_VALUE_LIST.BP_SYS} value={formData?.circulation_bpsys ? (formData?.circulation_bpsys) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="circulation_bpdyst" label={FIELD_VALUE_LIST.BP_DYST} value={formData?.circulation_bpdyst ? (formData?.circulation_bpdyst) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="circulation_hr" label={FIELD_VALUE_LIST.HR6090} value={formData?.circulation_hr ? (formData?.circulation_hr) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="circulation_crt" label={{eng: FIELD_VALUE_LIST.CRT2}} value={formData?.circulation_crt ? formatYesNoVal(formData?.circulation_crt) : '-'}/>
                            </Grid>
                        </Grid>

                        {/* // Disability */}
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                    Disability 
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={4} sx={{pr: 4}}>
                                <FieldValue name="disability_sensorium" label={{eng: FIELD_VALUE_LIST.SENSORIUM}} value={formData?.disability_sensorium ? (formData?.disability_sensorium) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="disability_gcs" label={FIELD_VALUE_LIST.GCS} value={formData?.disability_gcs ? (formData?.disability_gcs) : '-'}/>
                            </Grid>
                        </Grid>

                        {/* // Pupils */}
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
                                    <FieldValue name="pupils_rsize" label={FIELD_VALUE_LIST.SIZE} value={formData?.pupils_rsize ? (formData?.pupils_rsize) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="pupils_reactive" label={{eng: FIELD_VALUE_LIST.REACTIVE}} value={formData?.pupils_reactive ? formatYesNoVal(formData?.pupils_reactive) : '-'}/>
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
                                    <FieldValue name="pupils_lsize" label={FIELD_VALUE_LIST.SIZE} value={formData?.pupils_lsize ? (formData?.pupils_lsize) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="pupils_leactive" label={{eng: FIELD_VALUE_LIST.REACTIVE}} value={formData?.pupils_leactive ? formatYesNoVal(formData?.pupils_leactive) : '-'}/>
                                </Grid>
                            </Grid>
                            
                        </Grid>

                        {/* // Exposure */}
                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                    Exposure  
                                </Typography>
                            </Grid>
                            
                            <Grid item xs={12} sm={6} md={6} sx={{pr: 3}}>
                                <FieldValue name="local_examination" label={{eng: FIELD_VALUE_LIST.LOCAL_EXA}} value={formData?.local_examination ? (formData?.local_examination) : '-'} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="exposure_temp" label={FIELD_VALUE_LIST.TEMP_DEG} value={formData?.exposure_temp ? (formData?.exposure_temp) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} sx={{mt:2}}>
                                <FieldValue name="ecg" label={{eng: FIELD_VALUE_LIST.ECG}} value={formData?.ecg ? formatYesNoVal(formData?.ecg) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{mt:2}}>
                                <FieldValue name="cbg" label={FIELD_VALUE_LIST.CBG} value={formData?.cbg ? (formData?.cbg) : '-'}/>
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
                                    <FieldValue name="lung_rsliding" label={{eng: FIELD_VALUE_LIST.LUNG_SLID}} value={formData?.lung_rsliding ? formatYesNoVal(formData?.lung_rsliding) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="lung_rmultipleBlines" label={{eng: FIELD_VALUE_LIST.MULTIPLE_BLINE}} value={formData?.lung_rmultipleBlines ? formatYesNoVal(formData?.lung_rmultipleBlines) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="lung_rragged_pleura" label={{eng: FIELD_VALUE_LIST.RAGGED_PLE}} value={formData?.lung_rragged_pleura ? formatYesNoVal(formData?.lung_rragged_pleura) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="lung_reffusion" label={{eng: FIELD_VALUE_LIST.EFFUSION}} value={formData?.lung_reffusion ? formatYesNoVal(formData?.lung_reffusion) : '-'}/>
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
                                    <FieldValue name="lung_lsliding" label={{eng: FIELD_VALUE_LIST.LUNG_SLID}} value={formData?.lung_lsliding ? formatYesNoVal(formData?.lung_lsliding) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="lung_lmultipleBlines" label={{eng: FIELD_VALUE_LIST.MULTIPLE_BLINE}} value={formData?.lung_lmultipleBlines ? formatYesNoVal(formData?.lung_lmultipleBlines) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="lung_lragged_pleura" label={{eng: FIELD_VALUE_LIST.RAGGED_PLE}} value={formData?.lung_lragged_pleura ? formatYesNoVal(formData?.lung_lragged_pleura) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="lung_leffusion" label={{eng: FIELD_VALUE_LIST.EFFUSION}} value={formData?.lung_leffusion ? formatYesNoVal(formData?.lung_leffusion) : '-'}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                    b. Cardia  
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FieldValue name="cardia_ef" label={FIELD_VALUE_LIST.EF} value={formData?.cardia_ef ? (formData?.cardia_ef) : '-'} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FieldValue name="cardia_ivc" label={{eng: FIELD_VALUE_LIST.IVC}} value={formData?.cardia_ivc ? formatYesNoVal(formData?.cardia_ivc) : '-'}/>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:1, mt: 1, fontSize: '15px'}}>
                                    c. FAST 
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FieldValue name="fast_subxiphoid" label={{eng: FIELD_VALUE_LIST.SUB_X}} value={formData?.fast_subxiphoid ? formatYesNoVal(formData?.fast_subxiphoid) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FieldValue name="fast_rgtupr_quadrant" label={{eng: FIELD_VALUE_LIST.RIGHR_UPPER}} value={formData?.fast_rgtupr_quadrant ? formatYesNoVal(formData?.fast_rgtupr_quadrant) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FieldValue name="fast_lftupr_quadrant" label={{eng: FIELD_VALUE_LIST.LEFT_UPPER}} value={formData?.fast_lftupr_quadrant ? formatYesNoVal(formData?.fast_lftupr_quadrant) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <FieldValue name="fast_suprapubic" label={{eng: FIELD_VALUE_LIST.SUPRA}} value={formData?.fast_suprapubic ? formatYesNoVal(formData?.fast_suprapubic) : '-'}/>
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
                                <FieldValue name="abg_ph" label={FIELD_VALUE_LIST.PH} value={formData?.abg_ph ? (formData?.abg_ph) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="abg_pco2" label={FIELD_VALUE_LIST.PCO} value={formData?.abg_pco2 ? (formData?.abg_pco2) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="abg_po2" label={FIELD_VALUE_LIST.PO2} value={formData?.abg_po2 ? (formData?.abg_po2) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="abg_hco3" label={FIELD_VALUE_LIST.HCO3} value={formData?.abg_hco3 ? (formData?.abg_hco3) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="abg_lactate" label={FIELD_VALUE_LIST.LACTATE} value={formData?.abg_lactate ? (formData?.abg_lactate) : '-'}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <FieldValue name="abg_basedefict" label={FIELD_VALUE_LIST.BASE_DEF} value={formData?.abg_basedefict ? (formData?.abg_basedefict) : '-'}/>
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
                                <FieldValue name="pain_score" label={FIELD_VALUE_LIST.PAIN_SCORE} value={formData?.pain_score ? (formData?.pain_score) : '-'}/>
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
                                    <FieldValue name="rs_right_decreased_air_entry" label={{eng: FIELD_VALUE_LIST.DECR_AIR}} value={formData?.rs_right_decreased_air_entry ? formatYesNoVal(formData?.rs_right_decreased_air_entry) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="rs_right_rhonchi" label={{eng: FIELD_VALUE_LIST.RHON}} value={formData?.rs_right_rhonchi ? formatYesNoVal(formData?.rs_right_rhonchi) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="rs_right_crepts" label={{eng: FIELD_VALUE_LIST.CREP}} value={formData?.rs_right_crepts ? formatYesNoVal(formData?.rs_right_crepts) : '-'}/>
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
                                    <FieldValue name="ts_left_decreased_air_entry" label={{eng: FIELD_VALUE_LIST.DECR_AIR}} value={formData?.ts_left_decreased_air_entry ? formatYesNoVal(formData?.ts_left_decreased_air_entry) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="rs_left_rhonchi" label={{eng: FIELD_VALUE_LIST.RHON}} value={formData?.rs_left_rhonchi ? formatYesNoVal(formData?.rs_left_rhonchi) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FieldValue name="rs_left_crepts" label={{eng: FIELD_VALUE_LIST.CREP}} value={formData?.rs_left_crepts ? formatYesNoVal(formData?.rs_left_crepts) : '-'}/>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:2, mt: 2}}>
                                        Per Abdomen 
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="guarding" label={{eng: FIELD_VALUE_LIST.GUAR}} value={formData?.guarding ? formatYesNoVal(formData?.guarding) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="rigidity" label={{eng: FIELD_VALUE_LIST.RIGI}} value={formData?.rigidity ? formatYesNoVal(formData?.rigidity) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="bowel_sounds" label={FIELD_VALUE_LIST.BOW_SOU} value={formData?.bowel_sounds ? (formData?.bowel_sounds) : '-'}/>
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
                                    <FieldValue name="neck_rigidity" label={{eng: FIELD_VALUE_LIST.NECK_RIG}} value={formData?.neck_rigidity ? formatYesNoVal(formData?.neck_rigidity) : '-'}/>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:2,  mt: 2}}>
                                        Investigations
                                    </Typography>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_hb" label={FIELD_VALUE_LIST.HB} value={formData?.invest_hb ? (formData?.invest_hb) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_wbc_count" label={FIELD_VALUE_LIST.WBC} value={formData?.invest_wbc_count ? (formData?.invest_wbc_count) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_normal_wbc_count" label={{eng: FIELD_VALUE_LIST.NOR_WBC}} value={formData?.invest_normal_wbc_count ? formatYesNoVal(formData?.invest_normal_wbc_count) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_platelets" label={FIELD_VALUE_LIST.PLA} value={formData?.invest_platelets ? (formData?.invest_platelets) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_grbs" label={FIELD_VALUE_LIST.GRBS} value={formData?.invest_grbs ? (formData?.invest_grbs) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_crp" label={FIELD_VALUE_LIST.CRP} value={formData?.invest_crp ? (formData?.invest_crp) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_sodium" label={FIELD_VALUE_LIST.SODIUM} value={formData?.invest_sodium ? (formData?.invest_sodium) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_potassium" label={FIELD_VALUE_LIST.POTAS} value={formData?.invest_potassium ? (formData?.invest_potassium) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_chloride" label={FIELD_VALUE_LIST.CHLO} value={formData?.invest_chloride ? (formData?.invest_chloride) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_urea" label={FIELD_VALUE_LIST.UREA} value={formData?.invest_urea ? (formData?.invest_urea) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_creatinine" label={FIELD_VALUE_LIST.CREAT} value={formData?.invest_creatinine ? (formData?.invest_creatinine) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_pt" label={FIELD_VALUE_LIST.PT_S} value={formData?.invest_pt ? (formData?.invest_pt) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_aptt" label={FIELD_VALUE_LIST.APTT} value={formData?.invest_aptt ? (formData?.invest_aptt) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_inr" label={FIELD_VALUE_LIST.INR} value={formData?.invest_inr ? (formData?.invest_inr) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_total_bilirubin" label={FIELD_VALUE_LIST.TOTAL_BILU} value={formData?.invest_total_bilirubin ? (formData?.invest_total_bilirubin) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_direct_bilirubin" label={FIELD_VALUE_LIST.DIRE_BILI} value={formData?.invest_direct_bilirubin ? (formData?.invest_direct_bilirubin) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_indirect_bilirubin" label={FIELD_VALUE_LIST.INDIRECT_BIL} value={formData?.invest_indirect_bilirubin ? (formData?.invest_indirect_bilirubin) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_SGOT" label={FIELD_VALUE_LIST.SGOT} value={formData?.invest_SGOT ? (formData?.invest_SGOT) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_SGPT" label={FIELD_VALUE_LIST.SGPT} value={formData?.invest_SGPT ? (formData?.invest_SGPT) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_ALP" label={FIELD_VALUE_LIST.ALP} value={formData?.invest_ALP ? (formData?.invest_ALP) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_albumin" label={FIELD_VALUE_LIST.ALBUMI} value={formData?.invest_albumin ? (formData?.invest_albumin) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_TSH" label={FIELD_VALUE_LIST.TSH} value={formData?.invest_TSH ? (formData?.invest_TSH) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_procalcitonin" label={FIELD_VALUE_LIST.PROCAL} value={formData?.invest_procalcitonin ? (formData?.invest_procalcitonin) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_trop" label={FIELD_VALUE_LIST.TROP_T} value={formData?.invest_trop ? (formData?.invest_trop) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="invest_CKMB" label={FIELD_VALUE_LIST.CKMB} value={formData?.invest_CKMB ? (formData?.invest_CKMB) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                    <FieldValue name="invest_cultures_isolate" label={{eng: FIELD_VALUE_LIST.CULT_ISOL}} value={formData?.invest_cultures_isolate ? (formData?.invest_cultures_isolate) : '-'} />
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
                                    <FieldValue name="imaging_cxr" label={{eng: FIELD_VALUE_LIST.CXR}} value={formData?.imaging_cxr ? (formData?.imaging_cxr) : '-'} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <FieldValue name="imaging_oxray" label={{eng: FIELD_VALUE_LIST.OTHER_RELA}} value={formData?.imaging_oxray ? (formData?.imaging_oxray) : '-'} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <FieldValue name="imaging_usg" label={{eng: FIELD_VALUE_LIST.USG_ABDOMEN}} value={formData?.imaging_usg ? (formData?.imaging_usg) : '-'} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <FieldValue name="imaging_orusg" label={{eng: FIELD_VALUE_LIST.ANY_OTHERRELE}} value={formData?.imaging_orusg ? (formData?.imaging_orusg) : '-'} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <FieldValue name="imaging_relevantct" label={{eng: FIELD_VALUE_LIST.RELEV_CT}} value={formData?.imaging_relevantct ? (formData?.imaging_relevantct) : '-'} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <FieldValue name="imaging_2decho" label={{eng: FIELD_VALUE_LIST.TWOD_ECH}} value={formData?.imaging_2decho ? (formData?.imaging_2decho) : '-'} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <FieldValue name="imaging_relevant_MRI" label={{eng: FIELD_VALUE_LIST.RELEVENT_MRI}} value={formData?.imaging_relevant_MRI ? (formData?.imaging_relevant_MRI) : '-'} />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12}>
                                <Grid item xs={12}>
                                    <Typography component="h6" variant="h6" sx={{mb:0, mt: 2}}>
                                        Treatment
                                    </Typography>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="need_escalation_antibiotics" label={{eng: FIELD_VALUE_LIST.NEED_ESCLA}} value={formData?.need_escalation_antibiotics ? formatYesNoVal(formData?.need_escalation_antibiotics) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="use_vasopressors" label={{eng: FIELD_VALUE_LIST.USE_VASO}} value={formData?.use_vasopressors ? formatYesNoVal(formData?.use_vasopressors) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="need_mechanical_ventilation" label={{eng: FIELD_VALUE_LIST.NEED_MEDICAL}} value={formData?.need_mechanical_ventilation ? formatYesNoVal(formData?.need_mechanical_ventilation) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="need_dialysis" label={{eng: FIELD_VALUE_LIST.NEED_DYLI}} value={formData?.need_dialysis ? formatYesNoVal(formData?.need_dialysis) : '-'}/>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FieldValue name="need_source_control" label={{eng: FIELD_VALUE_LIST.PROCCED}} value={formData?.need_source_control ? formatYesNoVal(formData?.need_source_control) : '-'}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box sx={{ flex: '1 1 auto', justifyContent: 'end', textAlign: 'end' }}>
                        {/* <Button type="button" variant="contained" sx={{ mt: 3, mb: 2, mx: 3 }} onClick={() => window?.print()} className='noPrint'>
                            Print
                        </Button> */}

                        {JSON.stringify(state?.ED?.formData) !== '{}' && !state?.ED?.formData?.isSubmitted && !isSubmitting && <Button disabled={isSubmitting} type="button" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmit} className='noPrint'>
                            Submit
                        </Button>}
                        {JSON.stringify(state?.ED?.formData) !== '{}' && !state?.ED?.formData?.isApproved && state?.ED?.formData?.isSubmitted && !isApproved && <Button disabled={isApproved} type="button" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleApproved} className='noPrint'>
                            Approve
                        </Button>}
                    </Box>
                </div> : <h2 className='text-center'>No Data found for review</h2>
            }
        </div>
    </>
    )
} 

export default FormEntryView;