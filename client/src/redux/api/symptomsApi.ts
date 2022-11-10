import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Symptom } from '../../types/types'


export const symptomsApi = createApi({
    reducerPath: 'symptoms',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_HOST_LINK}` }),
    endpoints: (builder) => ({
        getSymptoms: builder.query<Symptom[], void>({
            query: () => '/symptoms',
        })
    })
})

export const { useGetSymptomsQuery } = symptomsApi