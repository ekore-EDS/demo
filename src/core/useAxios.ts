import { useEffect } from 'react';
import axios, { AxiosRequestConfig, CancelTokenSource, AxiosResponse, AxiosError } from "axios";
import React from 'react';
import { baseUrl } from './constant';
const axiosConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
    },
    responseType: 'json',
    withCredentials: false,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN'
};
const axiosConfigMultiForm: AxiosRequestConfig = {
    headers: {
        "Content-Type": "multipart/form-data",
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
    },
    responseType: 'json',
    withCredentials: false,
};

export const axiosInstance = axios.create(axiosConfig);
export const axiosInstanceMultiForm = axios.create(axiosConfigMultiForm);

export interface HttpRequestConfig extends AxiosRequestConfig {
    showLoader?: boolean,
    loadingMessage?: string
}

const DEFAULT_REQUEST_CONFIG: HttpRequestConfig = {
    showLoader: true,
    loadingMessage: 'Loading...'
}

export const useAxios = (requestConfig?: HttpRequestConfig) => {
    let source: CancelTokenSource;

    const { state } = {state: {auth: {accesToken: ''}}};

    const [error, setError] = React.useState<any>(null);
    const [loading, setLoading] = React.useState<boolean>(false);

    useEffect((): any => {
        return () => source?.cancel
    }, []);

    const get = async (overrideRequestConfig?: HttpRequestConfig) => {
        return await invokeCall({...overrideRequestConfig, method: 'GET'})
    };

    const post = async (overrideRequestConfig?: HttpRequestConfig, type?: string) => {
        return await invokeCall({...overrideRequestConfig, method: 'POST'}, type='')
    };

    const put = async (overrideRequestConfig?: HttpRequestConfig) => {
        return await invokeCall({...overrideRequestConfig, method: 'PUT'})
    };

    const del = async(overrideRequestConfig?: HttpRequestConfig) => {
        return await invokeCall({...overrideRequestConfig, method: 'DELETE'})
    };

    const invokeCall = async (overrideRequestConfig: HttpRequestConfig, type?: string) => {
        setError(null);
        const config = {...DEFAULT_REQUEST_CONFIG, ...requestConfig, ...overrideRequestConfig}
        source = axios.CancelToken.source();

        if(config.showLoader) {
            setLoading(true);
            // spinnerService.Show(config.loadingMessage);
        }

        try {
            const headers: any = { ...config?.headers }
            if(state.auth.accesToken) {
                headers['Authorization'] = `Bearer ${state.auth.accesToken}`;
            }
            if(type === 'fileupload') {
                const res: AxiosResponse<any> = await axiosInstanceMultiForm({
                    ...config,
                    headers,
                    cancelToken: source.token
                })
                return res.data;
            } else {
                const res: AxiosResponse<any> = await axiosInstance({
                    ...config,
                    headers,
                    cancelToken: source.token
                })
                return res.data;
            }
            
            
        } catch(err: any) {
            setError(handleApiError(err));
        } finally {
            if(config.showLoader) {
                setLoading(false);
                // spinnerService.Hide()
            }
        }
    }

    const handleApiError = (err: AxiosError<any>) => {
        return {
            status: err?.response?.data?.status ? err?.response?.data?.status : err?.response?.status,
            statusText: err.response ? err.response?.statusText : null,
            message: err?.response?.data?.message || err?.response?.data?.err || 'Server encounter an error while processing an request',
            stack: err?.stack
        }
    }

    return {
        error,
        loading,
        get,
        post,
        put,
        del
    }
};