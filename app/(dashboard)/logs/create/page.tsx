"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight, Eye, Save, Upload, Users, User } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

const steps = [
  { id: 1, title: "Event Information", description: "Basic details of the processing activity" },
  { id: 2, title: "Data Subjects", description: "Information about affected individuals" },
  { id: 3, title: "Data Details", description: "Types and volume of data involved" },
  { id: 4, title: "Processing Context", description: "Purpose and legal basis" },
  { id: 5, title: "Cross-border Transfer", description: "International data transfers (if any)" },
  { id: 6, title: "Impact Assessment", description: "Risk and impact evaluation" },
  { id: 7, title: "Evidence & Files", description: "Supporting documents and evidence" },
  { id: 8, title: "Follow-up Actions", description: "Corrective and preventive measures" },
]

export default function CreateLogPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Event Information
    eventType: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventDescription: "",
    reportedBy: "",
    reportedDate: "",
    linkedRopa: "",

    // Step 2: Data Subjects
    subjectType: "", // individual, group, file_upload
    individualName: "",
    individualEmail: "",
    individualPhone: "",
    groupDescription: "",
    groupCount: "",
    uploadedFile: null as File | null,
    affectedCount: "",

    // Step 3: Data Details
    dataCategories: [] as string[],
    dataVolume: "",
    dataSource: "",
    processingMethod: "",

    // Step 4: Processing Context
    processingPurpose: "",
    lawfulBasis: "",
    consentStatus: "",
    consentDate: "",

    // Step 5: Cross-border Transfer
    hasInternationalTransfer: "",
    transferCountries: [] as string[],
    transferPurpose: "",
    adequacyDecision: "",
    safeguards: "",

    // Step 6: Impact Assessment
    riskLevel: "",
    impactAssessment: "",
    potentialHarm: "",
    mitigationMeasures: "",

    // Step 7: Evidence & Files
    evidenceFiles: [] as File[],
    documentationNotes: "",

    // Step 8: Follow-up Actions
    immediateActions: [] as string[],
    correctiveActions: "",
    preventiveActions: "",
    responsiblePerson: "",
    targetDate: "",
    followUpRequired: "",
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData({ ...formData, uploadedFile: file })
      toast.success(`File uploaded: ${file.name}`)
    }
  }

  const handleSubmit = () => {
    if (!formData.eventType || !formData.eventDate || !formData.eventDescription || !formData.reportedBy) {
      toast.error("Please fill in all required fields")
      return
    }

    console.log("Form submitted:", formData)
    toast.success("Activity log created successfully!")
    router.push("/logs")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, eventType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="data-collection">Data Collection</SelectItem>
                    <SelectItem value="consent-collection">Consent Collection</SelectItem>
                    <SelectItem value="data-transfer">Data Transfer</SelectItem>
                    <SelectItem value="data-access">Data Access</SelectItem>
                    <SelectItem value="data-breach">Data Breach</SelectItem>
                    <SelectItem value="consent-withdrawal">Consent Withdrawal</SelectItem>
                    <SelectItem value="data-request">Data Subject Request</SelectItem>
                    <SelectItem value="system-maintenance">System Maintenance</SelectItem>
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
                <Label htmlFor="eventTime">Event Time</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={formData.eventTime}
                  onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventLocation">Location</Label>
                <Input
                  id="eventLocation"
                  placeholder="e.g., HR Office, Online System"
                  value={formData.eventLocation}
                  onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDescription">Event Description *</Label>
              <Textarea
                id="eventDescription"
                placeholder="e.g., Collected consent from Customer A for international data transfer to support software purchase from overseas vendor"
                value={formData.eventDescription}
                onChange={(e) => setFormData({ ...formData, eventDescription: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reportedBy">Reported By *</Label>
                <Input
                  id="reportedBy"
                  placeholder="Reporter name"
                  value={formData.reportedBy}
                  onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedRopa">Linked RoPA</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, linkedRopa: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select related RoPA" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RPA-001">RPA-001 - Employee Data Management</SelectItem>
                    <SelectItem value="RPA-002">RPA-002 - Customer Database</SelectItem>
                    <SelectItem value="RPA-003">RPA-003 - Visitor Log System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Data Subject Type *</Label>
              <RadioGroup
                value={formData.subjectType}
                onValueChange={(value) => setFormData({ ...formData, subjectType: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="individual" id="individual" />
                  <Label htmlFor="individual" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Individual Person
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Group of People
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="file_upload" id="file_upload" />
                  <Label htmlFor="file_upload" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload File with List
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.subjectType === "individual" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Individual Information</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="individualName">Full Name</Label>
                    <Input
                      id="individualName"
                      placeholder="e.g., John Doe"
                      value={formData.individualName}
                      onChange={(e) => setFormData({ ...formData, individualName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="individualEmail">Email</Label>
                    <Input
                      id="individualEmail"
                      type="email"
                      placeholder="john.doe@email.com"
                      value={formData.individualEmail}
                      onChange={(e) => setFormData({ ...formData, individualEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="individualPhone">Phone</Label>
                    <Input
                      id="individualPhone"
                      placeholder="+66 XX XXX XXXX"
                      value={formData.individualPhone}
                      onChange={(e) => setFormData({ ...formData, individualPhone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.subjectType === "group" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Group Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="groupDescription">Group Description</Label>
                    <Input
                      id="groupDescription"
                      placeholder="e.g., Job applicants for June 2024"
                      value={formData.groupDescription}
                      onChange={(e) => setFormData({ ...formData, groupDescription: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groupCount">Number of People</Label>
                    <Input
                      id="groupCount"
                      type="number"
                      placeholder="e.g., 80"
                      value={formData.groupCount}
                      onChange={(e) => setFormData({ ...formData, groupCount: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.subjectType === "file_upload" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">File Upload</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fileUpload">Upload Data Subject List</Label>
                    <Input
                      id="fileUpload"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFileUpload}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-muted-foreground">Supported formats: CSV, Excel (.xlsx, .xls)</p>
                  </div>
                  {formData.uploadedFile && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">✓ File uploaded: {formData.uploadedFile.name}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="affectedCount">Total Affected Individuals</Label>
              <Input
                id="affectedCount"
                type="number"
                placeholder="Total number of people affected"
                value={formData.affectedCount}
                onChange={(e) => setFormData({ ...formData, affectedCount: e.target.value })}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Data Categories Involved</Label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Identity Data (Name, ID Number)",
                  "Contact Information",
                  "Financial Data",
                  "Employment Data",
                  "Health Information",
                  "Location Data",
                  "Biometric Data",
                  "Behavioral Data",
                ].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={formData.dataCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, dataCategories: [...formData.dataCategories, category] })
                        } else {
                          setFormData({
                            ...formData,
                            dataCategories: formData.dataCategories.filter((c) => c !== category),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataVolume">Data Volume</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, dataVolume: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal (1-10 records)</SelectItem>
                    <SelectItem value="small">Small (11-100 records)</SelectItem>
                    <SelectItem value="medium">Medium (101-1,000 records)</SelectItem>
                    <SelectItem value="large">Large (1,001-10,000 records)</SelectItem>
                    <SelectItem value="massive">Massive (10,000+ records)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataSource">Data Source</Label>
                <Input
                  id="dataSource"
                  placeholder="e.g., HR System, Customer Database"
                  value={formData.dataSource}
                  onChange={(e) => setFormData({ ...formData, dataSource: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="processingMethod">Processing Method</Label>
              <Textarea
                id="processingMethod"
                placeholder="Describe how the data was processed"
                value={formData.processingMethod}
                onChange={(e) => setFormData({ ...formData, processingMethod: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="processingPurpose">Processing Purpose *</Label>
                <Textarea
                  id="processingPurpose"
                  placeholder="e.g., To support software purchase from overseas vendor"
                  value={formData.processingPurpose}
                  onChange={(e) => setFormData({ ...formData, processingPurpose: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lawfulBasis">Lawful Basis</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, lawfulBasis: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lawful basis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consent">Consent</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="legal-obligation">Legal Obligation</SelectItem>
                    <SelectItem value="vital-interests">Vital Interests</SelectItem>
                    <SelectItem value="public-task">Public Task</SelectItem>
                    <SelectItem value="legitimate-interests">Legitimate Interests</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.lawfulBasis === "consent" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="consentStatus">Consent Status</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, consentStatus: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select consent status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="obtained">Obtained</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="withdrawn">Withdrawn</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="consentDate">Consent Date</Label>
                    <Input
                      id="consentDate"
                      type="date"
                      value={formData.consentDate}
                      onChange={(e) => setFormData({ ...formData, consentDate: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>International Data Transfer</Label>
              <RadioGroup
                value={formData.hasInternationalTransfer}
                onValueChange={(value) => setFormData({ ...formData, hasInternationalTransfer: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="transfer_yes" />
                  <Label htmlFor="transfer_yes">Yes, involves international transfer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="transfer_no" />
                  <Label htmlFor="transfer_no">No international transfer</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.hasInternationalTransfer === "yes" && (
              <div className="space-y-4">
                <div className="space-y-4">
                  <Label>Destination Countries</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {["United States", "European Union", "Japan", "Singapore", "Australia", "Canada"].map((country) => (
                      <div key={country} className="flex items-center space-x-2">
                        <Checkbox
                          id={country}
                          checked={formData.transferCountries.includes(country)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                transferCountries: [...formData.transferCountries, country],
                              })
                            } else {
                              setFormData({
                                ...formData,
                                transferCountries: formData.transferCountries.filter((c) => c !== country),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={country} className="text-sm">
                          {country}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transferPurpose">Transfer Purpose</Label>
                  <Textarea
                    id="transferPurpose"
                    placeholder="e.g., Software licensing and support services"
                    value={formData.transferPurpose}
                    onChange={(e) => setFormData({ ...formData, transferPurpose: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adequacyDecision">Adequacy Decision</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, adequacyDecision: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select adequacy status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adequate">Adequate Country</SelectItem>
                        <SelectItem value="not_adequate">Not Adequate</SelectItem>
                        <SelectItem value="partial">Partial Adequacy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="safeguards">Safeguards</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, safeguards: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select safeguards" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scc">Standard Contractual Clauses</SelectItem>
                        <SelectItem value="bcr">Binding Corporate Rules</SelectItem>
                        <SelectItem value="certification">Certification</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="riskLevel">Risk Level</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, riskLevel: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="impactAssessment">Impact Assessment</Label>
                <Textarea
                  id="impactAssessment"
                  placeholder="Assess the potential impact on data subjects"
                  value={formData.impactAssessment}
                  onChange={(e) => setFormData({ ...formData, impactAssessment: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="potentialHarm">Potential Harm</Label>
                <Textarea
                  id="potentialHarm"
                  placeholder="Describe potential harm to data subjects"
                  value={formData.potentialHarm}
                  onChange={(e) => setFormData({ ...formData, potentialHarm: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mitigationMeasures">Mitigation Measures</Label>
                <Textarea
                  id="mitigationMeasures"
                  placeholder="Describe measures taken to mitigate risks"
                  value={formData.mitigationMeasures}
                  onChange={(e) => setFormData({ ...formData, mitigationMeasures: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 7:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="evidenceFiles">Evidence Files</Label>
                <Input
                  id="evidenceFiles"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.png,.csv,.xlsx"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || [])
                    setFormData({ ...formData, evidenceFiles: files })
                    if (files.length > 0) {
                      toast.success(`${files.length} file(s) uploaded`)
                    }
                  }}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  Upload supporting documents, screenshots, consent forms, etc.
                </p>
              </div>

              {formData.evidenceFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files</Label>
                  <div className="space-y-2">
                    {formData.evidenceFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="documentationNotes">Documentation Notes</Label>
                <Textarea
                  id="documentationNotes"
                  placeholder="Additional notes about the evidence and documentation"
                  value={formData.documentationNotes}
                  onChange={(e) => setFormData({ ...formData, documentationNotes: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Immediate Actions Taken</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Notified Data Subjects",
                  "Notified Authorities",
                  "Secured Systems",
                  "Preserved Evidence",
                  "Assessed Impact",
                  "Implemented Safeguards",
                ].map((action) => (
                  <div key={action} className="flex items-center space-x-2">
                    <Checkbox
                      id={action}
                      checked={formData.immediateActions.includes(action)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, immediateActions: [...formData.immediateActions, action] })
                        } else {
                          setFormData({
                            ...formData,
                            immediateActions: formData.immediateActions.filter((a) => a !== action),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={action}>{action}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="correctiveActions">Corrective Actions</Label>
                <Textarea
                  id="correctiveActions"
                  placeholder="Describe corrective measures to be implemented"
                  value={formData.correctiveActions}
                  onChange={(e) => setFormData({ ...formData, correctiveActions: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="preventiveActions">Preventive Actions</Label>
                <Textarea
                  id="preventiveActions"
                  placeholder="Describe preventive measures to avoid recurrence"
                  value={formData.preventiveActions}
                  onChange={(e) => setFormData({ ...formData, preventiveActions: e.target.value })}
                  rows={4}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="responsiblePerson">Responsible Person</Label>
                <Input
                  id="responsiblePerson"
                  placeholder="Name of responsible person"
                  value={formData.responsiblePerson}
                  onChange={(e) => setFormData({ ...formData, responsiblePerson: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Completion Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={formData.targetDate}
                  onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Follow-up Required?</Label>
              <RadioGroup
                value={formData.followUpRequired}
                onValueChange={(value) => setFormData({ ...formData, followUpRequired: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="followup_yes" />
                  <Label htmlFor="followup_yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="followup_no" />
                  <Label htmlFor="followup_no">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold mb-2">Step {currentStep}</h3>
              <p className="text-muted-foreground">This step is under development</p>
            </div>
          </div>
        )
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
            <h1 className="text-2xl font-bold">{t("logs.createNew")}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Draft saved!")}>
              <Save className="w-4 h-4 mr-2" />
              {t("common.draft")}
            </Button>
            <Button size="sm" onClick={handleSubmit}>
              <Save className="w-4 h-4 mr-2" />
              {t("common.submit")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`step-item ${
                        currentStep === step.id ? "active" : currentStep > step.id ? "completed" : "inactive"
                      }`}
                      onClick={() => setCurrentStep(step.id)}
                    >
                      <div
                        className={`step-circle ${
                          currentStep === step.id ? "active" : currentStep > step.id ? "completed" : "inactive"
                        }`}
                      >
                        {currentStep > step.id ? "✓" : step.id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{step.title}</div>
                        <div className="text-xs opacity-70 truncate">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <Card>
              <CardHeader>
                <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
                <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}

                <div className="flex justify-between pt-6 mt-6 border-t">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t("common.previous")}
                  </Button>
                  <Button onClick={currentStep === steps.length ? handleSubmit : handleNext}>
                    {currentStep === steps.length ? t("common.submit") : t("common.next")}
                    {currentStep < steps.length && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
