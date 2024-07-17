import react, {useEffect, useMemo, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EntryForm from '../FormEntry/EntryForm';
import './Home.scss';
import { getuserInfo, isSuperUser } from '../../utils/utils';
import FormEntryView from '../FormEntryView/FormEntryView';
import { db } from '../..';
import { collection, getDocs } from 'firebase/firestore';
import { useAppStateContext } from '../../state/provider';
import { setFormId, setFormData, setUserDetails } from '../../state/ed/actions';
import { Autocomplete, TextField } from '@mui/material';

const Home = () => {
  const [value, setValue] = useState('1');
  const isSuperAdmin = isSuperUser();
  const [formValues, setFormValues] = useState<any>(null);
  const [singleUserData, setsingleUserData] = useState<any[]>([]);
  const [approvedReport, setApprovedReport] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<string>('');
  const { state, dispatch } = useAppStateContext();
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  let _uuid: any;
  // let draftData: any;
  const userdata = getuserInfo();
  if(userdata && userdata.username) {
    _uuid = currentUser ? currentUser : userdata.username;
    // const _d = uList[_uuid];
    // draftData = _d ? JSON.parse(uList[_uuid]) : null;
  }

  const handleApproval = () => {
    setIsSubmitted(!isSubmitted);
  }

  const _singleUserData: any = useMemo(async() => {
    const querySnapshot = await getDocs(collection(db, _uuid));
    setsingleUserData(querySnapshot.docs);
    return querySnapshot.docs;
  }, [_uuid, isSubmitted]);

  useEffect(() => {
    let data: any = [];
    const getusers = async() => {
      if(isSuperAdmin) {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc: any) => {
          data = [...data, {label: doc?.data()?.username}]
        });
        setUserData(data);
      }
    }
    const getApprovedData = async() => {
      if(isSuperAdmin) {
        const querySnapshot = await getDocs(collection(db, 'approved_records'));
        setApprovedReport(querySnapshot?.docs);
      }
    }
    if(isSuperAdmin && data?.length === 0) {
      getusers();
      getApprovedData();
    }
  }, [isSuperAdmin]);

  useEffect(() => {
    if(state.ED.tabNo) {
      setValue(state.ED.tabNo);
      if(state.ED.tabNo === '3') {
        setFormValues(state.ED.formData);
      }
    }
  }, [state.ED.tabNo]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if(event?.type === 'click' && newValue === '1') {
      setFormValues(null);
      dispatch(setFormData({}));
      dispatch(setFormId('', ''));
    }
  };

  const editForm = (value: any, type='') => {
    const data = value.data();
    dispatch(setFormId(value.id, data.uid));
    dispatch(setFormData({...data}));
    // const data = JSON.parse(uList[id])
    setFormValues(data);
    // if(type === 'approved') {
    //   setValue('4');
    // } else {
      if(data && data?.uid?.includes('DRAFT')) {
        setValue('1');
      } else {
        setValue('3');
      }
    //   }
    // }
    
  }


  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='noPrint'>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="New Record" value="1"/>
            <Tab label="Cases" value="2" />
            <Tab label="Approvals" value="3" />
            <Tab label="Submited Records" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1"><EntryForm formData={formValues}/></TabPanel>
        <TabPanel value="2">
          <Box>
            <h4 className='my-3'>Total Records</h4>
            {userData && userData.length > 0 && <div className='my-3'>
              <div className="my-2">
                  <label>
                      Please select the user 
                  </label>
              </div>
                <Autocomplete
                  size='small'
                  disablePortal
                  id="combo-box-demo"
                  options={userData || []}
                  sx={{ width: 300 }}
                  onChange={(e: any) => {
                    dispatch(setUserDetails({...state?.ED?.userDetails, activeUser: e?.target?.textContent}))
                    setCurrentUser(e?.target?.textContent)
                  }}
                  renderInput={(params) => <TextField {...params} label="" />}
                />
              </div>
            }
            {isSuperAdmin || true ? singleUserData && singleUserData.length > 0 &&
            singleUserData.map((list: any) => {
              return <>{!list?.data()?.isApproved && <div key={list} className='report_list row' onClick={() => editForm(list)}>
                <div className='child_list col-sm-12 col-md-8'><label>{list.data().uid}</label> <label>{list.data()?.patient_name}</label> <label>{list.data()?.patient_identifier}</label> </div>
              </div>}</>
            }) : null}
          </Box>
        </TabPanel>
        <TabPanel value="3">
          <Box>
            <FormEntryView formData={formValues} handleApproval={handleApproval}/>
          </Box>
        </TabPanel>
        <TabPanel value='4'>
        <Box>
            <h4 className='my-3'>Approved Records</h4>
            
            {isSuperAdmin ? approvedReport && approvedReport.length > 0 &&
            approvedReport.map((list: any) => {
              return <div key={list} className='report_list' onClick={() => editForm(list, 'approved')}>
                <div className='child_list col-sm-12 col-md-8'><label>{list.data().uid}</label> <label>{list.data()?.patient_name}</label> <label>{list.data()?.patient_identifier}</label> </div>
              </div>
            }) : null}
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Home;