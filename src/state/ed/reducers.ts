
import { ReportState } from "./state";
import { Action } from '..';
import { ReportActionType } from "./actionType";

export const INITIAL_STATE: ReportState = {
    context: {},
    formId: '',
    docId: '',
    formData: '',
    tabNo: '1',
    userDetails: {
        activeUser: '',
        isSuperAdmin: false,
        currentUser: ''
    }
}

export const reportReducer = (state = INITIAL_STATE, action: Action) => {
    switch(action.type) {
        case ReportActionType.GET_STATIC_DATA:
            return {
                ...state,
                context: action.data.data
            }
        case ReportActionType.GET_STATIC_DATA_FAILED:
            return {
                ...state,
                error: action.data.error
            }
        case ReportActionType.USER_REGISTER:
            return {
                ...state,
                registerData: action.data.data
            }
        case ReportActionType.USER_REGISTER_FAILED:
            return {
                ...state,
                error_register: action.data.error
            }
        case ReportActionType.SAVE_APPLICATION_FORM:
            return {
                ...state,
                formData: action.data.data
            }
        case ReportActionType.SET_APPLICATION_ID:
            return {
                ...state,
                formId: action.data.formid,
                docId: action.data.docid
            }
        case ReportActionType.SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.data
            }
        case ReportActionType.SET_TAB_NUMBER:
            return {
                ...state,
                tabNo: action.data.tabno
            }
        default:
            return state;
    }
}