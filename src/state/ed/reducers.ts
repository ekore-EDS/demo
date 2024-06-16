
import { ReportState } from "./state";
import { Action } from '..';
import { ReportActionType } from "./actionType";

export const INITIAL_STATE: ReportState = {
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
        default:
            return state;
    }
}