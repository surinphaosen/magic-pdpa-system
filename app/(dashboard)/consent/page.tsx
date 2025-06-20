"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Eye, Download, Users, Shield, CheckCircle, XCircle, Clock } from "lucide-react"

const consentStats = [
  { label: "Total Consents", value: 1247, icon: Users, color: "text-blue-600" },
  { label: "Active Consents", value: 1180, icon: CheckCircle, color: "text-green-600" },
  { label: "Expired Consents", value: 45, icon: Clock, color: "text-yellow-600" },
  { label: "Withdrawn Consents", value: 22, icon: XCircle, color: "text-red-600" },
]

const consentForms = [
  {
    id: "CF-001",
    name: "Marketing Communications",
    purpose: "Email marketing and promotions",
    optInRate: 85,
    totalResponses: 1200,
    status: "Active",
    lastUpdated: "2024-01-10",
  },
  {
    id: "CF-002",
    name: "Data Analytics",
    purpose: "Website analytics and improvement",
    optInRate: 92,
    totalResponses: 980,
    status: "Active",
    lastUpdated: "2024-01-08",
  },
  {
    id: "CF-003",
    name: "Third-party Sharing",
    purpose: "Sharing data with business partners",
    optInRate: 45,
    totalResponses: 650,
    status: "Inactive",
    lastUpdated: "2024-01-05",
  },
]

const recentConsents = [
  {
    id: "C-001",
    email: "john.doe@email.com",
    phone: "+66 XX XXX XXXX",
    consentType: "Marketing",
    status: "Granted",
    date: "2024-01-15",
    expiryDate: "2025-01-15",
  },
  {
    id: "C-002",
    email: "jane.smith@email.com",
    phone: "+66 XX XXX XXXX",
    consentType: "Analytics",
    status: "Withdrawn",
    date: "2024-01-14",
    expiryDate: "N/A",
  },
]

export default function ConsentPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")

  const isReadOnly = user?.role === "Department User"

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Consent Management</h1>
          <p className="text-muted-foreground">Manage user consents and preferences</p>
        </div>
        {!isReadOnly && (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Consent Form
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {consentStats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stat.label === "Total Consents" && "94% opt-in rate"}
                {stat.label === "Active Consents" && "95% of total"}
                {stat.label === "Expired Consents" && "Requires renewal"}
                {stat.label === "Withdrawn Consents" && "2% withdrawal rate"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="forms" disabled={isReadOnly}>
            Consent Forms
          </TabsTrigger>
          <TabsTrigger value="lookup">Consent Lookup</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {/* Consent Overview Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Consent Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Active Consents</span>
                  <span className="font-medium">94.6%</span>
                </div>
                <Progress value={94.6} className="h-2" />

                <div className="flex justify-between text-sm">
                  <span>Expired Consents</span>
                  <span className="font-medium">3.6%</span>
                </div>
                <Progress value={3.6} className="h-2" />

                <div className="flex justify-between text-sm">
                  <span>Withdrawn Consents</span>
                  <span className="font-medium">1.8%</span>
                </div>
                <Progress value={1.8} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Consent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Consent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Consent Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Expiry</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentConsents.map((consent) => (
                    <TableRow key={consent.id}>
                      <TableCell className="font-medium">{consent.id}</TableCell>
                      <TableCell>{consent.email}</TableCell>
                      <TableCell>{consent.consentType}</TableCell>
                      <TableCell>
                        <Badge variant={consent.status === "Granted" ? "default" : "secondary"}>{consent.status}</Badge>
                      </TableCell>
                      <TableCell>{consent.date}</TableCell>
                      <TableCell>{consent.expiryDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consent Forms</CardTitle>
              <CardDescription>Manage consent forms and their opt-in rates</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Form Name</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Opt-in Rate</TableHead>
                    <TableHead>Responses</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consentForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-medium">{form.id}</TableCell>
                      <TableCell>{form.name}</TableCell>
                      <TableCell>{form.purpose}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={form.optInRate} className="w-16 h-2" />
                          <span className="text-sm font-medium">{form.optInRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{form.totalResponses}</TableCell>
                      <TableCell>
                        <Badge variant={form.status === "Active" ? "default" : "secondary"}>{form.status}</Badge>
                      </TableCell>
                      <TableCell>{form.lastUpdated}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lookup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Consent Lookup</CardTitle>
              <CardDescription>Search for user consent records by email or phone</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by email or phone number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
              </div>

              {searchTerm && (
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Search Results</h4>
                  <p className="text-sm text-muted-foreground">
                    Enter an email or phone number to view consent history
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
