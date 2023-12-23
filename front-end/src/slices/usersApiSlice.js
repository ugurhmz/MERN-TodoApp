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
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
