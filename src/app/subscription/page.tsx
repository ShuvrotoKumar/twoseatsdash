"use client";

import { ManageSubscriptionModal } from "./ManageSubscriptionModal";
import { CreateSubscriptionModal } from "./CreateSubscriptionModal";
import { Check, Crown, Settings, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import {
  useCreateSubscriptionPlanMutation,
  useGetSubscriptionPlansQuery,
  useUpdateSubscriptionPlanMutation,
} from "../../../redux/api/subscriptionApi";

const Subscription = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // API hooks
  const [createSubscriptionPlan] = useCreateSubscriptionPlanMutation();
  const [updateSubscriptionPlan] = useUpdateSubscriptionPlanMutation();
  const { data: subscriptionPlansData, isLoading: plansLoading } = useGetSubscriptionPlansQuery({ role: "admin" });

  const [monthlyPlan, setMonthlyPlan] = useState<any>({
    id: "",
    name: "Premium Monthly",
    price: "$29.99",
    cycle: "month",
    features: [
      "Unlimited access to all features",
      "Priority customer support",
      "Advanced analytics dashboard",
      "Custom branding options",
      "API access",
      "Team collaboration tools",
      "Monthly reports",
      "Cancel anytime",
    ],
  });

  const [yearlyPlan, setYearlyPlan] = useState<any>({
    id: "",
    name: "Premium Yearly",
    price: "$299.99",
    cycle: "year",
    features: [
      "Everything in Monthly plan",
      "Priority customer support",
      "Advanced analytics dashboard",
      "Custom branding options",
      "API access",
      "Team collaboration tools",
      "Quarterly business reviews",
      "Dedicated account manager",
      "Early access to new features",
    ],
  });

  // Load plans from API on mount
  useEffect(() => {
    if (subscriptionPlansData?.data && subscriptionPlansData.data.length > 0) {
      const plans = subscriptionPlansData.data;
      const monthly = plans.find((p: any) => p.billingCycle === "monthly" || p.billingCycle === "month");
      const yearly = plans.find((p: any) => p.billingCycle === "yearly" || p.billingCycle === "year");

      if (monthly) {
        setMonthlyPlan({
          id: monthly._id,
          name: monthly.planName,
          price: typeof monthly.price === "number" ? `$${monthly.price}` : monthly.price,
          cycle: monthly.billingCycle,
          features: monthly.features || [],
        });
      }

      if (yearly) {
        setYearlyPlan({
          id: yearly._id,
          name: yearly.planName,
          price: typeof yearly.price === "number" ? `$${yearly.price}` : yearly.price,
          cycle: yearly.billingCycle,
          features: yearly.features || [],
        });
      }
    }
  }, [subscriptionPlansData]);

  const handleSave = async (updatedMonthly: any, updatedYearly: any) => {
    setMonthlyPlan(updatedMonthly);
    setYearlyPlan(updatedYearly);

    const savePlan = async (plan: any) => {
      const data = {
        planName: plan.name,
        billingCycle: plan.cycle,
        price: parseFloat(String(plan.price).replace("$", "")),
        discountPrice: 0,
        discountPercentage: 0,
        trialDays: 0,
        features: plan.features,
        status: "active",
      };

      if (plan.id) {
        await updateSubscriptionPlan({
          subscriptionId: plan.id,
          role: "admin",
          data,
        }).unwrap();
      } else {
        await createSubscriptionPlan({
          role: "admin",
          data,
        }).unwrap();
      }
    };

    try {
      await savePlan(updatedMonthly);
    } catch (error) {
      console.error("Failed to save monthly plan:", error);
    }

    try {
      await savePlan(updatedYearly);
    } catch (error) {
      console.error("Failed to save yearly plan:", error);
    }
  };

  const handleCreatePlan = async (data: any) => {
    try {
      await createSubscriptionPlan({
        role: "admin",
        data,
      }).unwrap();
    } catch (error) {
      console.error("Failed to create plan:", error);
    }
  };

  return (
    <div className="m-2 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0D2357] dark:text-white">Subscription Plans</h1>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-[#0D2357] bg-[#0D2357] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0D2357]/90 dark:border-white dark:bg-white dark:text-[#0D2357] dark:hover:bg-white/90"
          >
            <Plus className="h-4 w-4" />
            Create Plan
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-[#F4B057] bg-[#F4B057] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#F4B057]/90"
          >
            <Settings className="h-4 w-4" />
            Manage Plans
          </button>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 pt-10 pb-5 md:grid-cols-2 lg:grid-cols-3">
        {plansLoading ? (
          <div className="col-span-full py-10 text-center text-[#0D2357] dark:text-white">
            Loading plans...
          </div>
        ) : (
          subscriptionPlansData?.data?.map((plan: any) => {
            const isBestValue =
              plan.billingCycle === "yearly" || plan.billingCycle === "year" || plan.discountPercentage > 0;
            const currentPrice =
              plan.discountPrice > 0 && plan.discountPrice < plan.price ? plan.discountPrice : plan.price;
            const originalPrice = plan.price;

            return (
              <div
                key={plan._id}
                className={`dark:bg-sidebar relative rounded-lg border bg-white p-6 transition-all hover:shadow-md ${
                  isBestValue
                    ? "border-2 border-[#F4B057] shadow-lg hover:shadow-xl"
                    : "border-[#E2E8F0] shadow-sm dark:border-[#F4B057]"
                }`}
              >
                {isBestValue && (
                  <div className="absolute -top-3 right-4 flex items-center gap-1 rounded-full bg-[#F4B057] px-3 py-1 text-xs font-medium text-white">
                    <Crown className="h-3 w-3" />
                    Best Value
                  </div>
                )}

                <div className="mb-4">
                  <h2 className="text-xl font-bold text-[#0D2357] dark:text-white">{plan.planName}</h2>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-[#0D2357] dark:text-white">
                      ${currentPrice}
                    </span>
                    <span className="text-sm text-[#0D2357]/70 dark:text-white/70">
                      / {plan.billingCycle}
                    </span>
                  </div>
                  {plan.discountPrice > 0 && plan.price > plan.discountPrice && (
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-[#0D2357]/50 line-through dark:text-white/50">
                        ${originalPrice}
                      </span>
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Save ${Number(originalPrice - currentPrice).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3">
                  {plan.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-[#0D2357] dark:text-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>

      {/* Subscribed Users Table */}
      <h1 className="my-8 text-2xl font-bold text-[#0D2357] dark:text-white">Subscribed Users</h1>
      <div className="dark:bg-sidebar rounded-lg border border-[#E2E8F0] bg-white shadow-sm dark:border-[#F4B057]">
        <div className="p-4 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-[#F4B057]">
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    User Name
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Email
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Plan
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Start Date
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Next Billing
                  </th>
                  <th className="pb-3 text-center text-sm font-medium text-[#0D2357] dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const allUsers = [
                    {
                      id: 1,
                      name: "John Doe",
                      email: "john.doe@example.com",
                      plan: "Premium Monthly",
                      startDate: "2024-10-15",
                      nextBilling: "2024-12-15",
                      status: "Active",
                    },
                    {
                      id: 2,
                      name: "Jane Smith",
                      email: "jane.smith@example.com",
                      plan: "Premium Yearly",
                      startDate: "2024-01-20",
                      nextBilling: "2025-01-20",
                      status: "Active",
                    },
                    {
                      id: 3,
                      name: "Mike Johnson",
                      email: "mike.j@example.com",
                      plan: "Premium Monthly",
                      startDate: "2024-11-01",
                      nextBilling: "2024-12-01",
                      status: "Active",
                    },
                    {
                      id: 4,
                      name: "Sarah Williams",
                      email: "sarah.w@example.com",
                      plan: "Premium Yearly",
                      startDate: "2024-03-10",
                      nextBilling: "2025-03-10",
                      status: "Active",
                    },
                    {
                      id: 5,
                      name: "David Brown",
                      email: "david.b@example.com",
                      plan: "Premium Monthly",
                      startDate: "2024-09-05",
                      nextBilling: "2024-12-05",
                      status: "Cancelled",
                    },
                    {
                      id: 6,
                      name: "Emily Davis",
                      email: "emily.d@example.com",
                      plan: "Premium Yearly",
                      startDate: "2024-02-14",
                      nextBilling: "2025-02-14",
                      status: "Active",
                    },
                    {
                      id: 7,
                      name: "Robert Wilson",
                      email: "robert.w@example.com",
                      plan: "Premium Monthly",
                      startDate: "2024-08-22",
                      nextBilling: "2024-12-22",
                      status: "Active",
                    },
                    {
                      id: 8,
                      name: "Lisa Anderson",
                      email: "lisa.a@example.com",
                      plan: "Premium Yearly",
                      startDate: "2024-05-30",
                      nextBilling: "2025-05-30",
                      status: "Active",
                    },
                  ];

                  const startIndex = (currentPage - 1) * itemsPerPage;
                  const endIndex = startIndex + itemsPerPage;
                  const currentUsers = allUsers.slice(startIndex, endIndex);
                  const totalPages = Math.ceil(allUsers.length / itemsPerPage);

                  return (
                    <>
                      {currentUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="border-b border-[#E2E8F0] last:border-0 dark:border-[#F4B057]/30"
                        >
                          <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                            {user.name}
                          </td>
                          <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                            {user.email}
                          </td>
                          <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                            {user.plan}
                          </td>
                          <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                            {user.startDate}
                          </td>
                          <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                            {user.nextBilling}
                          </td>
                          <td className="py-3 text-center">
                            <span
                              className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                                user.status === "Active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </>
                  );
                })()}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-[#E2E8F0] pt-4 sm:flex-row sm:items-center dark:border-[#F4B057]/30">
            <div className="text-sm text-[#0D2357] dark:text-white">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, 8)} of 8 users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="dark:bg-sidebar flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.ceil(8 / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex h-8 w-8 items-center justify-center rounded border text-sm transition-colors ${
                    currentPage === page
                      ? "border-[#F4B057] bg-[#F4B057] text-white"
                      : "dark:bg-sidebar border-[#E2E8F0] bg-white text-[#0D2357] hover:bg-gray-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(8 / itemsPerPage)))
                }
                disabled={currentPage === Math.ceil(8 / itemsPerPage)}
                className="dark:bg-sidebar flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ManageSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        monthlyPlan={monthlyPlan}
        yearlyPlan={yearlyPlan}
        onSave={handleSave}
      />

      <CreateSubscriptionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreatePlan}
      />
    </div>
  );
};

export default Subscription;
