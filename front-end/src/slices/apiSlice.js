import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({baseUrl: 'http://localhost:7500/ugurv1/api/'});


export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({})
})