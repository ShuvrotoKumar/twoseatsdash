"use client";

import { EarningChart } from "@/components/EarningChart";
import { CountingNumber } from "@/components/ui/CountingNumber";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useGetEarningQuery } from "../../../redux/api/earningApi";

const Earnings = () => {
  const availableYears = [2025, 2024, 2023, 2022, 2021];
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);
  const itemsPerPage = 10;

  const { data: earningResponse, isLoading: isEarningLoading } = useGetEarningQuery({
    year: selectedYear,
    page: currentPage,
  });

  const earningData = earningResponse?.data || {};
  const overview = earningData.overview || {};
  const monthlyChart = earningData.monthlyChart || [];
  const planBreakdown = earningData.planBreakdown || [];

  // Map monthlyChart for EarningChart (which expects 'count')
  const earningChartData = monthlyChart.map((item: any) => ({
    month: item.month,
    count: item.earnings || 0,
  }));

  const totalRevenue = overview.totalRevenue || 0;
  const totalSubscriptions = overview.totalSubscriptions || 0;
  const activeUsers = overview.activeUsers || 0;

  const apiTransactions = (earningData.transactions || earningData.allTransactions || []).map((transaction: any) => ({
    ...transaction,
    _id: transaction._id || transaction.id,
  }));

  const planBreakdownTransactions = planBreakdown.map((plan: any) => ({
    _id: plan._id,
    createdAt: plan.createdAt ? new Date(plan.createdAt).toISOString() : `${selectedYear}-01-01T00:00:00.000Z`,
    description: plan.planName,
    paymentType: "Plan Breakdown",
    amount: plan.count,
    status: "Count",
  }));

  const allTransactions = apiTransactions.length > 0 ? apiTransactions : planBreakdownTransactions;

  // Filter transactions by selected year
  const filteredTransactions = allTransactions.filter((transaction: any) => {
    const transactionDate = transaction.date || transaction.createdAt;
    const transactionYear = new Date(transactionDate).getFullYear();
    return transactionYear === selectedYear;
  });

  // Reset to page 1 when year changes
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setCurrentPage(1);
  };

  const filteredTotalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const filteredStartIndex = (currentPage - 1) * itemsPerPage;
  const filteredEndIndex = filteredStartIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(filteredStartIndex, filteredEndIndex);

  return (
    <div className="py-6">
      {/* stat */}
      <div
        className="dark:bg-sidebar mb-4 flex w-full items-center justify-center rounded-lg border border-[#E2E8F0] bg-white shadow-sm max-md:py-4 dark:border-[#F4B057]"
        style={{ minHeight: "110px" }}
      >
        <div className="flex flex-1 flex-col items-center justify-center px-2">
          <p className="ipad:text-3xl mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white">
            <CountingNumber
              end={totalRevenue}
              duration={1000}
              decimals={2}
              prefix="$"
              className="ipad:text-3xl mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white"
            />
          </p>
          <span className="text-center text-sm font-medium text-[#0D2357] lg:text-lg dark:text-white">
            Total Revenue
          </span>
        </div>
        <div className="mx-4 h-16 w-px bg-[#F4B057]" />
        <div className="flex flex-1 flex-col items-center justify-center px-2">
          <p className="ipad:text-3xl mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white">
            <CountingNumber
              end={totalSubscriptions}
              duration={1000}
              decimals={0}
              className="ipad:text-3xl mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white"
            />
          </p>
          <span className="text-center text-sm font-medium text-[#0D2357] lg:text-lg dark:text-white">
            Total Subscriptions
          </span>
        </div>
        <div className="mx-4 h-16 w-px bg-[#F4B057]" />
        <div className="flex flex-1 flex-col items-center justify-center px-2">
          <p className="ipad:text-3xl mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white">
            <CountingNumber
              end={activeUsers}
              duration={1000}
              decimals={0}
              className="ipad:text-3xl mb-2 text-2xl font-bold text-[#0D2357] max-md:text-xl lg:text-4xl dark:text-white"
            />
          </p>
          <span className="text-center text-sm font-medium text-[#0D2357] lg:text-lg dark:text-white">
            Active Users
          </span>
        </div>
      </div>

      {/* Plan Breakdown */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  {planBreakdown.map((plan: any) => (
    <div key={plan._id} className="flex flex-col items-center rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-sm dark:border-[#F4B057] dark:bg-sidebar">
      <p className="text-lg font-medium text-[#0D2357] dark:text-white">{plan.planName}</p>
      <p className="text-2xl font-bold text-[#0D2357] dark:text-white">{plan.count}</p>
    </div>
  ))}
</div>
      {/* chart */}
      <div className="h-[350px] w-full sm:h-[400px]">
        {isEarningLoading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        ) : (
          <EarningChart data={earningChartData} />
        )}
      </div>

      {/* table  */}
      <h1 className="mt-12 mb-5 ml-2 text-2xl font-bold text-[#0D2357] dark:text-white">
        All Transactions
      </h1>

      <div className="dark:bg-sidebar rounded-lg border border-[#E2E8F0] bg-white shadow-sm dark:border-[#F4B057]">
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <h1 className="text-xl text-[#0D2357] dark:text-white">All transactions are here</h1>
            <div className="flex items-center gap-2">
              <label
                htmlFor="year-filter"
                className="text-sm font-medium text-[#0D2357] dark:text-white"
              >
                Year:
              </label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => handleYearChange(Number(e.target.value))}
                className="dark:bg-sidebar rounded-md border border-[#E2E8F0] bg-white px-3 py-1.5 text-sm text-[#0D2357] transition-colors hover:border-[#F4B057] focus:border-[#F4B057] focus:outline-none dark:border-[#F4B057] dark:text-white"
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E2E8F0] dark:border-[#F4B057]">
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Transaction ID
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Date
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Description
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-[#0D2357] dark:text-white">
                    Type
                  </th>
                  <th className="pb-3 text-right text-sm font-medium text-[#0D2357] dark:text-white">
                    Amount
                  </th>
                  <th className="pb-3 text-center text-sm font-medium text-[#0D2357] dark:text-white">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {isEarningLoading ? (
                  <tr>
                    <td colSpan={6} className="py-10 text-center">
                      <Loader2 className="text-primary mx-auto h-8 w-8 animate-spin" />
                    </td>
                  </tr>
                ) : (
                  currentTransactions.map((transaction: any) => (
                    <tr
                      key={transaction._id}
                      className="border-b border-[#E2E8F0] last:border-0 dark:border-[#F4B057]/30"
                    >
                      <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                        {transaction._id.slice(-8).toUpperCase()}
                      </td>
                      <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                        {transaction.description || "N/A"}
                      </td>
                      <td className="py-3 text-sm text-[#0D2357] dark:text-white">
                        {transaction.paymentType || "Sale"}
                      </td>
                      <td
                        className={`py-3 text-right text-sm font-medium ${
                          transaction.amount < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        ${Math.abs(transaction.amount).toLocaleString()}
                      </td>
                      <td className="py-3 text-center">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                            transaction.status === "succeeded" || transaction.status === "Completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col items-start justify-between gap-3 border-t border-[#E2E8F0] pt-4 sm:flex-row sm:items-center dark:border-[#F4B057]/30">
            <div className="text-sm text-[#0D2357] dark:text-white">
              Showing {filteredTransactions.length > 0 ? filteredStartIndex + 1 : 0} to{" "}
              {Math.min(filteredEndIndex, filteredTransactions.length)} of {filteredTransactions.length}{" "}
              transactions
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="dark:bg-sidebar flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: filteredTotalPages }, (_, i) => i + 1).map((page) => (
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, filteredTotalPages))}
                disabled={currentPage === filteredTotalPages}
                className="dark:bg-sidebar flex h-8 w-8 items-center justify-center rounded border border-[#E2E8F0] bg-white text-[#0D2357] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#F4B057] dark:text-white dark:hover:bg-[#F4B057]/10"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
