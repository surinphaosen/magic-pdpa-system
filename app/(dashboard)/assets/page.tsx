"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Edit, MoreHorizontal, Server, Database, Cloud, HardDrive } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockAssetData = [
  {
    id: "AST-001",
    name: "HR Database Server",
    type: "hardware",
    category: "server",
    deployment: "onPremise",
    location: "Data Center - Floor 3",
    dataTypes: ["Employee Data", "Financial Data"],
    riskLevel: "High",
    status: "Active",
    lastUpdated: "2024-01-10",
    owner: "IT Department",
  },
  {
    id: "AST-002",
    name: "Customer CRM System",
    type: "software",
    category: "application",
    deployment: "cloud",
    location: "AWS Singapore",
    dataTypes: ["Customer Data", "Contact Information"],
    riskLevel: "Medium",
    status: "Active",
    lastUpdated: "2024-01-08",
    owner: "Marketing Department",
  },
  {
    id: "AST-003",
    name: "Backup Storage",
    type: "hardware",
    category: "storage",
    deployment: "hybrid",
    location: "On-site + Cloud Backup",
    dataTypes: ["All Data Types"],
    riskLevel: "High",
    status: "Active",
    lastUpdated: "2024-01-05",
    owner: "IT Department",
  },
]

export default function AssetsPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [deploymentFilter, setDeploymentFilter] = useState("all")

  const filteredData = mockAssetData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesDeployment = deploymentFilter === "all" || item.deployment === deploymentFilter
    const matchesUserDepartment = user?.role === "Admin" || user?.department === item.owner.split(" ")[0]

    return matchesSearch && matchesType && matchesDeployment && matchesUserDepartment
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hardware":
        return Server
      case "software":
        return Database
      case "database":
        return Database
      default:
        return HardDrive
    }
  }

  const getDeploymentIcon = (deployment: string) => {
    switch (deployment) {
      case "cloud":
        return Cloud
      case "onPremise":
        return Server
      case "hybrid":
        return Database
      default:
        return Server
    }
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

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("assets.title")}</h1>
          <p className="text-muted-foreground">{t("assets.subtitle")}</p>
        </div>
        <Link href="/assets/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {t("assets.createNew")}
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <Server className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssetData.length}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cloud Assets</CardTitle>
            <Cloud className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssetData.filter((a) => a.deployment === "cloud").length}</div>
            <p className="text-xs text-muted-foreground">External hosting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Premise</CardTitle>
            <Server className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssetData.filter((a) => a.deployment === "onPremise").length}</div>
            <p className="text-xs text-muted-foreground">Internal hosting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <Database className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssetData.filter((a) => a.riskLevel === "High").length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("common.filter")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search assets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Asset Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hardware">{t("assets.types.hardware")}</SelectItem>
                <SelectItem value="software">{t("assets.types.software")}</SelectItem>
                <SelectItem value="database">{t("assets.types.database")}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={deploymentFilter} onValueChange={setDeploymentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Deployment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Deployments</SelectItem>
                <SelectItem value="onPremise">{t("assets.deployment.onPremise")}</SelectItem>
                <SelectItem value="cloud">{t("assets.deployment.cloud")}</SelectItem>
                <SelectItem value="hybrid">{t("assets.deployment.hybrid")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assets ({filteredData.length})</CardTitle>
          <CardDescription>Manage systems and locations where personal data is stored</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>{t("common.type")}</TableHead>
                <TableHead>Deployment</TableHead>
                <TableHead>{t("common.location")}</TableHead>
                <TableHead>Data Types</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>{t("common.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => {
                const TypeIcon = getTypeIcon(item.type)
                const DeploymentIcon = getDeploymentIcon(item.deployment)
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TypeIcon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{t(`assets.types.${item.type}`)}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <DeploymentIcon className="h-4 w-4 text-muted-foreground" />
                        {t(`assets.deployment.${item.deployment}`)}
                      </div>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {item.dataTypes.slice(0, 2).map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                        {item.dataTypes.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{item.dataTypes.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(item.riskLevel)}>{item.riskLevel}</Badge>
                    </TableCell>
                    <TableCell>{item.owner}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            {t("common.view")} Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {t("common.edit")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
