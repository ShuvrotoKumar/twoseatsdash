import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateAdminPersonalInfo: builder.mutation({
      query: (params) => ({
        url: "/admin/update-admin-personal-info",
        method: "PUT",
        body: params,
      }),
      providesTags: ["profile"],
    }),
    updateProfile: builder.mutation({
      query: (file) => ({
        url: "user/update-profile",
        method: "PATCH",
        body: file,
      }),
      invalidatesTags: ["profile"],
    }),
    changeAdminPassword: builder.mutation({
      query: (data) => ({
        url: "dashboard/admin-change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    getUserDetails: builder.query({
      query: (params) => ({
        url: "user/user-detail",
        method: "GET",
        params,
      }),
      providesTags: ["profile"],
    }),
  }),
});

export const {
  useUpdateAdminPersonalInfoMutation,
  useChangeAdminPasswordMutation,
  useGetUserProfileQuery,
  useGetUserDetailsQuery,
} = profileApi;
