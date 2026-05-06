"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Eye, Trash2, ChevronLeft, ChevronRight, Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BlockedUsersModal from "../users/BlockedUsersModal";
import UserDetailsModal from "../users/UserDetailsModal";
import DeleteAdminModal from "./DeleteAdminModal";
import CreateAdminModal from "./CreateAdminModal";
import EditAdminModal from "./EditAdminModal";
import { useGetAllAdminsQuery, useUpdateAdminMutation, useDeleteUserMutation } from "../../../redux/api/adminApi";
import { imageUrl } from "../../../config/envConfig";

const seedAdmins = [
  {
    id: "1",
    name: "Admin John",
    phone: "123-456-7890",
    joinedAt: "2023-01-01",
    email: "admin.john@gmail.com",
    role: "Super Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminJohn",
  },
  {
    id: "2",
    name: "Admin Jane",
    phone: "987-654-3210",
    joinedAt: "2023-02-15",
    email: "admin.jane@email.com",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminJane",
  },
  {
    id: "3",
    name: "Admin Robert",
    phone: "555-123-4567",
    joinedAt: "2023-03-10",
    email: "admin.robert@email.com",
    role: "Editor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminRobert",
  },
  {
    id: "4",
    name: "Admin Emily",
    phone: "444-555-6666",
    joinedAt: "2023-04-20",
    email: "admin.emily@email.com",
    role: "Moderator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminEmily",
  },
  {
    id: "5",
    name: "Admin Michael",
    phone: "222-333-4444",
    joinedAt: "2023-05-30",
    email: "admin.michael@email.com",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminMichael",
  },
  {
    id: "6",
    name: "Admin Sarah",
    phone: "333-444-5555",
    joinedAt: "2023-06-15",
    email: "admin.sarah@email.com",
    role: "Editor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminSarah",
  },
  {
    id: "7",
    name: "Admin David",
    phone: "666-777-8888",
    joinedAt: "2023-07-25",
    email: "admin.david@email.com",
    role: "Moderator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminDavid",
  },
  {
    id: "8",
    name: "Admin Lisa",
    phone: "777-888-9999",
    joinedAt: "2023-08-10",
    email: "admin.lisa@email.com",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminLisa",
  },
  {
    id: "9",
    name: "Admin Tom",
    phone: "888-999-0000",
    joinedAt: "2023-09-05",
    email: "admin.tom@email.com",
    role: "Editor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminTom",
  },
  {
    id: "10",
    name: "Admin Anna",
    phone: "999-000-1111",
    joinedAt: "2023-10-20",
    email: "admin.anna@email.com",
    role: "Moderator",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminAnna",
  },
  {
    id: "11",
    name: "Admin Chris",
    phone: "111-222-3333",
    joinedAt: "2023-11-12",
    email: "admin.chris@email.com",
    role: "Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminChris",
  },
  {
    id: "12",
    name: "Admin Maria",
    phone: "222-333-4444",
    joinedAt: "2023-12-01",
    email: "admin.maria@email.com",
    role: "Editor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AdminMaria",
  },
];

