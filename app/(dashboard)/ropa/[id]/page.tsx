"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Download, History } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from API
const mockRopaDetails = {
  "RPA-001": {
    id: "RPA-001",
    name: "Employee Data Management",
    department: "HR",
    purpose: "Payroll Processing and Employee Management",
    status: "Active",
    riskLevel: "Medium",
    lastUpdated: "2024-01-10",
    createdDate: "2023-12-01",
    dataSubjects: ["Employees", "Job Applicants"],
    lawfulBasis: "Contract",
    dataController: "Magic Software (Thailand) Corp., Ltd.",
    contactPerson: "Somchai Jaidee",
    email: "somchai.j@magicsoftware.co.th",
    phone: "+66 2 123 4567",
    businessUnit: "Corporate",
    dataCategories: ["Identity Data", "Contact Data", "Employment Data", "Financial Data"],
    retentionPeriod: "7 years after employment termination",
    securityMeasures: "Encryption at rest, Access controls, Regular backups",
    processors: "Internal HR System, Payroll Service Provider",
    dataTransfer: "No cross-border transfers",
    description:
      "Processing of employee personal data for payroll, benefits administration, performance management, and compliance with labor laws.",
  },
  "RPA-002": {
    id: "RPA-002",
    name: "Customer Database",
    department: "Marketing",
    purpose: "Customer Relationship Management",
    status: "Active",
    riskLevel: "High",
    lastUpdated: "2024-01-08",
    createdDate: "2023-11-15",
    dataSubjects: ["Customers", "Prospects"],
    lawfulBasis: "Consent",
    dataController: "Magic Software (Thailand) Corp., Ltd.",
    contactPerson: "Niran Suksan",
    email: "niran.s@magicsoftware.co.th",
    phone: "+66 2 123 4568",
    businessUnit: "Operations",
    dataCategories: ["Identity Data", "Contact Data", "Financial Data", "Behavioral Data"],
    retentionPeriod: "5 years after last interaction",
    securityMeasures: "End-to-end encryption, Multi-factor authentication, Regular security audits",
    processors: "CRM System, Email Marketing Platform, Analytics Service",
    dataTransfer: "EU (Adequacy Decision), USA (Standard Contractual Clauses)",
    description:
      "Processing of customer data for sales, marketing, customer support, and business analytics to improve products and services.",
  },
}

export default function RopaDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const ropaData = mockRopaDetails[id as keyof typeof mockRopaDetails]

  if (!ropaData) {
    return (
      <div className="flex-1 p-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">RoPA Record Not Found</h1>
          <p className="text-gray-600 mb-6">The requested RoPA record could not be found.</p>
          <Link href="/ropa">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to RoPA List
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    return status === "Active" ? "default" : "secondary"
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/ropa">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to RoPA List
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">RoPA Record Details</h1>
            <p className="text-muted-foreground">Record ID: {ropaData.id}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <History className="w-4 h-4 mr-2" />
              View History
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Link href={`/ropa/${id}/edit`}>
              <Button size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Record
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Basic Information
                <div className="flex gap-2">
                  <Badge variant={getStatusBadgeVariant(ropaData.status)}>{ropaData.status}</Badge>
                  <Badge variant={getRiskBadgeVariant(ropaData.riskLevel)}>{ropaData.riskLevel} Risk</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Activity Name</label>
                    <p className="text-lg font-semibold">{ropaData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department</label>
                    <p>{ropaData.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Business Unit</label>
                    <p>{ropaData.businessUnit}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Purpose</label>
                    <p>{ropaData.purpose}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Data Controller</label>
                    <p>{ropaData.dataController}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Lawful Basis</label>
                    <p>{ropaData.lawfulBasis}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created Date</label>
                    <p>{ropaData.createdDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <p>{ropaData.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Person</label>
                  <p className="font-medium">{ropaData.contactPerson}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p>{ropaData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p>{ropaData.phone}</p>
                </div>
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
                <div className="flex flex-wrap gap-2">
                  {ropaData.dataSubjects.map((subject) => (
                    <Badge key={subject} variant="outline">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {ropaData.dataCategories.map((category) => (
                    <Badge key={category} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Processing Details */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="mt-1">{ropaData.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Processors</label>
                    <p className="mt-1">{ropaData.processors}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Data Transfer</label>
                    <p className="mt-1">{ropaData.dataTransfer}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Retention Period</label>
                    <p className="mt-1">{ropaData.retentionPeriod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Security Measures</label>
                    <p className="mt-1">{ropaData.securityMeasures}</p>
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
