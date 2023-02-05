import axios, { AxiosPromise } from "axios";
import { RequestType, SendRequestProps } from "../types/types";

export function sendRequest<ObjectType>({ url, sendingData, requestType, }: SendRequestProps<ObjectType>): AxiosPromise {
    switch (requestType) {
        case RequestType.GET:
        default:
            return axios.get(url);
        case RequestType.POST:
            return axios.post(url, sendingData);
        case RequestType.PUT:
            return axios.put(url, sendingData);
        case RequestType.DELETE:
            return axios.delete(url);
    }
}