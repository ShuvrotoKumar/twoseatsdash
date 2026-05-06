"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllNotificationQuery } from "../../../redux/api/notificationApi";
import { formatDistanceToNow } from "date-fns";

const Notifications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: apiResponse, isLoading } = useGetAllNotificationQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const notifications = apiResponse?.notifications || [];
  const totalPages = apiResponse?.totalPages || 1;
  const totalItems = apiResponse?.total || 0;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (isLoading && currentPage === 1) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-h-[86vh] overflow-y-auto px-4 pb-4 sm:px-0">
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-xl font-semibold sm:text-2xl">Notifications</h2>
        <Button
          variant="ghost"
          size="sm"
          className="w-full border border-transparent sm:w-auto dark:border-[#746450]"
        >
          Notifications ({totalItems})
        </Button>
      </div>

      {notifications.length > 0 ? (
        <>
          <div className="relative space-y-3">
            {isLoading && (
              <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px]">
                <Loader2 className="text-primary h-8 w-8 animate-spin" />
              </div>
            )}
            {notifications.map((notification: any) => (
              <div
                key={notification._id}
                className="bg-card text-card-foreground relative rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md dark:border-[#746450]"
              >
                <div className="flex gap-3 sm:gap-4">
                  {notification.avatar ? (
                    <img
                      src={notification.avatar}
                      alt="Avatar"
                      className="h-10 w-10 flex-shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
                    />
                  ) : (
                    <div className="bg-primary/10 text-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold sm:h-12 sm:w-12">
                      {notification.title
                        ? notification.title
                            .split(" ")
                            .map((s: string) => s[0])
                            .slice(0, 2)
                            .join("")
                        : "N"}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold sm:text-base sm:whitespace-normal">
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="bg-primary h-2 w-2 flex-shrink-0 rounded-full" />
                      )}
                    </div>
                    {notification.message && (
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-sm sm:line-clamp-none">
                        {notification.message}
                      </p>
                    )}
                    <p className="text-muted-foreground mt-2 text-xs">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-card border-border mt-4 rounded-lg border p-4">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="text-muted-foreground text-sm">
                  Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems}{" "}
                  notifications
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-8"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="ml-1 hidden sm:inline">Previous</span>
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="h-8 w-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="h-8"
                  >
                    <span className="mr-1 hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20">
          <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20">
            <span className="text-3xl sm:text-4xl">🔔</span>
          </div>
          <p className="text-muted-foreground text-center text-sm sm:text-base">
            No notifications yet
          </p>
          <p className="text-muted-foreground mt-1 text-center text-xs sm:text-sm">
            You're all caught up!
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
