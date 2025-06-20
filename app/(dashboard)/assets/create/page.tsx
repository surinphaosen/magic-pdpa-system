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
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function CreateAssetPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "",
    deployment: "",
    location: "",
    description: "",
    owner: "",
    dataTypes: [] as string[],
    securityMeasures: [] as string[],
    accessControls: "",
    riskLevel: "",
  })

  const handleSubmit = () => {
    if (!formData.name || !formData.type || !formData.deployment) {
      toast.error("Please fill in all required fields")
      return
    }

    console.log("Asset created:", formData)
    toast.success("Asset created successfully!")
    router.push("/assets")
  }

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/assets">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Assets
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{t("assets.createNew")}</h1>
          </div>
          <Button onClick={handleSubmit}>
            <Save className="w-4 h-4 mr-2" />
            {t("common.save")}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details of the asset</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Asset Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., HR Database Server"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Asset Type *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select asset type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hardware">{t("assets.types.hardware")}</SelectItem>
                      <SelectItem value="software">{t("assets.types.software")}</SelectItem>
                      <SelectItem value="database">{t("assets.types.database")}</SelectItem>
                      <SelectItem value="application">{t("assets.types.application")}</SelectItem>
                      <SelectItem value="service">{t("assets.types.service")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="server">{t("assets.categories.server")}</SelectItem>
                      <SelectItem value="database">{t("assets.categories.database")}</SelectItem>
                      <SelectItem value="application">{t("assets.categories.application")}</SelectItem>
                      <SelectItem value="storage">{t("assets.categories.storage")}</SelectItem>
                      <SelectItem value="network">{t("assets.categories.network")}</SelectItem>
                      <SelectItem value="endpoint">{t("assets.categories.endpoint")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deployment">Deployment *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, deployment: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select deployment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="onPremise">{t("assets.deployment.onPremise")}</SelectItem>
                      <SelectItem value="cloud">{t("assets.deployment.cloud")}</SelectItem>
                      <SelectItem value="hybrid">{t("assets.deployment.hybrid")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Data Center - Floor 3"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner">Owner</Label>
                  <Input
                    id="owner"
                    placeholder="e.g., IT Department"
                    value={formData.owner}
                    onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("common.description")}</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the asset and its purpose"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Data Types */}
          <Card>
            <CardHeader>
              <CardTitle>Data Types Stored</CardTitle>
              <CardDescription>Select the types of personal data stored in this asset</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Employee Data",
                  "Customer Data",
                  "Financial Data",
                  "Health Data",
                  "Contact Information",
                  "Identity Data",
                  "Biometric Data",
                  "Location Data",
                ].map((dataType) => (
                  <div key={dataType} className="flex items-center space-x-2">
                    <Checkbox
                      id={dataType}
                      checked={formData.dataTypes.includes(dataType)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData({ ...formData, dataTypes: [...formData.dataTypes, dataType] })
                        } else {
                          setFormData({ ...formData, dataTypes: formData.dataTypes.filter((t) => t !== dataType) })
                        }
                      }}
                    />
                    <Label htmlFor={dataType}>{dataType}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle>Security Measures</CardTitle>
              <CardDescription>Select the security measures implemented for this asset</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Encryption at Rest",
                  "Encryption in Transit",
                  "Access Controls",
                  "Regular Backups",
                  "Monitoring",
                  "Audit Logs",
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
                <Label htmlFor="accessControls">Access Controls</Label>
                <Textarea
                  id="accessControls"
                  placeholder="Describe who has access and under what conditions"
                  value={formData.accessControls}
                  onChange={(e) => setFormData({ ...formData, accessControls: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskLevel">Risk Level</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, riskLevel: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
