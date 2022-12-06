import axios, { AxiosPromise } from "axios";
import { sendRequestProps } from "../types/types";

export function sendRequest<ObjectType>({ url, sendingData }: sendRequestProps<ObjectType>): AxiosPromise {
    return axios.post(url, sendingData);
}