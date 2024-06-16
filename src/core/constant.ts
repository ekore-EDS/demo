import { EnvironmentService } from "../shared/environment.service";

export const baseUrl = EnvironmentService.EndPoints;
export const APIMETHOD = {
    user: {
        LOGIN: `${baseUrl}user/login`,
    }
}