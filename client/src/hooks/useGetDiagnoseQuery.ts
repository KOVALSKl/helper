import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks';
import {Disease, DiseaseTip, Group, HookQueryType} from "../types/types"

export function useGetDiagnoseQuery(): HookQueryType<Disease[]> {

    const [data, setData] = useState<Disease[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<AxiosError>();

    const symptoms = useAppSelector(state => state.selectedSymtpoms.value);

    useEffect(() => {
        if (symptoms) {
            axios.post(`${process.env.REACT_APP_HOST_LINK}/diagnose`, {
                symptoms: JSON.stringify(symptoms)
            })
                .then((resp: AxiosResponse) => {
                    setData(resp.data.map((item: any) => {
                        return {
                            ...item,
                            tips: item.tips.split('|').map((tip: string) => JSON.parse(tip)),
                            reasons: item.reasons.split('|').map((tip:string) => JSON.parse(tip))
                        }
                    }))
                    setIsLoading(false);
                })
                .catch((error: AxiosError) => {
                    setError(error);
                    setIsLoading(false);
                })
        }
    }, [])

    return {
        data,
        isLoading,
        error: error || null
    }
}