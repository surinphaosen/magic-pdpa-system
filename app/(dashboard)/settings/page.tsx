"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useOrganization } from "@/components/organization-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Database, HardDrive, Settings, GroupIcon as Organization, Save, Shield, Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"

export default function SettingsPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const { organizationData, updateOrganization } = useOrganization()
  const router = useRouter()

  // Local state for form data
  const [formData, setFormData] = useState(organizationData)

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    enableTwoFactor: false,
    enableAuditLog: true,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
    dataBreachAlerts: true,
    complianceReminders: true,
    weeklyReports: true,
    monthlyReports: true,
  })

  const [systemSettings, setSystemSettings] = useState({
    defaultLanguage: "en",
    timezone: "Asia/Bangkok",
    dateFormat: "DD/MM/YYYY",
    autoBackup: true,
    backupFrequency: "daily",
    dataRetentionDays: 365,
    enableMaintenance: false,
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSecurity = localStorage.getItem("securitySettings")
    const savedNotifications = localStorage.getItem("notificationSettings")
    const savedSystem = localStorage.getItem("systemSettings")

    if (savedSecurity) {
      setSecuritySettings(JSON.parse(savedSecurity))
    }
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications))
    }
    if (savedSystem) {
      setSystemSettings(JSON.parse(savedSystem))
    }
  }, [])

  // Update form data when organization data changes
  useEffect(() => {
    setFormData(organizationData)
  }, [organizationData])

  if (user?.role !== "Admin") {
    router.push("/dashboard")
    return null
  }

  const handleSave = () => {
    // Update organization data
    updateOrganization(formData)

    // Save other settings to localStorage
    localStorage.setItem("securitySettings", JSON.stringify(securitySettings))
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))
    localStorage.setItem("systemSettings", JSON.stringify(systemSettings))

    console.log("Saving settings:", {
      organization: formData,
      security: securitySettings,
      notifications: notificationSettings,
      system: systemSettings,
    })

    toast.success("Settings saved successfully!")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("settings.title")}</h1>
          <p className="text-muted-foreground">Manage system configuration and master data</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="organization" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="organization" className="flex items-center gap-2">
            <Organization className="w-4 h-4" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="data-management" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Data Management
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="organization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Organization className="w-5 h-5" />
                Organization Information
              </CardTitle>
              <CardDescription>Manage basic organization information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name (English)</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyNameTh">Company Name (Thai)</Label>
                  <Input
                    id="companyNameTh"
                    value={formData.companyNameTh}
                    onChange={(e) => setFormData({ ...formData, companyNameTh: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID</Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Data Protection Officer (DPO)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dpoName">DPO Name</Label>
                  <Input
                    id="dpoName"
                    value={formData.dpoName}
                    onChange={(e) => setFormData({ ...formData, dpoName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dpoEmail">DPO Email</Label>
                  <Input
                    id="dpoEmail"
                    type="email"
                    value={formData.dpoEmail}
                    onChange={(e) => setFormData({ ...formData, dpoEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dpoPhone">DPO Phone</Label>
                  <Input
                    id="dpoPhone"
                    value={formData.dpoPhone}
                    onChange={(e) => setFormData({ ...formData, dpoPhone: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-management" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/settings/data-master">
              <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Master Data</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    จัดการข้อมูลหลักที่ใช้ร่วมกันในระบบ เช่น หน่วยงาน แผนก และข้อมูลอ้างอิงอื่นๆ
                  </CardDescription>
                  <div className="mt-4">
                    <Button size="sm" className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      จัดการ Master Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/settings/data-types">
              <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Types & Groups</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    จัดการประเภทข้อมูลส่วนบุคคลและจัดกลุ่มข้อมูลสำหรับใช้ในระบบ PDPA
                  </CardDescription>
                  <div className="mt-4">
                    <Button size="sm" className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      จัดการ Data Types
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/settings/assets">
              <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Asset Directory</CardTitle>
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    จัดการระบบฮาร์ดแวร์ ซอฟต์แวร์ และบริการคลาวด์ที่ใช้เก็บข้อมูลส่วนบุคคล
                  </CardDescription>
                  <div className="mt-4">
                    <Button size="sm" className="w-full">
                      <HardDrive className="w-4 h-4 mr-2" />
                      จัดการ Assets
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
              <CardDescription>Configure password requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={securitySettings.passwordMinLength}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, passwordMinLength: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) =>
                      setSecuritySettings({ ...securitySettings, maxLoginAttempts: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireUppercase">Require Uppercase Letters</Label>
                  <Switch
                    id="requireUppercase"
                    checked={securitySettings.requireUppercase}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, requireUppercase: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireNumbers">Require Numbers</Label>
                  <Switch
                    id="requireNumbers"
                    checked={securitySettings.requireNumbers}
                    onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requireNumbers: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableTwoFactor">Enable Two-Factor Authentication</Label>
                  <Switch
                    id="enableTwoFactor"
                    checked={securitySettings.enableTwoFactor}
                    onCheckedChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, enableTwoFactor: checked })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>Configure session and audit settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) =>
                    setSecuritySettings({ ...securitySettings, sessionTimeout: Number.parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="enableAuditLog">Enable Audit Logging</Label>
                <Switch
                  id="enableAuditLog"
                  checked={securitySettings.enableAuditLog}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableAuditLog: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="smsNotifications">SMS Notifications</Label>
                <Switch
                  id="smsNotifications"
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="systemAlerts">System Alerts</Label>
                <Switch
                  id="systemAlerts"
                  checked={notificationSettings.systemAlerts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, systemAlerts: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="dataBreachAlerts">Data Breach Alerts</Label>
                <Switch
                  id="dataBreachAlerts"
                  checked={notificationSettings.dataBreachAlerts}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, dataBreachAlerts: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Report Settings</CardTitle>
              <CardDescription>Configure automated reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="weeklyReports">Weekly Reports</Label>
                <Switch
                  id="weeklyReports"
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, weeklyReports: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="monthlyReports">Monthly Reports</Label>
                <Switch
                  id="monthlyReports"
                  checked={notificationSettings.monthlyReports}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, monthlyReports: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="complianceReminders">Compliance Reminders</Label>
                <Switch
                  id="complianceReminders"
                  checked={notificationSettings.complianceReminders}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, complianceReminders: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
              <CardDescription>Configure system-wide settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select
                    value={systemSettings.defaultLanguage}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, defaultLanguage: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="th">ไทย</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={systemSettings.timezone}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Bangkok">Asia/Bangkok</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateFormat">Date Format</Label>
                <Select
                  value={systemSettings.dateFormat}
                  onValueChange={(value) => setSystemSettings({ ...systemSettings, dateFormat: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Configure data retention and backup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataRetentionDays">Data Retention (days)</Label>
                <Input
                  id="dataRetentionDays"
                  type="number"
                  value={systemSettings.dataRetentionDays}
                  onChange={(e) =>
                    setSystemSettings({ ...systemSettings, dataRetentionDays: Number.parseInt(e.target.value) })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="autoBackup">Enable Auto Backup</Label>
                <Switch
                  id="autoBackup"
                  checked={systemSettings.autoBackup}
                  onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, autoBackup: checked })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Backup Frequency</Label>
                <Select
                  value={systemSettings.backupFrequency}
                  onValueChange={(value) => setSystemSettings({ ...systemSettings, backupFrequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
