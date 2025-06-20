"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Edit, Trash2, Save, Database, Group } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  dataTypes,
  dataGroups,
  getSensitivityBadge,
  getDataTypesInGroup,
  getLocalizedName,
  getLocalizedDescription,
  getLocalizedPurpose,
  type DataType,
  type DataGroup,
} from "@/lib/data-types"

export default function DataTypesPage() {
  const { user } = useAuth()
  const { language, t } = useLanguage()
  const router = useRouter()
  const [currentDataTypes, setCurrentDataTypes] = useState(dataTypes)
  const [currentDataGroups, setCurrentDataGroups] = useState(dataGroups)
  const [isCreateTypeDialogOpen, setIsCreateTypeDialogOpen] = useState(false)
  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] = useState(false)
  const [newDataType, setNewDataType] = useState({
    name: "",
    name_en: "",
    description: "",
    description_en: "",
    category: "",
    sensitivity: "",
  })
  const [newDataGroup, setNewDataGroup] = useState({
    name: "",
    name_en: "",
    description: "",
    description_en: "",
    purpose: "",
    purpose_en: "",
    dataTypes: [] as string[],
  })

  // Redirect if not admin
  if (user?.role !== "Admin") {
    router.push("/dashboard")
    return null
  }

  const handleCreateDataType = () => {
    if (!newDataType.name || !newDataType.name_en || !newDataType.category || !newDataType.sensitivity) {
      toast.error("Please fill in all required fields")
      return
    }

    const newId = `dt_${(currentDataTypes.length + 1).toString().padStart(3, "0")}`
    const dataType: DataType = {
      id: newId,
      name: newDataType.name,
      name_en: newDataType.name_en,
      description: newDataType.description,
      description_en: newDataType.description_en,
      category: newDataType.category as any,
      sensitivity: newDataType.sensitivity as any,
      status: "Active",
      createdDate: new Date().toISOString().split("T")[0],
    }

    setCurrentDataTypes((prev) => [...prev, dataType])
    setNewDataType({ name: "", name_en: "", description: "", description_en: "", category: "", sensitivity: "" })
    setIsCreateTypeDialogOpen(false)
    toast.success("Data type created successfully!")
  }

  const handleCreateDataGroup = () => {
    if (
      !newDataGroup.name ||
      !newDataGroup.name_en ||
      !newDataGroup.purpose ||
      !newDataGroup.purpose_en ||
      newDataGroup.dataTypes.length === 0
    ) {
      toast.error("Please fill in all required fields and select at least one data type")
      return
    }

    const newId = `dg_${(currentDataGroups.length + 1).toString().padStart(3, "0")}`
    const dataGroup: DataGroup = {
      id: newId,
      name: newDataGroup.name,
      name_en: newDataGroup.name_en,
      description: newDataGroup.description,
      description_en: newDataGroup.description_en,
      purpose: newDataGroup.purpose,
      purpose_en: newDataGroup.purpose_en,
      dataTypes: newDataGroup.dataTypes,
      status: "Active",
      createdDate: new Date().toISOString().split("T")[0],
    }

    setCurrentDataGroups((prev) => [...prev, dataGroup])
    setNewDataGroup({
      name: "",
      name_en: "",
      description: "",
      description_en: "",
      purpose: "",
      purpose_en: "",
      dataTypes: [],
    })
    setIsCreateGroupDialogOpen(false)
    toast.success("Data group created successfully!")
  }

  const categoryLabels = {
    identity: language === "en" ? "Identity Data" : "ข้อมูลประจำตัว",
    contact: language === "en" ? "Contact Data" : "ข้อมูลติดต่อ",
    financial: language === "en" ? "Financial Data" : "ข้อมูลการเงิน",
    health: language === "en" ? "Health Data" : "ข้อมูลสุขภาพ",
    employment: language === "en" ? "Employment Data" : "ข้อมูลการจ้างงาน",
    education: language === "en" ? "Education Data" : "ข้อมูลการศึกษา",
    biometric: language === "en" ? "Biometric Data" : "ข้อมูลไบโอเมตริก",
    location: language === "en" ? "Location Data" : "ข้อมูลตำแหน่งที่ตั้ง",
    behavioral: language === "en" ? "Behavioral Data" : "ข้อมูลพฤติกรรม",
    other: language === "en" ? "Other" : "อื่นๆ",
  }

  const sensitivityLabels = {
    normal: language === "en" ? "Normal" : "ปกติ",
    sensitive: language === "en" ? "Sensitive" : "ละเอียดอ่อน",
    highly_sensitive: language === "en" ? "Highly Sensitive" : "ละเอียดอ่อนสูง",
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === "en" ? "Data Types & Groups Management" : "จัดการประเภทข้อมูลและกลุ่มข้อมูล"}
          </h1>
          <p className="text-muted-foreground">
            {language === "en"
              ? "Manage data types and data groups for PDPA system"
              : "จัดการประเภทข้อมูลและกลุ่มข้อมูลสำหรับระบบ PDPA"}
          </p>
        </div>
        <Button onClick={() => toast.success("All changes saved!")}>
          <Save className="w-4 h-4 mr-2" />
          {language === "en" ? "Save All Changes" : "บันทึกการเปลี่ยนแปลงทั้งหมด"}
        </Button>
      </div>

      <Tabs defaultValue="data-types" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="data-types" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            {language === "en" ? "Data Types" : "ประเภทข้อมูล"}
          </TabsTrigger>
          <TabsTrigger value="data-groups" className="flex items-center gap-2">
            <Group className="w-4 h-4" />
            {language === "en" ? "Data Groups" : "กลุ่มข้อมูล"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="data-types" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{language === "en" ? "Data Types" : "ประเภทข้อมูล"}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Manage personal data types used in the system"
                      : "จัดการประเภทข้อมูลส่วนบุคคลที่ใช้ในระบบ"}
                  </CardDescription>
                </div>
                <Dialog open={isCreateTypeDialogOpen} onOpenChange={setIsCreateTypeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      {language === "en" ? "Add Data Type" : "เพิ่มประเภทข้อมูล"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{language === "en" ? "Add New Data Type" : "เพิ่มประเภทข้อมูลใหม่"}</DialogTitle>
                      <DialogDescription>
                        {language === "en" ? "Create a new data type" : "สร้างประเภทข้อมูลใหม่"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="typeName">
                            {language === "en" ? "Data Type Name (Thai) *" : "ชื่อประเภทข้อมูล (ไทย) *"}
                          </Label>
                          <Input
                            id="typeName"
                            value={newDataType.name}
                            onChange={(e) => setNewDataType({ ...newDataType, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="typeNameEn">
                            {language === "en" ? "Data Type Name (English) *" : "ชื่อประเภทข้อมูล (อังกฤษ) *"}
                          </Label>
                          <Input
                            id="typeNameEn"
                            value={newDataType.name_en}
                            onChange={(e) => setNewDataType({ ...newDataType, name_en: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="typeDescription">
                            {language === "en" ? "Description (Thai)" : "คำอธิบาย (ไทย)"}
                          </Label>
                          <Textarea
                            id="typeDescription"
                            value={newDataType.description}
                            onChange={(e) => setNewDataType({ ...newDataType, description: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="typeDescriptionEn">
                            {language === "en" ? "Description (English)" : "คำอธิบาย (อังกฤษ)"}
                          </Label>
                          <Textarea
                            id="typeDescriptionEn"
                            value={newDataType.description_en}
                            onChange={(e) => setNewDataType({ ...newDataType, description_en: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="typeCategory">{language === "en" ? "Category *" : "หมวดหมู่ *"}</Label>
                          <Select onValueChange={(value) => setNewDataType({ ...newDataType, category: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder={language === "en" ? "Select category" : "เลือกหมวดหมู่"} />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(categoryLabels).map(([key, label]) => (
                                <SelectItem key={key} value={key}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="typeSensitivity">
                            {language === "en" ? "Sensitivity Level *" : "ระดับความละเอียดอ่อน *"}
                          </Label>
                          <Select onValueChange={(value) => setNewDataType({ ...newDataType, sensitivity: value })}>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={language === "en" ? "Select sensitivity level" : "เลือกระดับความละเอียดอ่อน"}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(sensitivityLabels).map(([key, label]) => (
                                <SelectItem key={key} value={key}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateDataType}>{language === "en" ? "Create" : "สร้าง"}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{language === "en" ? "Data Type Name" : "ชื่อประเภทข้อมูล"}</TableHead>
                    <TableHead>{language === "en" ? "Category" : "หมวดหมู่"}</TableHead>
                    <TableHead>{language === "en" ? "Sensitivity Level" : "ระดับความละเอียดอ่อน"}</TableHead>
                    <TableHead>{language === "en" ? "Description" : "คำอธิบาย"}</TableHead>
                    <TableHead>{language === "en" ? "Status" : "สถานะ"}</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentDataTypes.map((dataType) => (
                    <TableRow key={dataType.id}>
                      <TableCell className="font-medium">{getLocalizedName(dataType, language)}</TableCell>
                      <TableCell>{categoryLabels[dataType.category]}</TableCell>
                      <TableCell>
                        <Badge variant={getSensitivityBadge(dataType.sensitivity)}>
                          {sensitivityLabels[dataType.sensitivity]}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{getLocalizedDescription(dataType, language)}</TableCell>
                      <TableCell>
                        <Badge variant={dataType.status === "Active" ? "default" : "secondary"}>
                          {dataType.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-groups" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{language === "en" ? "Data Groups" : "กลุ่มข้อมูล"}</CardTitle>
                  <CardDescription>
                    {language === "en"
                      ? "Manage data groups containing multiple data types"
                      : "จัดการกลุ่มข้อมูลที่ประกอบด้วยประเภทข้อมูลหลายประเภท"}
                  </CardDescription>
                </div>
                <Dialog open={isCreateGroupDialogOpen} onOpenChange={setIsCreateGroupDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      {language === "en" ? "Add Data Group" : "เพิ่มกลุ่มข้อมูล"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{language === "en" ? "Add New Data Group" : "เพิ่มกลุ่มข้อมูลใหม่"}</DialogTitle>
                      <DialogDescription>
                        {language === "en" ? "Create a new data group" : "สร้างกลุ่มข้อมูลใหม่"}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="groupName">
                            {language === "en" ? "Group Name (Thai) *" : "ชื่อกลุ่มข้อมูล (ไทย) *"}
                          </Label>
                          <Input
                            id="groupName"
                            value={newDataGroup.name}
                            onChange={(e) => setNewDataGroup({ ...newDataGroup, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="groupNameEn">
                            {language === "en" ? "Group Name (English) *" : "ชื่อกลุ่มข้อมูล (อังกฤษ) *"}
                          </Label>
                          <Input
                            id="groupNameEn"
                            value={newDataGroup.name_en}
                            onChange={(e) => setNewDataGroup({ ...newDataGroup, name_en: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="groupDescription">
                            {language === "en" ? "Description (Thai)" : "คำอธิบาย (ไทย)"}
                          </Label>
                          <Textarea
                            id="groupDescription"
                            value={newDataGroup.description}
                            onChange={(e) => setNewDataGroup({ ...newDataGroup, description: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="groupDescriptionEn">
                            {language === "en" ? "Description (English)" : "คำอธิบาย (อังกฤษ)"}
                          </Label>
                          <Textarea
                            id="groupDescriptionEn"
                            value={newDataGroup.description_en}
                            onChange={(e) => setNewDataGroup({ ...newDataGroup, description_en: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="groupPurpose">
                            {language === "en" ? "Purpose (Thai) *" : "วัตถุประสงค์ (ไทย) *"}
                          </Label>
                          <Textarea
                            id="groupPurpose"
                            value={newDataGroup.purpose}
                            onChange={(e) => setNewDataGroup({ ...newDataGroup, purpose: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="groupPurposeEn">
                            {language === "en" ? "Purpose (English) *" : "วัตถุประสงค์ (อังกฤษ) *"}
                          </Label>
                          <Textarea
                            id="groupPurposeEn"
                            value={newDataGroup.purpose_en}
                            onChange={(e) => setNewDataGroup({ ...newDataGroup, purpose_en: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>{language === "en" ? "Data Types in Group *" : "ประเภทข้อมูลในกลุ่ม *"}</Label>
                        <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded p-4">
                          {currentDataTypes
                            .filter((dt) => dt.status === "Active")
                            .map((dataType) => (
                              <div key={dataType.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={dataType.id}
                                  checked={newDataGroup.dataTypes.includes(dataType.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      setNewDataGroup({
                                        ...newDataGroup,
                                        dataTypes: [...newDataGroup.dataTypes, dataType.id],
                                      })
                                    } else {
                                      setNewDataGroup({
                                        ...newDataGroup,
                                        dataTypes: newDataGroup.dataTypes.filter((id) => id !== dataType.id),
                                      })
                                    }
                                  }}
                                />
                                <Label htmlFor={dataType.id} className="text-sm">
                                  {getLocalizedName(dataType, language)}
                                </Label>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateDataGroup}>{language === "en" ? "Create" : "สร้าง"}</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentDataGroups.map((group) => (
                  <Card key={group.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{getLocalizedName(group, language)}</CardTitle>
                          <CardDescription>{getLocalizedDescription(group, language)}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">{language === "en" ? "Purpose:" : "วัตถุประสงค์:"}</Label>
                          <p className="text-sm text-muted-foreground mt-1">{getLocalizedPurpose(group, language)}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            {language === "en" ? "Data Types in Group:" : "ประเภทข้อมูลในกลุ่ม:"}
                          </Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {getDataTypesInGroup(group.id).map((dataType) => (
                              <Badge key={dataType.id} variant="outline" className="text-xs">
                                {getLocalizedName(dataType, language)}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
