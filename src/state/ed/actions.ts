import { isSuperUser } from "../../utils/utils";
import { ReportActionType } from "./actionType";
export const getContext = (data: any) => ({
    type: ReportActionType.GET_STATIC_DATA,
    data: {
        data
    }
})

export const setFormData = (data: any) => ({
    type: ReportActionType.SAVE_APPLICATION_FORM,
    data: {
        data
    }
})

export const setTabNumber = (tabno: string) => ({
    type: ReportActionType.SET_TAB_NUMBER,
    data: {
        tabno
    }
})

export const setFormId = (docid: string, formid: string = '') => ({
    type: ReportActionType.SET_APPLICATION_ID,
    data: {
        docid,
        formid
    }
})

export const setUserDetails = (details: any) => ({
    type: ReportActionType.SET_USER_DETAILS,
    data: {
        ...details
    }
})

export const getContextFailed = (error: Error) => ({
    type: ReportActionType.GET_STATIC_DATA,
    data: {
        error
    }
})

export const setRegisterData = (data: any) => ({
    type: ReportActionType.USER_REGISTER,
    data: {
        data
    }
})

export const setRegisterDataFailed = (error: Error) => ({
    type: ReportActionType.USER_REGISTER_FAILED,
    data: {
        error
    }
})

