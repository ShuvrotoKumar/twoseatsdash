import { baseApi } from "./baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionPlans: builder.query({
      query: ({ role }) => ({
<<<<<<< HEAD
        url: "/subscription/get-all-subscriptions",
=======
        url: "subscription/get-subscription-plan",
>>>>>>> 73a6a428f80c078010278cc3e3a827690313d2e8
        method: "GET",
        params: { role },
      }),
      providesTags: ["subscription"],
    }),
<<<<<<< HEAD
    createSubscriptionPlan: builder.mutation({
      query: ({ role, data }) => ({
        url: "/subscription/create-subscription",
        method: "POST",
        params: { role },
        body: data,
      }),
      invalidatesTags: ["subscription"],
    }),
=======
>>>>>>> 73a6a428f80c078010278cc3e3a827690313d2e8
    updateSubscriptionPlan: builder.mutation({
      query: ({ subscriptionId, role, data }) => ({
        url: "subscription/update-subscription-plan",
        method: "PATCH",
        // Send both casings to be safe
        params: { subscriptionId, role },
        body: data,
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

<<<<<<< HEAD
export const {
  useGetSubscriptionPlansQuery,
  useCreateSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
} = subscriptionApi;
=======
export const { useGetSubscriptionPlansQuery, useUpdateSubscriptionPlanMutation } = subscriptionApi;
>>>>>>> 73a6a428f80c078010278cc3e3a827690313d2e8

export default subscriptionApi;
