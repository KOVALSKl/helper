import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Symptom, SymptomsGroup } from '../../types/types'


export const symptomsApi = createApi({
    reducerPath: 'symptoms',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_HOST_LINK}` }),
    endpoints: (builder) => ({
        getSymptoms: builder.query<Symptom[], void>({
            query: () => '/symptoms',
        }),
        getSymptomsGroups: builder.query<SymptomsGroup[], void>({
            query: () => '/groups',
        }),
        getSymptomsGroup: builder.query<SymptomsGroup, number>({
            query: (id: number) => `/groups/${id}`
        })
    })
})

export const {
    useGetSymptomsQuery,
    useGetSymptomsGroupQuery,
    useGetSymptomsGroupsQuery,
} = symptomsApi