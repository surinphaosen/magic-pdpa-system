"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Edit, MoreHorizontal, Calendar } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

const mockLogData = [
  {
    id: "LOG-001",
    eventType: "Data Access",
    performedBy: "Somchai Jaidee",
    department: "HR",
    linkedRopa: "RPA-001",
    timestamp: "2024-01-15 09:30:00",
    status: "Completed",
    priority: "Normal",
    description: "Accessed employee personal data for monthly payroll processing",
  },
  {
    id: "LOG-002",
    eventType: "Data Breach",
    performedBy: "System Alert",
    department: "IT",
    linkedRopa: "RPA-002",
    timestamp: "2024-01-14 14:22:00",
    status: "Under Investigation",
    priority: "High",
    description: "Unauthorized access attempt detected on customer database",
  },
  {
    id: "LOG-003",
    eventType: "Consent Withdrawal",
    performedBy: "Marketing System",
    department: "Marketing",
    linkedRopa: "RPA-003",
    timestamp: "2024-01-14 11:15:00",
    status: "Processed",
    priority: "Normal",
    description: "Customer withdrew consent for marketing communications",
  },
]

export default function LogsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [eventTypeFilter, setEventTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = mockLogData.filter((item) => {
    const matchesSearch =
      item.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.performedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEventType = eventTypeFilter === "all" || item.eventType === eventTypeFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesUserDepartment = user?.role === "Admin" || user?.department === item.department

    return matchesSearch && matchesEventType && matchesStatus && matchesUserDepartment
  })

  const handleViewDetails = (id: string) => {
    router.push(`/logs/${id}`)
  }

  const handleEdit = (id: string) => {
    router.push(`/logs/${id}/edit`)
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Completed":
        return "default"
      case "Processed":
        return "secondary"
      case "Under Investigation":
        return "destructive"
      case "Pending":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Normal":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
          <p className="text-muted-foreground">Track and manage data processing activities</p>
        </div>
        <Link href="/logs/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Log
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activity logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Data Access">Data Access</SelectItem>
                <SelectItem value="Data Breach">Data Breach</SelectItem>
                <SelectItem value="Consent Withdrawal">Consent Withdrawal</SelectItem>
                <SelectItem value="Data Request">Data Request</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Processed">Processed</SelectItem>
                <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Activity Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Logs ({filteredData.length})</CardTitle>
          <CardDescription>Monitor data processing activities and events</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Event Type</TableHead>
                <TableHead>Performed By</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Linked RoPA</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.eventType}</TableCell>
                  <TableCell>{item.performedBy}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>
                    <Link href={`/ropa/${item.linkedRopa}`} className="text-blue-600 hover:underline">
                      {item.linkedRopa}
                    </Link>
                  </TableCell>
                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(item.priority)}>{item.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(item.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(item.id)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