function AdminsTable({
  admins,
  onViewAdmin,
  onDeleteAdmin,
  onEditAdmin,
  startIndex,
}: {
  admins: any[];
  onViewAdmin: (admin: any) => void;
  onDeleteAdmin: (admin: any) => void;
  onEditAdmin: (admin: any) => void;
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
                  Admin Name
                </th>
                <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                  Role
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
              {admins.map((a, idx) => (
                <tr key={a.id} className="hover:bg-muted/30 transition-colors">
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {startIndex + idx + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={a.image?.startsWith("http") ? a.image : `${imageUrl}${a.image}`}
                          alt={a.name}
                        />
                        <AvatarFallback>
                          {a.name
                            ? a.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                            : "A"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground text-sm font-medium">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-secondary text-secondary-foreground rounded px-2 py-1 text-xs font-medium">
                      {a.role}
                    </span>
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {a.phone || "N/A"}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="text-muted-foreground px-6 py-4 text-sm whitespace-nowrap">
                    {a.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                        onClick={() => onEditAdmin(a)}
                        title="Edit Admin"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                        onClick={() => onDeleteAdmin(a)}
                        title="Delete Admin"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                        onClick={() => onViewAdmin(a)}
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
        {admins.map((a, idx) => (
          <div key={a.id} className="bg-card border-border space-y-3 rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage
                    src={a.image?.startsWith("http") ? a.image : `${imageUrl}${a.image}`}
                    alt={a.name}
                  />
                  <AvatarFallback>
                    {a.name
                      ? a.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="text-foreground truncate font-semibold">{a.name}</h3>
                  <p className="text-muted-foreground text-xs">#{startIndex + idx + 1}</p>
                </div>
              </div>
              <div className="flex flex-shrink-0 gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                  onClick={() => onEditAdmin(a)}
                  title="Edit Admin"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                  onClick={() => onDeleteAdmin(a)}
                  title="Delete Admin"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary hover:bg-primary/10 h-8 w-8"
                  onClick={() => onViewAdmin(a)}
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Role:</span>
                <span className="bg-secondary text-secondary-foreground rounded px-2 py-0.5 text-xs font-medium">
                  {a.role}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="text-foreground ml-2 truncate">{a.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="text-foreground">{a.phone || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined:</span>
                <span className="text-foreground">
                  {a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

type Admin = (typeof seedAdmins)[0];

export default function AdminsPage() {
  const [query, setQuery] = React.useState("");
  const [selectedAdmin, setSelectedAdmin] = React.useState<any | null>(null);
  const [deleteAdmin, setDeleteAdmin] = React.useState<any | null>(null);
  const [editingAdmin, setEditingAdmin] = React.useState<any | null>(null);
  const [showCreateAdmin, setShowCreateAdmin] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  // API query
  const { data: apiResponse, isLoading } = useGetAllAdminsQuery({
    searchTerm: query,
    page: currentPage,
    limit: itemsPerPage,
  });

  const [updateAdmin] = useUpdateAdminMutation();
  const [deleteAdminMutation, { isLoading: isDeleting }] = useDeleteUserMutation();

  const admins = apiResponse?.data || [];
  const meta = apiResponse?.meta || { totalUsers: 0, currentPage: 1, limit: 10 };

  const totalPages = Math.ceil((meta.totalUsers || admins.length) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  React.useEffect(() => {
    setCurrentPage(1);
  }, [query]);


  async function handleDeleteConfirm() {
    if (deleteAdmin) {
      try {
        await deleteAdminMutation(deleteAdmin._id).unwrap();
        setDeleteAdmin(null);
      } catch (err) {
        console.error("Failed to delete admin:", err);
      }
    }
  }



  function handleUpdateAdmin(updatedAdmin: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  }) {
    if (editingAdmin) {
      setAdmins((prev) =>
        prev.map((a) => (a.id === editingAdmin.id ? { ...a, ...updatedAdmin } : a)),
      );
      setEditingAdmin(null);
    }
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Top header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Admin List</h2>
          </div>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <div className="relative w-full sm:w-64">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                placeholder="Search Admin"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-background text-foreground border-primary-foreground/20 w-full pl-9"
              />
            </div>
            <Button
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 whitespace-nowrap"
              onClick={() => setShowCreateAdmin(true)}
            >
              Create Admin
            </Button>
          </div>
        </div>
      </div>

      {/* Table area */}
      <div className="relative">
        {isLoading && (
          <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-[1px]">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
          </div>
        )}
        <AdminsTable
          admins={admins}
          onViewAdmin={setSelectedAdmin}
          onDeleteAdmin={setDeleteAdmin}
          onEditAdmin={setEditingAdmin}
          startIndex={startIndex}
        />
        {!isLoading && admins.length === 0 && (
          <div className="text-muted-foreground border-border flex h-60 items-center justify-center border-x border-b bg-card">
            No admins found
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-card border-border rounded-b-lg border-t p-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-muted-foreground text-sm">
              Showing {startIndex + 1} to {Math.min(startIndex + admins.length, meta.totalUsers || admins.length)} of{" "}
              {meta.totalUsers || admins.length} admins
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

      {/* View Admin Modal */}
      <UserDetailsModal
        open={!!selectedAdmin}
        onClose={() => setSelectedAdmin(null)}
        user={
          selectedAdmin
            ? {
                id: selectedAdmin._id,
                name: selectedAdmin.name,
                email: selectedAdmin.email,
                phone: selectedAdmin.phone || "N/A",
                joinedAt: selectedAdmin.createdAt
                  ? new Date(selectedAdmin.createdAt).toLocaleDateString()
                  : "N/A",
                avatar: selectedAdmin.image?.startsWith("http")
                  ? selectedAdmin.image
                  : `${imageUrl}${selectedAdmin.image}`,
                userType: selectedAdmin.role,
              }
            : null
        }
        onBlock={() => {
          if (selectedAdmin) {
            setDeleteAdmin(selectedAdmin);
            setSelectedAdmin(null);
          }
        }}
      />

      {/* Delete Admin Modal */}
      <DeleteAdminModal
        open={!!deleteAdmin}
        onClose={() => setDeleteAdmin(null)}
        admin={
          deleteAdmin
            ? {
                id: deleteAdmin._id,
                name: deleteAdmin.name,
                email: deleteAdmin.email,
                avatar: deleteAdmin.image?.startsWith("http")
                  ? deleteAdmin.image
                  : `${imageUrl}${deleteAdmin.image}`,
              }
            : null
        }
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
      />



      {/* Create Admin Modal */}
      <CreateAdminModal
        open={showCreateAdmin}
        onClose={() => setShowCreateAdmin(false)}
      />

      {/* Edit Admin Modal */}
      <EditAdminModal
        open={!!editingAdmin}
        onClose={() => setEditingAdmin(null)}
        onConfirm={handleUpdateAdmin}
        admin={
          editingAdmin
            ? {
                id: editingAdmin._id,
                name: editingAdmin.name,
                email: editingAdmin.email,
                role: editingAdmin.role,
                avatar: editingAdmin.image?.startsWith("http")
                  ? editingAdmin.image
                  : `${imageUrl}${editingAdmin.image}`,
              }
            : null
        }
      />
    </div>
  );
}
