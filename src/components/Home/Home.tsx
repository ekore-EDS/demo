import react, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EntryForm from '../FormEntry/EntryForm';
import './Home.scss';
import { getuserDataList, getuserInfo, isSuperUser } from '../../utils/utils';
import FormEntryView from '../FormEntryView/FormEntryView';
import { isDisabled } from '@testing-library/user-event/dist/utils';

const Home = () => {
  const [value, setValue] = useState('1');
  const uList: any = getuserDataList() || {};
  const isSuperAdmin = isSuperUser();
  const [formValues, setFormValues] = useState<any>(null);
  let _uuid: any;
  let draftData: any;
  const userdata = getuserInfo();
  if(userdata && userdata.username) {
    _uuid = userdata.username;
    const _d = uList[_uuid];
    draftData = _d ? JSON.parse(uList[_uuid]) : null;
  }

  useEffect(() => {
    if(_uuid && draftData && draftData?.uid?.includes('DRAFT')) {
      setValue('1');
      setFormValues(draftData);
    } else if(_uuid && draftData && draftData?.uid?.includes('REPORT')) {
      setValue('2');
    }
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const editForm = (id: string) => {
    const data = JSON.parse(uList[id])
    setFormValues(data);
    if(data && data?.uid?.includes('DRAFT')) {
      setValue('1');
    } else {
      setValue('3');
    }
    
  }


  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
            {isSuperAdmin ? Object.keys(uList).map((list: any) => {
              return <div key={list} className='report_list' onClick={() => editForm(list)}>
                {JSON.parse(uList[list]).uid} 
              </div>
            }) : <div className='report_list' onClick={() => editForm(_uuid)}>
            {draftData?.uid} 
          </div>}
          </Box>
        </TabPanel>
        <TabPanel value="3"><FormEntryView formData={formValues}/></TabPanel>
      </TabContext>
    </Box>
  );
}

export default Home;