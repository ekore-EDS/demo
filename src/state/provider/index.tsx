import React, { useContext, useReducer, Dispatch, createContext } from "react";
import { APP_INITIAL_STATE, AppState, appReducer, Action } from "../../state";

interface AppStateContextProps {
    state: AppState,
    dispatch: Dispatch<Action>
}

export const AppStateContext = createContext<AppStateContextProps>({
    state: APP_INITIAL_STATE,
    dispatch: () => {}
});

export const AppStateProvider = ({children, initialState = APP_INITIAL_STATE}: any) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppStateContext.Provider value={{state, dispatch}}>
            {children}
        </AppStateContext.Provider>
    )
}

export const useAppStateContext = () => useContext(AppStateContext)