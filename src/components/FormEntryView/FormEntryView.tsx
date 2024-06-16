import React from 'react';
import { Grid, Box, Button, Typography } from "@mui/material";
import "./FormEntryView.scss";
import FieldValue from '../FieldValue';
import { FIELD_VALUE_LIST } from '../../utils/utils';

interface FormEntryViewData {
    formData: any
}
function FormEntryView(props: FormEntryViewData) {
    const {formData} = props;

    return (
        <>
        <div className="App container-fluid">
            <div className='shadow px-5 py-3 my-3 '>
                   <Grid container spacing={2}>
                        <Grid container item xs={12} className='grid-section'>
                            <Grid item xs={12}>
                                <Typography component="h6" variant="h6" sx={{mb:2}}>
                                    qSOFA (score=/{'>'} 2-----high risk of sepsis and high mortality)
                                </Typography>
                            </Grid>
                            <Grid item  sx={{my: '0rem', mx: '0.5rem'}} className='grid-content'>
                                <FieldValue value={formData?.rrate} name="rrate" label={FIELD_VALUE_LIST.RR}/>
                                {/* <Radiogroup name="dimension" label={{eng: "Site Dimention", kan: 'ಸೈಟ್ ಆಯಾಮಗಳು'}} radioList={dimensionList}/> */}
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
                    </Grid>
                    <Box sx={{ flex: '1 1 auto', justifyContent: 'end', textAlign: 'end' }}>
                        <Button type="button" variant="contained" sx={{ mt: 3, mb: 2, mx: 3 }} onClick={() => window?.print()} className='noPrint'>
                            Print
                        </Button>

                        <Button type="button" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => {}} className='noPrint'>
                            Submit
                        </Button>
                    </Box>
            </div>
        </div>
    </>
    )
} 

export default FormEntryView;