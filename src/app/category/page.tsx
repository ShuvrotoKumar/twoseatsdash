"use client";

import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Eye, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllAddOnsQuery } from "../../../redux/api/categoryApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function ViewAddonModal({
  open,
  onClose,
  addon,
}: {
  open: boolean;
  onClose: () => void;
  addon: any | null;
}) {
  if (!addon) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-background sm:max-w-[500px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-bold">{addon.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="space-y-2">
            <h4 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Description</h4>
            <p className="text-foreground leading-relaxed">{addon.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Service Type</h4>
              <span className="bg-secondary text-secondary-foreground inline-block rounded-full px-3 py-1 text-sm font-medium">
                {addon.type}
              </span>
            </div>
            <div className="space-y-2">
              <h4 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Status</h4>
              <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                addon.status === "active" 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}>
                {addon.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-4">
            <div className="space-y-1">
              <h4 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Standard Price</h4>
              <p className="text-2xl font-bold text-primary">${addon.standardPrice}</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Founding Price</h4>
              <p className="text-2xl font-bold text-primary">
                {addon.foundingMemberPrice ? `$${addon.foundingMemberPrice}` : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AddonCards({
  addons,
  onView,
}: {
  addons: any[];
  onView: (addon: any) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {addons.map((item) => (
        <div 
          key={item._id} 
          className="bg-card group border-border hover:border-primary/50 relative flex flex-col justify-between overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
        >
          <div className="p-5">
            <div className="mb-4 flex items-start justify-between">
              <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-semibold">
                {item.type}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                item.status === "active" 
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              }`}>
                {item.status}
              </span>
            </div>
            
            <h3 className="text-foreground mb-2 line-clamp-1 text-lg font-bold group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <p className="text-muted-foreground mb-6 line-clamp-2 min-h-[40px] text-sm leading-relaxed">
              {item.description}
            </p>
            
            <div className="flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-muted-foreground text-[10px] font-medium uppercase tracking-wider">Price</p>
                <p className="text-xl font-bold text-primary">${item.standardPrice}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground h-9 gap-2 border-primary/20"
                onClick={() => onView(item)}
              >
                <Eye className="h-4 w-4" />
                View
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CategoryPage() {
  const [query, setQuery] = useState("");
  const [viewingAddon, setViewingAddon] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // API connection
  const { data: apiResponse, isLoading } = useGetAllAddOnsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const allAddons = apiResponse?.data || [];
  
  const filteredAddons = allAddons.filter((item: any) =>
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  const meta = apiResponse?.meta || { total: allAddons.length, page: 1, limit: itemsPerPage };
  const totalPages = Math.ceil((meta.total || filteredAddons.length) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  return (
    <div className="bg-background min-h-screen">
      {/* Top header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Extra Service List</h2>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search Service"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-background text-foreground border-primary-foreground/20 w-full pl-9"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cards area */}
      <div className="relative min-h-[400px]">
        {isLoading && (
          <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px]">
             <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        )}
        
        {!isLoading && filteredAddons.length > 0 ? (
          <AddonCards
            addons={filteredAddons}
            onView={setViewingAddon}
          />
        ) : !isLoading ? (
          <div className="text-muted-foreground border-border flex h-60 items-center justify-center border-x border-b bg-card">
            No services found
          </div>
        ) : null}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-card border-border rounded-b-lg border-t p-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-muted-foreground text-sm">
              Showing {startIndex + 1} to {Math.min(startIndex + filteredAddons.length, meta.total || filteredAddons.length)} of {meta.total || filteredAddons.length}{" "}
              services
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

      {/* View Details Modal */}
      <ViewAddonModal
        open={!!viewingAddon}
        onClose={() => setViewingAddon(null)}
        addon={viewingAddon}
      />
    </div>
  );
}
