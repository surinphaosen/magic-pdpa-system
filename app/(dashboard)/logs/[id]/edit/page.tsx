"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

// Mock data - in real app this would come from API
const mockLogDetails = {
  "LOG-001": {
    id: "LOG-001",
    eventType: "Data Access",
    eventDate: "2024-01-15",
    eventTime: "09:30:00",
    eventLocation: "HR Office, 3rd Floor",
    eventDescription: "Accessed employee personal data for monthly payroll processing",
    reportedBy: "Somchai Jaidee",
    reportedDate: "2024-01-15",
    performedBy: "Somchai Jaidee",
    department: "HR",
    linkedRopa: "RPA-001",
  },
}

export default function EditLogPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const originalData = mockLogDetails[id as keyof typeof mockLogDetails]
  const [formData, setFormData] = useState(
    originalData || {
      id: "",
      eventType: "",
      eventDate: "",
      eventTime: "",
      eventLocation: "",
      eventDescription: "",
      reportedBy: "",
      reportedDate: "",
      performedBy: "",
      department: "",
      linkedRopa: "",
    },
  )

  if (!originalData) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Activity Log Not Found</h1>
          <p className="text-gray-600 mb-6">The requested activity log could not be found.</p>
          <Link href="/logs">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Activity Logs
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    // Validate required fields
    if (!formData.eventType || !formData.eventDate || !formData.eventDescription || !formData.reportedBy) {
      toast.error("Please fill in all required fields")
      return
    }

    console.log("Saving activity log:", formData)
    toast.success("Activity log updated successfully!")
    router.push(`/logs/${id}`)
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/logs/${id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Details
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Edit Activity Log</h1>
            <p className="text-muted-foreground">Log ID: {formData.id}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/logs/${id}`}>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </Link>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Event Information */}
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
              <CardDescription>Update the basic event details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select
                    value={formData.eventType}
                    onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Data Access">Data Access</SelectItem>
                      <SelectItem value="Data Breach">Data Breach</SelectItem>
                      <SelectItem value="Consent Withdrawal">Consent Withdrawal</SelectItem>
                      <SelectItem value="Data Request">Data Request</SelectItem>
                      <SelectItem value="System Maintenance">System Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Event Date *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventTime">Event Time *</Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={formData.eventTime}
                    onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventLocation">Event Location</Label>
                  <Input
                    id="eventLocation"
                    value={formData.eventLocation}
                    onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventDescription">Event Description *</Label>
                <Textarea
                  id="eventDescription"
                  value={formData.eventDescription}
                  onChange={(e) => setFormData({ ...formData, eventDescription: e.target.value })}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Actor Information */}
          <Card>
            <CardHeader>
              <CardTitle>Actor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="performedBy">Performed By</Label>
                  <Input
                    id="performedBy"
                    value={formData.performedBy}
                    onChange={(e) => setFormData({ ...formData, performedBy: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => setFormData({ ...formData, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reporting Information */}
          <Card>
            <CardHeader>
              <CardTitle>Reporting Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportedBy">Reported By *</Label>
                  <Input
                    id="reportedBy"
                    value={formData.reportedBy}
                    onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportedDate">Reported Date</Label>
                  <Input
                    id="reportedDate"
                    type="date"
                    value={formData.reportedDate}
                    onChange={(e) => setFormData({ ...formData, reportedDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedRopa">Linked RoPA</Label>
                  <Select
                    value={formData.linkedRopa}
                    onValueChange={(value) => setFormData({ ...formData, linkedRopa: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select RoPA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RPA-001">RPA-001 - Employee Data Management</SelectItem>
                      <SelectItem value="RPA-002">RPA-002 - Customer Database</SelectItem>
                      <SelectItem value="RPA-003">RPA-003 - Visitor Log System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
