"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Search, Edit, MoreHorizontal, Users, UserCheck, UserX, Shield } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { getUsers, updateUser } from "@/services/userService"
import Link from "next/link"

export default function UserManagementPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: "",
    department: "",
    password: "",
  })
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [editFullname, setEditFullname] = useState("")
  const [editLoading, setEditLoading] = useState(false)
  const [editError, setEditError] = useState<string | null>(null)
  const [editSuccess, setEditSuccess] = useState(false)

  // Redirect if not admin
  if (user?.role !== "Admin") {
    router.push("/dashboard")
    return null
  }

  // ใน useEffect: mapping ข้อมูลจาก API
  useEffect(() => {
    setLoading(true)
    setError(null)
    getUsers()
      .then((data) => {
        // Map API fields to UI fields
        const mapped =
          Array.isArray(data)
            ? data.map((u: any) => ({
                id: u.id ?? u.userId ?? u.Id ?? u.UserId ?? u._id ?? Math.random().toString(),
                username: u.username ?? u.userName ?? u.Username ?? "",
                // เพิ่ม fullname และ fullName ใน mapping
                fullname: u.fullname ?? u.fullName ?? ((u.firstName || u.firstname || "") + (u.lastName || u.lastname ? " " + (u.lastName || u.lastname) : "")),
                email: u.email ?? u.Email ?? "",
                role: u.role ?? u.Role ?? "",
                department: u.department ?? u.Department ?? "",
                status: u.status ?? u.Status ?? "",
                lastLogin: u.lastLogin ?? u.LastLogin ?? u.last_login ?? "",
                createdDate: u.createdDate ?? u.CreatedDate ?? "",
              }))
            : []
        setUsers(mapped)
        if (!Array.isArray(mapped) || mapped.length === 0) {
          setError("ไม่สามารถดึงข้อมูลผู้ใช้ได้ หรือไม่มีข้อมูล")
        }
      })
      .catch(() => setError("เกิดข้อผิดพลาดในการเชื่อมต่อ API"))
      .finally(() => setLoading(false))
  }, [])

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleCreateUser = () => {
    console.log("Creating user:", newUser)
    setIsCreateDialogOpen(false)
    setNewUser({ username: "", email: "", role: "", department: "", password: "" })
  }

  const getStatusBadgeVariant = (status: string) => {
    return status === "Active" ? "default" : "secondary"
  }

  const getRoleBadgeVariant = (role: string) => {
    return role === "Admin" ? "destructive" : "outline"
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / pageSize)
  const pagedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // ดึงชื่อ field ทั้งหมดจาก object แรกใน users (ถ้ามี) และลบ field ที่ไม่ต้องการ
  let userFields = users.length > 0
    ? Object.keys(users[0]).filter(
        (f) =>
          f !== "department" &&
          f !== "status" &&
          f.toLowerCase() !== "lastlogin" &&
          f.toLowerCase() !== "fullname" && // ลบ fullname เดิมออกจาก fields
          f.toLowerCase() !== "fullName"
      )
    : []

  // แทรก Fullname หลัง username (แค่ 1 column)
  const fullnameCol = "Fullname"
  const usernameIdx = userFields.indexOf("username")
  if (usernameIdx !== -1) {
    userFields = [
      ...userFields.slice(0, usernameIdx + 1),
      fullnameCol,
      ...userFields.slice(usernameIdx + 1),
    ]
  } else {
    userFields = [fullnameCol, ...userFields]
  }

  // Update userStats to show real total users and administrators
  const totalUsers = users.length
  const totalAdmins = users.filter(
    u => (u.role ?? u.Role ?? "").toLowerCase() === "admin" || (u.role ?? u.Role ?? "").toLowerCase() === "administrator"
  ).length
  const userStats = [
    { label: "Total Users", value: totalUsers, icon: Users, color: "text-blue-600" },
    { label: "Active Users", value: 2, icon: UserCheck, color: "text-green-600" },
    { label: "Administrators", value: totalAdmins, icon: Shield, color: "text-purple-600" },
    { label: "Inactive Users", value: 0, icon: UserX, color: "text-red-600" },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage users and system access permissions</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>Add a new user to the PDPA system</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Department User">Department User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="department" className="text-right">
                  Department
                </Label>
                <Select onValueChange={(value) => setNewUser({ ...newUser, department: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateUser}>
                Create User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {userStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>Manage system users and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    {userFields.map((field) => (
                      <TableHead key={field}>{field}</TableHead>
                    ))}
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedUsers.map((user, idx) => {
                    const globalIdx = (currentPage - 1) * pageSize + idx
                    const isEditing = editIdx === globalIdx
                    return (
                      <TableRow key={user.id || idx}>
                        {userFields.map((field) => (
                          <TableCell key={field}>
                            {field === "Fullname" ? (
                              isEditing ? (
                                <Input
                                  value={editFullname}
                                  onChange={e => setEditFullname(e.target.value)}
                                  disabled={editLoading}
                                  className="w-40"
                                />
                              ) : (
                                // แสดง fullname เดียว
                                user.fullname ||
                                user.fullName ||
                                [
                                  user.firstName || user.firstname || "",
                                  user.lastName || user.lastname || ""
                                ].filter(Boolean).join(" ") ||
                                "-"
                              )
                            ) : (
                              typeof user[field] === "object" && user[field] !== null
                                ? JSON.stringify(user[field])
                                : String(user[field] ?? "")
                            )}
                          </TableCell>
                        ))}
                        <TableCell>
                          {isEditing ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={editLoading}
                                onClick={async () => {
                                  setEditLoading(true)
                                  setEditError(null)
                                  setEditSuccess(false)
                                  const result = await updateUser({
                                    username: user.username,
                                    fullName: editFullname,
                                    email: user.email,
                                    role: user.role,
                                    password: "",
                                  })
                                  setEditLoading(false)
                                  if (result.success) {
                                    // อัปเดต state users
                                    setUsers(prev =>
                                      prev.map((u, i) =>
                                        i === globalIdx ? { ...u, fullname: editFullname } : u
                                      )
                                    )
                                    setEditIdx(null)
                                    setEditSuccess(true)
                                    setTimeout(() => setEditSuccess(false), 1200)
                                  } else {
                                    setEditError("Update failed")
                                  }
                                }}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={editLoading}
                                onClick={() => {
                                  setEditIdx(null)
                                  setEditError(null)
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setEditIdx(globalIdx)
                                setEditFullname(user.fullname || "")
                                setEditError(null)
                              }}
                            >
                              <Edit className="w-4 h-4 mr-1 inline" />
                              Edit
                            </Button>
                          )}
                          {isEditing && editError && (
                            <div className="text-red-500 text-xs mt-1">{editError}</div>
                          )}
                          {isEditing && editSuccess && (
                            <div className="text-green-600 text-xs mt-1">Update Success</div>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
              {/* Pagination Controls */}
              <div className="flex justify-between items-center mt-4">
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
