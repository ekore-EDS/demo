
export enum EnvironmentName {
    DEV = 'dev',
    QA = 'qa',
    PROD = 'prod'
}

const APIENDPOINTS: any = {
    dev: `${process.env.REACT_APP_DEV_API_URL}`,
    qa: process.env.REACT_APP_QA_API_URL,
    prod: process.env.REACT_APP_PROD_API_URL
}

export class EnvironmentService {
    static get EndPoints() {
        const data = APIENDPOINTS[this.Environment];
        return data;
    }

    static get Environment() {
        const hostname = window && window.location && window.location.hostname;
        if(hostname.indexOf(EnvironmentName.DEV) > -1 || hostname.indexOf('localhost') > -1) {
            return EnvironmentName.DEV;
        } else if(hostname.indexOf(EnvironmentName.QA) > -1) {
            return EnvironmentName.QA;
        } else {
            return EnvironmentName.PROD;
        }
    }
}