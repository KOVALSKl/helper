import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ApiResponse, ApiResponsePreview, Disease, DiseaseApiResponse, DiseasePreview, Group} from "../../types/types";

export const diseasesApi = createApi({
    reducerPath: 'diseases',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_HOST_LINK}`}),
    tagTypes: ['DISEASE', 'GROUP', 'RISKS'],
    endpoints: (builder) => ({
        getDiseases: builder.query<DiseaseApiResponse[], void>({
            query: () => '/diseases',
            providesTags: ['DISEASE']
        }),
        getDisease: builder.query<DiseaseApiResponse, number>({
            query: (id) => `/diseases/${id}`
        }),
        addDisease: builder.mutation<DiseaseApiResponse, Omit<Disease, 'id' | 'distance'>>({
            query: (disease) => ({
                url: '/diseases',
                method: 'POST',
                body: {
                    ...disease,
                    tips: disease.tips.join('|'),
                    reasons: disease.reasons.join('|'),
                },
            }),
            invalidatesTags: ['DISEASE']
        }),
        updateDisease: builder.mutation<DiseaseApiResponse, Disease>({
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
        }),
        getDiseasesGroups: builder.query<Group[], void>({
            query: () => '/groups/diseases',
            providesTags: ['GROUP']
        }),
        getDiseasesGroup: builder.query<Group, number>({
            query: (id) => `/groups/diseases/${id}`
        }),
        addDiseasesGroup: builder.mutation<Group, Omit<Group, 'id'>>({
            query: (group) => ({
                url: '/groups/diseases',
                method: 'POST',
                body: group,
            }),
            invalidatesTags: ['GROUP']
        }),
        updateDiseasesGroup: builder.mutation<Group, Group>({
            query: (group) => ({
                url: '/groups/diseases',
                method: 'PUT',
                body: group,
            }),
            invalidatesTags: ['GROUP']
        }),
        deleteDiseasesGroup: builder.mutation<ApiResponsePreview, number>({
            query: (id) => ({
                url: `/groups/diseases/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['GROUP']
        }),
        getRisksGroups: builder.query<Group[], void>({
            query: () => '/groups/risks',
            providesTags: ['RISKS'],
        }),
        getRisksGroup: builder.query<Group, number>({
            query: (id) => `/groups/risks/${id}`,
        }),
        addRisksGroup: builder.mutation<Group, Omit<Group, 'id'>>({
            query: (group) => ({
                url: '/groups/risks',
                method: 'POST',
                body: group,
            }),
            invalidatesTags: ['RISKS']
        }),
        updateRisksGroup: builder.mutation<Group, Group>({
            query: (group) => ({
                url: '/groups/risks',
                method: 'PUT',
                body: group,
            }),
            invalidatesTags: ['RISKS']
        }),
        deleteRisksGroup: builder.mutation<ApiResponsePreview, number>({
            query: (id) => ({
                url: `/groups/risks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['RISKS']
        }),
    })
})

export const {
    useGetDiseaseQuery,
    useGetDiseasesQuery,
    useAddDiseaseMutation,
    useUpdateDiseaseMutation,
    useDeleteDiseaseMutation,

    useGetDiseasesGroupQuery,
    useGetDiseasesGroupsQuery,
    useAddDiseasesGroupMutation,
    useUpdateDiseasesGroupMutation,
    useDeleteDiseasesGroupMutation,

    useGetRisksGroupQuery,
    useGetRisksGroupsQuery,
    useAddRisksGroupMutation,
    useUpdateRisksGroupMutation,
    useDeleteRisksGroupMutation,

} = diseasesApi