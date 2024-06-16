
import { INITIAL_STATE, reportReducer } from "./ed/reducers"
import { ReportState } from "./ed/state"

export interface Action {
    type: string,
    data?: any
}

export interface AppState {
    ED: ReportState
}

export const APP_INITIAL_STATE: AppState = {
    ED: INITIAL_STATE
}

export const appReducer = (state: AppState, action: Action) => ({
    ED:  reportReducer(state.ED, action)
})