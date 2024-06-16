import { ReportActionType } from "./actionType";
export const getContext = (data: any) => ({
    type: ReportActionType.GET_STATIC_DATA,
    data: {
        data
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

