"use client";
import RecentUser from "@/components/RecentUser";
import { UserRatio } from "@/components/UserRatio";
import { Calendar } from "@/components/ui/calendar";
import { CountingNumber } from "@/components/ui/CountingNumber";
import { useGetAllDashboardQuery } from "../../redux/api/dashboardApi";
import { Loader2 } from "lucide-react";
import React from "react";

const Dashbaord = () => {
  const { data: apiResponse, isLoading } = useGetAllDashboardQuery({});
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const totals = apiResponse?.data?.totals || { consumer: 0, serviceProvider: 0 };
  const recentUsers = apiResponse?.data?.recentUsers || [];
  const userRatioData = apiResponse?.data?.userRatio?.data || [];

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="text-primary h-10 w-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="px-4 sm:px-0">
      {/* upper 2 blocks */}
      <div
        className="bg-sidebar flex w-full items-center justify-center rounded-lg border border-[#E2E8F0] py-4 shadow-sm sm:py-6 dark:border-[#F4B057]"
        style={{ minHeight: "110px" }}
      >
        <div className="flex flex-1 flex-col items-center justify-center px-2">
          <p className="mb-1 text-xl font-bold text-[#0D2357] sm:mb-2 sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
            <CountingNumber
              end={totals.consumer}
              duration={1000}
              decimals={0}
              className="mb-1 text-xl font-bold text-[#0D2357] sm:mb-2 sm:text-2xl md:text-3xl lg:text-4xl dark:text-white"
            />
          </p>
          <span className="text-center text-xs font-medium text-[#0D2357] sm:text-sm md:text-base lg:text-lg dark:text-white">
            Total Distributor
          </span>
        </div>
        <div className="mx-3 h-12 w-px bg-[#ff0a17] sm:mx-4 sm:h-14 md:mx-6 md:h-16 lg:mx-8" />
        <div className="flex flex-1 flex-col items-center justify-center px-2">
          <p className="mb-1 text-xl font-bold text-[#0D2357] sm:mb-2 sm:text-2xl md:text-3xl lg:text-4xl dark:text-white">
            <CountingNumber
              end={totals.serviceProvider}
              duration={1000}
              decimals={0}
              className="mb-1 text-xl font-bold text-[#0D2357] sm:mb-2 sm:text-2xl md:text-3xl lg:text-4xl dark:text-white"
            />
          </p>
          <span className="text-center text-xs font-medium text-[#0D2357] sm:text-sm md:text-base lg:text-lg dark:text-white">
            Total Employer
          </span>
        </div>
      </div>

      {/* user ratio and calendar side-by-side */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
        {/* Chart: flexible column */}
        <div className="h-[350px] w-full sm:h-[400px]">
          <UserRatio data={userRatioData} />
        </div>

        {/* Calendar: narrower column and padded card */}
        <div className="flex justify-center lg:justify-start">
          <div className="h-[350px] w-full sm:h-[400px] sm:w-[320px]">
            <div className="border-border bg-card h-full w-full overflow-hidden rounded-lg border p-3 sm:p-5 dark:border-[#F4B057]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="bg-sidebar h-full w-full rounded-lg border"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <RecentUser users={recentUsers} />
      </div>
    </div>
  );
};

export default Dashbaord;
