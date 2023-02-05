import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { url } from 'inspector'
import { ApiResponsePreview, Disease, DiseasePreview, GroupPreview, Symptom, SymptomPreview, SymptomsGroup } from '../../types/types'


export const symptomsApi = createApi({
    reducerPath: 'symptoms',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_HOST_LINK}` }),
    tagTypes: ['SYMPTOM', 'GROUP', 'DISEASE'],
    endpoints: (builder) => ({
        getSymptoms: builder.query<Symptom[], void>({
            query: () => '/symptoms',
            providesTags: ['SYMPTOM']
        }),
        addSymptom: builder.mutation<Symptom, SymptomPreview>({
            query: (symptom) => ({
                url: '/symptoms',
                method: 'POST',
                body: symptom,
            }),
            invalidatesTags: ['SYMPTOM']
        }),
        updateSymptom: builder.mutation<Symptom, Symptom>({
            query: (symptom) => ({
                url: '/symptoms',
                method: 'PUT',
                body: symptom
            }),
            invalidatesTags: ['SYMPTOM']
        }),
        deleteSymptom: builder.mutation<ApiResponsePreview, number>({
            query: (id) => ({
                url: `/symptoms/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SYMPTOM']
        }),
        getSymptomsGroups: builder.query<SymptomsGroup[], void>({
            query: () => '/groups',
            providesTags: ['GROUP']
        }),
        getSymptomsGroup: builder.query<SymptomsGroup, number>({
            query: (id) => `/groups/${id}`
        }),
        addSymptomsGroup: builder.mutation<SymptomsGroup, GroupPreview>({
            query: (group) => ({
                url: '/groups',
                method: 'POST',
                body: JSON.stringify(group),
            }),
            invalidatesTags: ['GROUP']
        }),
        updateSymptomsGroup: builder.mutation<SymptomsGroup, SymptomsGroup>({
            query: (group) => ({
                url: '/groups',
                method: 'PUT',
                body: group,
            }),
            invalidatesTags: ['GROUP']
        }),
        deleteSymptomsGroup: builder.mutation<ApiResponsePreview, number>({
            query: (id) => ({
                url: `/groups/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['GROUP']
        }),
        getDiseases: builder.query<Disease[], void>({
            query: () => '/diseases',
            providesTags: ['DISEASE']
        }),
        getDisease: builder.query<Disease, number>({
            query: (id) => `/diseases/${id}`
        }),
        addDisease: builder.mutation<Disease, DiseasePreview>({
            query: (disease) => ({
                url: '/diseases',
                method: 'POST',
                body: JSON.stringify(disease),
            }),
            invalidatesTags: ['DISEASE']
        }),
        updateDisease: builder.mutation<Disease, Disease>({
            query: (disease) => ({
                url: '/diseases',
                method: 'PUT',
                body: JSON.stringify(disease),
            }),
            invalidatesTags: ['DISEASE']
        }),
        deleteDisease: builder.mutation<ApiResponsePreview, number>({
            query: (id) => ({
                url: `/diseases/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['DISEASE']
        })
    })
})

export const {
    useGetSymptomsQuery,
    useAddSymptomMutation,
    useUpdateSymptomMutation,
    useDeleteSymptomMutation,

    useGetSymptomsGroupQuery,
    useGetSymptomsGroupsQuery,
    useAddSymptomsGroupMutation,
    useUpdateSymptomsGroupMutation,
    useDeleteSymptomsGroupMutation,

    useGetDiseaseQuery,
    useGetDiseasesQuery,
    useAddDiseaseMutation,
    useUpdateDiseaseMutation,
    useDeleteDiseaseMutation
} = symptomsApi