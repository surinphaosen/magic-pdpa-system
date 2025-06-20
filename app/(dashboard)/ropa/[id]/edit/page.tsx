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
const mockRopaDetails = {
  "RPA-001": {
    id: "RPA-001",
    name: "Employee Data Management",
    department: "HR",
    purpose: "Payroll Processing and Employee Management",
    businessUnit: "Corporate",
    dataController: "Magic Software (Thailand) Corp., Ltd.",
    contactPerson: "Somchai Jaidee",
    email: "somchai.j@magicsoftware.co.th",
    phone: "+66 2 123 4567",
    lawfulBasis: "Contract",
    description:
      "Processing of employee personal data for payroll, benefits administration, performance management, and compliance with labor laws.",
  },
}

export default function EditRopaPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const originalData = mockRopaDetails[id as keyof typeof mockRopaDetails]
  const [formData, setFormData] = useState(
    originalData || {
      id: "",
      name: "",
      department: "",
      purpose: "",
      businessUnit: "",
      dataController: "",
      contactPerson: "",
      email: "",
      phone: "",
      lawfulBasis: "",
      description: "",
    },
  )

  if (!originalData) {
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

  const handleSave = () => {
    // Validate required fields
    if (!formData.name || !formData.department || !formData.contactPerson || !formData.email) {
      toast.error("Please fill in all required fields")
      return
    }

    console.log("Saving RoPA record:", formData)
    toast.success("RoPA record updated successfully!")
    router.push(`/ropa/${id}`)
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href={`/ropa/${id}`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Details
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Edit RoPA Record</h1>
            <p className="text-muted-foreground">Record ID: {formData.id}</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/ropa/${id}`}>
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
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update the basic details of this RoPA record</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Processing Activity Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessUnit">Business Unit</Label>
                  <Select
                    value={formData.businessUnit}
                    onValueChange={(value) => setFormData({ ...formData, businessUnit: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corporate">Corporate</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lawfulBasis">Lawful Basis</Label>
                  <Select
                    value={formData.lawfulBasis}
                    onValueChange={(value) => setFormData({ ...formData, lawfulBasis: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select lawful basis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consent">Consent</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Legal Obligation">Legal Obligation</SelectItem>
                      <SelectItem value="Vital Interests">Vital Interests</SelectItem>
                      <SelectItem value="Public Task">Public Task</SelectItem>
                      <SelectItem value="Legitimate Interests">Legitimate Interests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Purpose of Processing</Label>
                <Input
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Controller */}
          <Card>
            <CardHeader>
              <CardTitle>Data Controller</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="dataController">Data Controller</Label>
                <Input
                  id="dataController"
                  value={formData.dataController}
                  onChange={(e) => setFormData({ ...formData, dataController: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
