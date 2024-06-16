import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Protected from './Protected';
import SignIn from '../components/Login/SignIn';
import Home from '../components/Home/Home';
// import UserManagement from '../pages/UserManagement/UserManagement';

function Routers(props: any) {
    const path = window?.location?.pathname;
    const isLogdin: any = sessionStorage.getItem("iscustomerLogdin");
    const issuperAdmin: any = sessionStorage.getItem("issuperAdmin");

    const isUserAuthenticated: any = () => {
        return isLogdin && isLogdin === 'true' ? true : false;
    }

    const isSuperUser: any = () => {
        return issuperAdmin && issuperAdmin === 'true' ? true : false;
    }
    
    return (
            <>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/home" element={
                <Protected 
                        isAuthenticated={isUserAuthenticated()} isAuthorized={true}>
                        <Home />
                </Protected>} />
                   
                    <Route path="*" element={<><h4 className='text-center my-5 text-danger'>Not Authorized</h4></>} />
            </Routes>
            </>
            
    );
}

export default Routers;