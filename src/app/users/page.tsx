"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Eye, Ban, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlockedUsersModal from "./BlockedUsersModal";
import UserDetailsModal from "./UserDetailsModal";
import BlockUserModal from "../admins/BlockUserModal";
import { useGetAllUserQuery, useUpdateUserMutation, useDeleteUserMutation } from "../../../redux/api/userApi";
import { imageUrl } from "../../../config/envConfig";


const seedUsers = [
  {
    id: "1",
    name: "John Doe",
    phone: "123-456-7890",
    joinedAt: "2023-01-01",
    email: "jdfkfdsaf@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "987-654-3210",
    joinedAt: "2023-02-15",
    email: "janesmith@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: "3",
    name: "Robert Brown",
    phone: "555-123-4567",
    joinedAt: "2023-03-10",
    email: "robertbrown@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  },
  {
    id: "4",
    name: "Emily Clark",
    phone: "444-555-6666",
    joinedAt: "2023-04-20",
    email: "emilyclark@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
  },
  {
    id: "5",
    name: "Michael Johnson",
    phone: "222-333-4444",
    joinedAt: "2023-05-30",
    email: "michaeljohnson@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "6",
    name: "Sarah Williams",
    phone: "333-444-5555",
    joinedAt: "2023-06-15",
    email: "sarahwilliams@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "7",
    name: "David Lee",
    phone: "666-777-8888",
    joinedAt: "2023-07-25",
    email: "davidlee@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
];

function UsersTable({
  users,
  onViewUser,
  onBlockUser,
  startIndex,
}: {
  users: any[];
  onViewUser: (user: any) => void;
  onBlockUser: (user: any) => void;
  startIndex: number;
}) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="bg-card border-border hidden overflow-hidden rounded-b-lg border shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  No
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  User Name
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Phone Number
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Joined Date
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Email
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {users.map((u, idx) => (
                <tr key={u.id} className="hover:bg-muted/30 transition-colors">
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={u.image?.startsWith("http") ? u.image : `${imageUrl}${u.image}`}
                          alt={u.name}
                        />
                        <AvatarFallback>
                          {u.name
                            ? u.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground text-sm font-medium">{u.userName || "N/A"}</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {u.phone || "N/A"}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {u.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                        onClick={() => onBlockUser(u)}
                        title="Block User"
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                        onClick={() => onViewUser(u)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="space-y-3 p-4 md:hidden">
        {users.map((u, idx) => (
          <div key={u.id} className="bg-card border-border space-y-3 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage
                    src={u.image?.startsWith("http") ? u.image : `${imageUrl}${u.image}`}
                    alt={u.name}
                  />
                  <AvatarFallback>
                    {u.name
                      ? u.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="text-foreground truncate font-semibold">{u.userName || "N/A"}</h3>
                  <p className="text-muted-foreground text-xs">#{startIndex + idx + 1}</p>
                </div>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                  onClick={() => onBlockUser(u)}
                  title="Block User"
                >
                  <Ban className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                  onClick={() => onViewUser(u)}
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground ml-2 truncate">{u.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="text-foreground">{u.phone || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined:</span>
                <span className="text-foreground">
                  {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

type User = (typeof seedUsers)[0];

export default function UsersPage() {
  const [query, setQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"clients" | "providers">("clients");
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);
  const [blockUser, setBlockUser] = React.useState<any | null>(null);
  const [showBlockedUsers, setShowBlockedUsers] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // API query
  const { data: apiResponse, isLoading } = useGetAllUserQuery({
    role: activeTab === "clients" ? "consumer" : "serviceProvider",
    searchTerm: query,
    page: currentPage,
    limit: itemsPerPage,
  });

  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Safeguard: Filter data client-side as well in case the API returns mixed results
  const allUsers = apiResponse?.data || [];
  const users = allUsers.filter((u: any) => 
    activeTab === "clients" ? u.role === "consumer" : u.role === "serviceProvider"
  );
  
  const meta = apiResponse?.meta || { totalUsers: 0, currentPage: 1, limit: 10 };

  // For now, we'll keep a local state for blocked users to demonstrate the modal
  // In a real scenario, this would also be an API call
  const [blockedUsers, setBlockedUsers] = React.useState<any[]>([]);

  const totalPages = Math.ceil(meta.totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [query, activeTab]);

  async function handleBlockConfirm() {
    if (blockUser) {
      try {
        await updateUser(blockUser._id).unwrap();
        // Add to local blocked list for UI demonstration
        setBlockedUsers((prev) => [...prev, blockUser]);
        setBlockUser(null);
      } catch (err) {
        console.error("Failed to block user:", err);
      }
    }
  }

  async function handleUnblock(id: string) {
    try {
      await updateUser(id).unwrap(); // Assuming toggle or similar
      setBlockedUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to unblock user:", err);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteUser(id).unwrap();
      setBlockedUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  }



  return (
    <div className="bg-background min-h-screen">
      {/* Top header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">User List</h2>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search User"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-background text-foreground border-primary-foreground/20 w-full pl-9"
              />
            </div>
            <Button
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 whitespace-nowrap"
              onClick={() => setShowBlockedUsers(true)}
            >
              Blocked ({blockedUsers.length})
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs and controls */}
      <div className="bg-card border-border border-b p-4">
        <div className="flex items-center gap-2 overflow-x-auto sm:gap-3">
          <Button
            variant={activeTab === "clients" ? "default" : "outline"}
            onClick={() => setActiveTab("clients")}
            className="px-4 whitespace-nowrap sm:px-6"
          >
            Clients
          </Button>
          <Button
            variant={activeTab === "providers" ? "default" : "outline"}
            onClick={() => setActiveTab("providers")}
            className="px-4 whitespace-nowrap sm:px-6"
          >
            Providers
          </Button>
        </div>
      </div>

      {/* Table area */}
      <div className="relative">
        {isLoading && (
          <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        )}
        <UsersTable
          users={users}
          onViewUser={setSelectedUser}
          onBlockUser={setBlockUser}
          startIndex={startIndex}
        />
        {!isLoading && users.length === 0 && (
          <div className="text-muted-foreground border-border flex h-60 items-center justify-center border-x border-b bg-card">
            No users found
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-card border-border rounded-b-lg border-t p-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-muted-foreground text-sm">
              Showing {startIndex + 1} to {Math.min(startIndex + users.length, meta.totalUsers)} of{" "}
              {meta.totalUsers} users
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

      {/* View User Modal */}
      <UserDetailsModal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={
          selectedUser
            ? {
                id: selectedUser._id,
                name: selectedUser.userName || "N/A",
                email: selectedUser.email,
                phone: selectedUser.phone || "N/A",
                joinedAt: selectedUser.createdAt
                  ? new Date(selectedUser.createdAt).toLocaleDateString()
                  : "N/A",
                avatar: selectedUser.image?.startsWith("http")
                  ? selectedUser.image
                  : `${imageUrl}${selectedUser.image}`,
                userType: selectedUser.role,
              }
            : null
        }
        onBlock={() => {
          if (selectedUser) {
            setBlockUser(selectedUser);
            setSelectedUser(null);
          }
        }}
      />

      {/* Block User Modal */}
      <BlockUserModal
        open={!!blockUser}
        onClose={() => setBlockUser(null)}
        user={blockUser}
        onConfirm={handleBlockConfirm}
      />

      {/* Blocked Users Modal */}
      <BlockedUsersModal
        open={showBlockedUsers}
        onClose={() => setShowBlockedUsers(false)}
        blockedUsers={blockedUsers.map((u) => ({
          id: u._id,
          name: u.userName || "N/A",
          email: u.email,
          phone: u.phone || "N/A",
          joinedAt: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A",
          avatar: u.image?.startsWith("http") ? u.image : `${imageUrl}${u.image}`,
        }))}
        onUnblock={handleUnblock}
        onDelete={handleDelete}
      />
    </div>
  );
}
