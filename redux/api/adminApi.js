import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAdmins: builder.query({
            query: (params) => ({
                url: "/admin/all-admins",
                method: "GET",
                params: {
                    ...params,
                },
            }),
            providesTags: ["admin"],
        }),
        createAdmin: builder.mutation({
            query: (body) => ({
                url: "/admin/create-admin",
                method: "POST",
                body,
            }),
            invalidatesTags: ["admin"],
        }),
        updateAdmin: builder.mutation({
            query: (userId) => {
                return {
                    url: `dashboard/block-user?userId=${userId}`,
                    method: "PATCH",
                };
            },
            invalidatesTags: ["user"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `dashboard/delete-user/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"],
        }),

    }),
});

export const {
    useGetAllAdminsQuery,
    useCreateAdminMutation,
    useUpdateAdminMutation,
    useDeleteUserMutation,
} = adminApi;
