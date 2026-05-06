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
        deleteAdmin: builder.mutation({
            query: (adminId) => {
                return {
                    url: `/admin/delete-admin/${adminId}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["admin"],
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
    useDeleteAdminMutation,
} = adminApi;
