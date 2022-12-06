import { skipToken } from '@reduxjs/toolkit/dist/query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react'
import DiseaseTipItem from '../components/ListItems/DiseaseTipItem/DiseaseTipItem';
import { useGetSymptomsQuery } from '../redux/api/symptomsApi';
import { useAppSelector } from '../redux/hooks';
import { Disease, DiseaseTip, HookQueryType } from "../types/types"

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
                            tips: item.tips.split('|').map((tip: string) => new DiseaseTip(tip))
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