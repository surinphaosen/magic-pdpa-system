"use client"

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
import { ArrowLeft, ArrowRight, Eye, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { dataGroups as masterDataGroups, getLocalizedName } from "@/lib/data-types"

export default function CreateRopaPage() {
  const router = useRouter()
  const { t, language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, title: t("ropa.steps.controllerInfo"), description: t("ropa.steps.controllerInfoDesc") },
    { id: 2, title: t("ropa.steps.dataCollection"), description: t("ropa.steps.dataCollectionDesc") },
    { id: 3, title: t("ropa.steps.purpose"), description: t("ropa.steps.purposeDesc") },
    { id: 4, title: t("ropa.steps.retention"), description: t("ropa.steps.retentionDesc") },
    { id: 5, title: t("ropa.steps.accessRights"), description: t("ropa.steps.accessRightsDesc") },
    { id: 6, title: t("ropa.steps.disclosure"), description: t("ropa.steps.disclosureDesc") },
    { id: 7, title: t("ropa.steps.security"), description: t("ropa.steps.securityDesc") },
    { id: 8, title: t("ropa.steps.rejection"), description: t("ropa.steps.rejectionDesc") },
  ]

  const [formData, setFormData] = useState({
    // Step 1: Controller Information
    activityName: "",
    department: "",
    businessUnit: "",
    dataController: "Magic Software (Thailand) Corp., Ltd.",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
    dpoName: "",
    dpoEmail: "",
    dpoPhone: "",

    // Step 2: Data Collection
    dataGroups: [] as string[],
    customDataTypes: "",
    relatedAssets: [] as string[], // New: Related Assets

    // Step 3: Purpose
    purposes: [] as string[],
    customPurpose: "",
    lawfulBasis: "",

    // Step 4: Retention
    retentionPeriod: "",
    retentionCriteria: "",
    disposalMethod: "",

    // Step 5: Access Rights
    accessRights: "",
    accessConditions: "",
    accessPersons: "",

    // Step 6: Disclosure
    disclosureExemptions: [] as string[],
    customDisclosure: "",

    // Step 7: Security
    securityMeasures: [] as string[],
    customSecurity: "",

    // Step 8: Rejection
    rejectionCases: "",
    objectionCases: "",
  })

  const mockAssets = [
    { id: "asset-001", name: "HR Database Server", type: "Database" },
    { id: "asset-002", name: "Customer CRM System", type: "Application" },
    { id: "asset-003", name: "Email Marketing Platform", type: "Service" },
    { id: "asset-004", name: "File Storage Server", type: "Storage" },
    { id: "asset-005", name: "Backup System", type: "Storage" },
  ]

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

  const handleSubmit = () => {
    if (!formData.activityName || !formData.department || !formData.contactPerson || !formData.contactEmail) {
      toast.error("Please fill in all required fields")
      return
    }

    console.log("Form submitted:", formData)
    toast.success("RoPA record created successfully!")
    router.push("/ropa")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="activityName">{t("ropa.activityName")} *</Label>
                <Input
                  id="activityName"
                  placeholder={t("ropa.placeholders.activityName") || "e.g., Employee Data Management"}
                  value={formData.activityName}
                  onChange={(e) => setFormData({ ...formData, activityName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessUnit">{t("ropa.businessUnit")} *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, businessUnit: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("ropa.placeholders.selectBusinessUnit") || "Select business unit"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">{t("ropa.department")} *</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("ropa.placeholders.selectDepartment") || "Select department"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataController">{t("ropa.dataController")} *</Label>
                <Input
                  id="dataController"
                  placeholder={t("ropa.placeholders.organizationName") || "Organization name"}
                  value={formData.dataController}
                  onChange={(e) => setFormData({ ...formData, dataController: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">{t("ropa.contactPerson")} *</Label>
                  <Input
                    id="contactPerson"
                    placeholder={t("ropa.placeholders.fullName") || "Full name"}
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("ropa.email")} *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("ropa.placeholders.email") || "email@company.com"}
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("ropa.phone")}</Label>
                  <Input
                    id="phone"
                    placeholder={t("ropa.placeholders.phone") || "+66 XX XXX XXXX"}
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>{t("ropa.dataCategories")} *</Label>
              <div className="grid grid-cols-2 gap-4">
                {masterDataGroups.map((group) => (
                  <div key={group.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={group.id}
                      checked={formData.dataGroups.includes(group.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, dataGroups: [...formData.dataGroups, group.id] })
                        } else {
                          setFormData({
                            ...formData,
                            dataGroups: formData.dataGroups.filter((id) => id !== group.id),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={group.id} className="text-sm">
                      {getLocalizedName(group, language === "en" ? "en" : "th")}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label>Related Assets</Label>
              <div className="grid grid-cols-2 gap-4">
                {mockAssets.map((asset) => (
                  <div key={asset.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={asset.id}
                      checked={formData.relatedAssets.includes(asset.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, relatedAssets: [...formData.relatedAssets, asset.id] })
                        } else {
                          setFormData({
                            ...formData,
                            relatedAssets: formData.relatedAssets.filter((id) => id !== asset.id),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={asset.id} className="text-sm">
                      {asset.name} ({asset.type})
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="customDataTypes">Additional Data Types</Label>
              <Textarea
                id="customDataTypes"
                placeholder={
                  t("ropa.placeholders.additionalData") || "Specify any additional personal data not listed above"
                }
                value={formData.customDataTypes}
                onChange={(e) => setFormData({ ...formData, customDataTypes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>{t("ropa.purpose.title") || "Purpose of Collection"} *</Label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  t("ropa.purpose.communication") || "Communication",
                  t("ropa.purpose.hrManagement") || "HR Management",
                  t("ropa.purpose.payrollBenefits") || "Payroll and Benefits",
                  t("ropa.purpose.legalCompliance") || "Legal Compliance",
                  t("ropa.purpose.security") || "Security",
                  t("ropa.purpose.marketing") || "Marketing",
                  t("ropa.purpose.analytics") || "Analytics and Statistics",
                ].map((purpose) => (
                  <div key={purpose} className="flex items-center space-x-2">
                    <Checkbox
                      id={purpose}
                      checked={formData.purposes.includes(purpose)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, purposes: [...formData.purposes, purpose] })
                        } else {
                          setFormData({ ...formData, purposes: formData.purposes.filter((p) => p !== purpose) })
                        }
                      }}
                    />
                    <Label htmlFor={purpose}>{purpose}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customPurpose">{t("ropa.purpose.other") || "Other Purposes"}</Label>
                <Textarea
                  id="customPurpose"
                  placeholder={t("ropa.placeholders.otherPurposes") || "Specify other purposes"}
                  value={formData.customPurpose}
                  onChange={(e) => setFormData({ ...formData, customPurpose: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lawfulBasis">{t("ropa.lawfulBasisLabel")}</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, lawfulBasis: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("ropa.placeholders.selectLawfulBasis")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consent">{t("ropa.lawfulBasis.consent") || "Consent"}</SelectItem>
                    <SelectItem value="contract">{t("ropa.lawfulBasis.contract") || "Contract"}</SelectItem>
                    <SelectItem value="legal-obligation">
                      {t("ropa.lawfulBasis.legalObligation") || "Legal Obligation"}
                    </SelectItem>
                    <SelectItem value="vital-interests">
                      {t("ropa.lawfulBasis.vitalInterests") || "Vital Interests"}
                    </SelectItem>
                    <SelectItem value="public-task">{t("ropa.lawfulBasis.publicTask") || "Public Task"}</SelectItem>
                    <SelectItem value="legitimate-interests">
                      {t("ropa.lawfulBasis.legitimateInterests") || "Legitimate Interests"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="retentionPeriod">{t("ropa.retention.period") || "Retention Period"} *</Label>
                <Input
                  id="retentionPeriod"
                  placeholder={t("ropa.placeholders.retentionPeriod") || "e.g., 1 year"}
                  value={formData.retentionPeriod}
                  onChange={(e) => setFormData({ ...formData, retentionPeriod: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="retentionCriteria">{t("ropa.retention.criteria") || "Retention Criteria"}</Label>
                <Textarea
                  id="retentionCriteria"
                  placeholder={t("ropa.placeholders.retentionCriteria") || "Specify data retention criteria"}
                  value={formData.retentionCriteria}
                  onChange={(e) => setFormData({ ...formData, retentionCriteria: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disposalMethod">{t("ropa.retention.disposal") || "Disposal Method"}</Label>
                <Textarea
                  id="disposalMethod"
                  placeholder={t("ropa.placeholders.disposalMethod") || "Specify data disposal method"}
                  value={formData.disposalMethod}
                  onChange={(e) => setFormData({ ...formData, disposalMethod: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="accessRights">{t("ropa.access.rights") || "Access Rights"}</Label>
                <Textarea
                  id="accessRights"
                  placeholder={t("ropa.placeholders.accessRights") || "Specify data access rights"}
                  value={formData.accessRights}
                  onChange={(e) => setFormData({ ...formData, accessRights: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessConditions">{t("ropa.access.conditions") || "Access Conditions"}</Label>
                <Textarea
                  id="accessConditions"
                  placeholder={t("ropa.placeholders.accessConditions") || "Specify data access conditions"}
                  value={formData.accessConditions}
                  onChange={(e) => setFormData({ ...formData, accessConditions: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accessPersons">{t("ropa.access.persons") || "Authorized Persons"}</Label>
                <Textarea
                  id="accessPersons"
                  placeholder={t("ropa.placeholders.authorizedPersons") || "Specify authorized persons"}
                  value={formData.accessPersons}
                  onChange={(e) => setFormData({ ...formData, accessPersons: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>{t("ropa.disclosure.exemptions") || "Disclosure Exemptions"}</Label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  t("ropa.disclosure.research") || "Scientific Research",
                  t("ropa.disclosure.statistics") || "Statistics",
                  t("ropa.disclosure.publicInterest") || "Public Interest",
                  t("ropa.disclosure.vitalInterestsProtection") || "Vital Interests Protection",
                ].map((exemption) => (
                  <div key={exemption} className="flex items-center space-x-2">
                    <Checkbox
                      id={exemption}
                      checked={formData.disclosureExemptions.includes(exemption)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({
                            ...formData,
                            disclosureExemptions: [...formData.disclosureExemptions, exemption],
                          })
                        } else {
                          setFormData({
                            ...formData,
                            disclosureExemptions: formData.disclosureExemptions.filter((e) => e !== exemption),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={exemption}>{exemption}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customDisclosure">{t("ropa.disclosure.other") || "Other Exemptions"}</Label>
                <Textarea
                  id="customDisclosure"
                  placeholder={t("ropa.placeholders.customDisclosure") || "Specify other exemptions"}
                  value={formData.customDisclosure}
                  onChange={(e) => setFormData({ ...formData, customDisclosure: e.target.value })}
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
              <Label>{t("ropa.security.measures") || "Security Measures"}</Label>
              <div className="grid grid-cols-1 gap-3">
                {[
                  t("ropa.security.encryption") || "Data Encryption",
                  t("ropa.security.accessControl") || "Access Control",
                  t("ropa.security.monitoring") || "Security Monitoring",
                  t("ropa.security.backup") || "Data Backup",
                ].map((measure) => (
                  <div key={measure} className="flex items-center space-x-2">
                    <Checkbox
                      id={measure}
                      checked={formData.securityMeasures.includes(measure)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, securityMeasures: [...formData.securityMeasures, measure] })
                        } else {
                          setFormData({
                            ...formData,
                            securityMeasures: formData.securityMeasures.filter((m) => m !== measure),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={measure}>{measure}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customSecurity">{t("ropa.security.other") || "Other Measures"}</Label>
                <Textarea
                  id="customSecurity"
                  placeholder={t("ropa.placeholders.customSecurity") || "Specify other measures"}
                  value={formData.customSecurity}
                  onChange={(e) => setFormData({ ...formData, customSecurity: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case 8:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="rejectionCases">{t("ropa.rejection.cases") || "Request Rejection Cases"}</Label>
                <Textarea
                  id="rejectionCases"
                  placeholder={t("ropa.placeholders.rejectionCases") || "Specify request rejection cases"}
                  value={formData.rejectionCases}
                  onChange={(e) => setFormData({ ...formData, rejectionCases: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="objectionCases">{t("ropa.rejection.objections") || "Objection Cases"}</Label>
                <Textarea
                  id="objectionCases"
                  placeholder={t("ropa.placeholders.objectionCases") || "Specify objection cases"}
                  value={formData.objectionCases}
                  onChange={(e) => setFormData({ ...formData, objectionCases: e.target.value })}
                  rows={3}
                />
              </div>
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
          <Link href="/ropa">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to RoPA List
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{t("ropa.createNew")}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              {t("common.preview")}
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
              </CardHeader>
              <CardContent>
                <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
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
