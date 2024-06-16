import React, { Children } from 'react';
import { Navigate } from 'react-router-dom';

function Protected({isAuthenticated, isAuthorized, children}: any) {
    const isLogdin: any = sessionStorage.getItem("iscustomerLogdin");
    const issuperAdmin: any = sessionStorage.getItem("issuperAdmin");
    if(!(isLogdin && isLogdin === 'true')) {
        return <Navigate to={'/'} replace />
    }
    if(!(isAuthorized || (issuperAdmin && issuperAdmin === 'true'))) {
        return <><h4 className='text-center my-5' style={{minHeight: '550px'}}>Not Authorized</h4></>
    }
    return children
}

export default Protected;