"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Download, History } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from API
const mockLogDetails = {
  "LOG-001": {
    id: "LOG-001",
    eventType: "Data Access",
    performedBy: "Somchai Jaidee",
    department: "HR",
    linkedRopa: "RPA-001",
    timestamp: "2024-01-15 09:30:00",
    status: "Completed",
    priority: "Normal",
    description: "Accessed employee personal data for monthly payroll processing",
    eventDate: "2024-01-15",
    eventTime: "09:30:00",
    eventLocation: "HR Office, 3rd Floor",
    reportedBy: "Somchai Jaidee",
    reportedDate: "2024-01-15",
    dataSubjects: "Employees (50 records)",
    dataTypes: "Personal identifiers, Employment data, Financial data",
    processingPurpose: "Monthly payroll calculation and processing",
    riskLevel: "Low",
    immediateActions: ["Verified access authorization", "Logged activity"],
    correctiveActions: "None required - routine authorized access",
    preventiveActions: "Continue regular access monitoring",
    responsiblePerson: "Niran Suksan (HR Manager)",
    targetDate: "N/A",
    followUpRequired: "No",
  },
  "LOG-002": {
    id: "LOG-002",
    eventType: "Data Breach",
    performedBy: "System Alert",
    department: "IT",
    linkedRopa: "RPA-002",
    timestamp: "2024-01-14 14:22:00",
    status: "Under Investigation",
    priority: "High",
    description: "Unauthorized access attempt detected on customer database",
    eventDate: "2024-01-14",
    eventTime: "14:22:00",
    eventLocation: "Server Room - Database Server",
    reportedBy: "Security Monitoring System",
    reportedDate: "2024-01-14",
    dataSubjects: "Customers (potential exposure: 1,200 records)",
    dataTypes: "Personal identifiers, Contact information, Transaction history",
    processingPurpose: "Unauthorized access attempt",
    riskLevel: "High",
    immediateActions: ["System locked down", "Security team notified", "Access logs preserved"],
    correctiveActions:
      "Investigating source of breach, reviewing access controls, preparing notification to authorities",
    preventiveActions: "Enhanced monitoring, additional security layers, staff security training",
    responsiblePerson: "Kittisak Pongpan (IT Security Manager)",
    targetDate: "2024-01-21",
    followUpRequired: "Yes",
  },
}

export default function LogDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const logData = mockLogDetails[id as keyof typeof mockLogDetails]

  if (!logData) {
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
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/logs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Activity Logs
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Activity Log Details</h1>
            <p className="text-muted-foreground">Log ID: {logData.id}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <History className="w-4 h-4 mr-2" />
              View Timeline
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Link href={`/logs/${id}/edit`}>
              <Button size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Log
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Event Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Event Information
                <div className="flex gap-2">
                  <Badge variant={getStatusBadgeVariant(logData.status)}>{logData.status}</Badge>
                  <Badge variant={getPriorityBadgeVariant(logData.priority)}>{logData.priority} Priority</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Event Type</label>
                    <p className="text-lg font-semibold">{logData.eventType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Performed By</label>
                    <p>{logData.performedBy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department</label>
                    <p>{logData.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Linked RoPA</label>
                    <Link href={`/ropa/${logData.linkedRopa}`} className="text-blue-600 hover:underline font-medium">
                      {logData.linkedRopa}
                    </Link>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Event Date & Time</label>
                    <p>
                      {logData.eventDate} at {logData.eventTime}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Event Location</label>
                    <p>{logData.eventLocation}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Reported By</label>
                    <p>{logData.reportedBy}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Reported Date</label>
                    <p>{logData.reportedDate}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="mt-1 text-gray-900">{logData.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Data Processing Details */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{logData.dataSubjects}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Types</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{logData.dataTypes}</p>
              </CardContent>
            </Card>
          </div>

          {/* Processing Context */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Context</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Processing Purpose</label>
                  <p className="mt-1">{logData.processingPurpose}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Risk Level</label>
                  <p className="mt-1">{logData.riskLevel}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Taken */}
          <Card>
            <CardHeader>
              <CardTitle>Actions and Follow-up</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Immediate Actions</label>
                  <ul className="mt-2 list-disc list-inside space-y-1">
                    {logData.immediateActions.map((action, index) => (
                      <li key={index} className="text-gray-900">
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Corrective Actions</label>
                    <p className="mt-1">{logData.correctiveActions}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Preventive Actions</label>
                    <p className="mt-1">{logData.preventiveActions}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Responsible Person</label>
                    <p className="mt-1">{logData.responsiblePerson}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Target Date</label>
                    <p className="mt-1">{logData.targetDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Follow-up Required</label>
                    <Badge variant={logData.followUpRequired === "Yes" ? "destructive" : "secondary"}>
                      {logData.followUpRequired}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
