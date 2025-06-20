"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HardDrive, Database, Cloud, Server, Monitor, Plus, Search, Edit, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const mockAssets = [
  {
    id: "asset-001",
    name: "HR Database Server",
    type: "Hardware",
    category: "Server",
    deployment: "On-Premise",
    location: "Data Center - Bangkok",
    owner: "IT Department",
    status: "Active",
    description: "Primary database server for HR management system",
  },
  {
    id: "asset-002",
    name: "Customer CRM System",
    type: "Software",
    category: "Application",
    deployment: "Cloud",
    location: "AWS Singapore",
    owner: "Sales Department",
    status: "Active",
    description: "Salesforce CRM for customer relationship management",
  },
  {
    id: "asset-003",
    name: "Email Marketing Platform",
    type: "Service",
    category: "Application",
    deployment: "Cloud",
    location: "Mailchimp US",
    owner: "Marketing Department",
    status: "Active",
    description: "Email marketing and automation platform",
  },
  {
    id: "asset-004",
    name: "File Storage Server",
    type: "Hardware",
    category: "Storage",
    deployment: "On-Premise",
    location: "Office - Floor 3",
    owner: "IT Department",
    status: "Active",
    description: "Network attached storage for file sharing",
  },
  {
    id: "asset-005",
    name: "Backup System",
    type: "Hardware",
    category: "Storage",
    deployment: "Hybrid",
    location: "On-site + Cloud",
    owner: "IT Department",
    status: "Active",
    description: "Automated backup system with cloud replication",
  },
]

const getAssetIcon = (type: string) => {
  switch (type) {
    case "Hardware":
      return <Server className="w-4 h-4" />
    case "Software":
      return <Monitor className="w-4 h-4" />
    case "Database":
      return <Database className="w-4 h-4" />
    case "Service":
      return <Cloud className="w-4 h-4" />
    default:
      return <HardDrive className="w-4 h-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800"
    case "Inactive":
      return "bg-gray-100 text-gray-800"
    case "Maintenance":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getDeploymentColor = (deployment: string) => {
  switch (deployment) {
    case "On-Premise":
      return "bg-blue-100 text-blue-800"
    case "Cloud":
      return "bg-purple-100 text-purple-800"
    case "Hybrid":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AssetsPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  if (user?.role !== "Admin") {
    router.push("/dashboard")
    return null
  }

  const filteredAssets = mockAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/settings">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Settings
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Asset Directory</h1>
            <p className="text-muted-foreground">Manage data storage assets and infrastructure</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Asset
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssets.length}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hardware</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssets.filter((a) => a.type === "Hardware").length}</div>
            <p className="text-xs text-muted-foreground">Physical infrastructure</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Software</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssets.filter((a) => a.type === "Software").length}</div>
            <p className="text-xs text-muted-foreground">Applications & systems</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cloud Services</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAssets.filter((a) => a.type === "Service").length}</div>
            <p className="text-xs text-muted-foreground">External services</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Inventory</CardTitle>
          <CardDescription>Complete list of data storage assets and infrastructure</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Deployment</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAssets.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getAssetIcon(asset.type)}
                      <div>
                        <div className="font-medium">{asset.name}</div>
                        <div className="text-sm text-muted-foreground">{asset.description}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{asset.type}</Badge>
                  </TableCell>
                  <TableCell>{asset.category}</TableCell>
                  <TableCell>
                    <Badge className={getDeploymentColor(asset.deployment)}>{asset.deployment}</Badge>
                  </TableCell>
                  <TableCell>{asset.location}</TableCell>
                  <TableCell>{asset.owner}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(asset.status)}>{asset.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
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
    </div>
  )
}
