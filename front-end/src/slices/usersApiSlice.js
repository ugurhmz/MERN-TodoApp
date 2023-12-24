import { apiSlice } from "./apiSlice";

const base_URL = 'http://localhost:7500/ugurv1/api/';
const USERS_URL = base_URL + 'users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login-user`,
        method: 'POST',
        body: data,
        credentials:"include"
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register-user`,
        method: 'POST',
        body: data,
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
        credentials:"include"
      })
    })


  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;
