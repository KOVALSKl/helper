import axios, { AxiosPromise } from "axios";
import { RequestType, SendRequestProps } from "../types/types";

export function sendRequest<ObjectType>({ url, sendingData, requestType, params = null, headers = null }: SendRequestProps<ObjectType>): AxiosPromise {
    switch (requestType) {
        case RequestType.GET:
        default:
            return axios.get(url, { params, headers });
        case RequestType.POST:
            return axios.post(url, sendingData, { params, headers });
        case RequestType.PUT:
            return axios.put(url, sendingData, { params, headers });
        case RequestType.DELETE:
            return axios.delete(url, { params, headers });
    }
}