"use client";
import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, Database } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
const initialMasterData = {
    businessUnits: [
        {
            id: "1",
            name: "Corporate",
            code: "CORP",
            description: "Corporate functions",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "2",
            name: "Operations",
            code: "OPS",
            description: "Operational activities",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "3",
            name: "Support",
            code: "SUP",
            description: "Support functions",
            status: "Active",
            createdDate: "2024-01-01",
        },
    ],
    departments: [
        {
            id: "1",
            name: "Human Resources",
            code: "HR",
            description: "Human resources management",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "2",
            name: "Information Technology",
            code: "IT",
            description: "Technology and systems",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "3",
            name: "Marketing",
            code: "MKT",
            description: "Marketing and communications",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "4",
            name: "Finance",
            code: "FIN",
            description: "Financial management",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "5",
            name: "Legal",
            code: "LEG",
            description: "Legal and compliance",
            status: "Active",
            createdDate: "2024-01-01",
        },
    ],
    dataSubjectTypes: [
        {
            id: "1",
            name: "Employees",
            description: "Current and former employees",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "2",
            name: "Customers",
            description: "External customers",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "3",
            name: "Suppliers",
            description: "Business partners and suppliers",
            status: "Active",
            createdDate: "2024-01-01",
        },
        { id: "4", name: "Visitors", description: "Office visitors", status: "Active", createdDate: "2024-01-01" },
        {
            id: "5",
            name: "Job Applicants",
            description: "Potential employees",
            status: "Active",
            createdDate: "2024-01-01",
        },
    ],
    dataCategories: [
        {
            id: "1",
            name: "Identity Data",
            description: "Names, identification numbers",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "2",
            name: "Contact Data",
            description: "Addresses, phone numbers, emails",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "3",
            name: "Financial Data",
            description: "Bank details, salary information",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "4",
            name: "Health Data",
            description: "Medical information",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "5",
            name: "Employment Data",
            description: "Job history, performance",
            status: "Active",
            createdDate: "2024-01-01",
        },
    ],
    lawfulBases: [
        {
            id: "1",
            name: "Consent",
            description: "Data subject has given consent",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "2",
            name: "Contract",
            description: "Processing necessary for contract",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "3",
            name: "Legal Obligation",
            description: "Compliance with legal obligation",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "4",
            name: "Vital Interests",
            description: "Protection of vital interests",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "5",
            name: "Public Task",
            description: "Performance of public task",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "6",
            name: "Legitimate Interests",
            description: "Legitimate interests pursued",
            status: "Active",
            createdDate: "2024-01-01",
        },
    ],
    eventTypes: [
        {
            id: "1",
            name: "Data Access",
            description: "Authorized data access",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "2",
            name: "Data Breach",
            description: "Security incident",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "3",
            name: "Consent Withdrawal",
            description: "User withdrew consent",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "4",
            name: "Data Request",
            description: "Data subject request",
            status: "Active",
            createdDate: "2024-01-01",
        },
        {
            id: "5",
            name: "System Maintenance",
            description: "System maintenance activity",
            status: "Active",
            createdDate: "2024-01-01",
        },
    ],
};
export default function DataMasterPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [masterData, setMasterData] = useState(initialMasterData);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("businessUnits");
    const [newItem, setNewItem] = useState({ name: "", code: "", description: "" });
    // Redirect if not admin
    if ((user === null || user === void 0 ? void 0 : user.role) !== "Admin") {
        router.push("/dashboard");
        return null;
    }
    const handleCreateItem = () => {
        if (!newItem.name) {
            toast.error("Name is required");
            return;
        }
        const newId = (masterData[currentCategory].length + 1).toString();
        const item = {
            id: newId,
            name: newItem.name,
            code: newItem.code,
            description: newItem.description,
            status: "Active",
            createdDate: new Date().toISOString().split("T")[0],
        };
        setMasterData((prev) => (Object.assign(Object.assign({}, prev), { [currentCategory]: [...prev[currentCategory], item] })));
        setNewItem({ name: "", code: "", description: "" });
        setIsCreateDialogOpen(false);
        toast.success("Item created successfully!");
    };
    const handleDeleteItem = (category, id) => {
        setMasterData((prev) => (Object.assign(Object.assign({}, prev), { [category]: prev[category].filter((item) => item.id !== id) })));
        toast.success("Item deleted successfully!");
    };
    const categoryLabels = {
        businessUnits: "Business Units",
        departments: "Departments",
        dataSubjectTypes: "Data Subject Types",
        dataCategories: "Data Categories",
        lawfulBases: "Lawful Bases",
        eventTypes: "Event Types",
    };
    const renderMasterTable = (category) => {
        const data = masterData[category];
        return (<Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{categoryLabels[category]}</CardTitle>
              <CardDescription>Manage {categoryLabels[category].toLowerCase()} used across the system</CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen && currentCategory === category} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setCurrentCategory(category)}>
                  <Plus className="w-4 h-4 mr-2"/>
                  Add {categoryLabels[category].slice(0, -1)}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New {categoryLabels[category].slice(0, -1)}</DialogTitle>
                  <DialogDescription>
                    Create a new {categoryLabels[category].toLowerCase().slice(0, -1)}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" value={newItem.name} onChange={(e) => setNewItem(Object.assign(Object.assign({}, newItem), { name: e.target.value }))}/>
                  </div>
                  {category !== "dataSubjectTypes" && category !== "dataCategories" && (<div className="space-y-2">
                      <Label htmlFor="code">Code</Label>
                      <Input id="code" value={newItem.code} onChange={(e) => setNewItem(Object.assign(Object.assign({}, newItem), { code: e.target.value }))}/>
                    </div>)}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" value={newItem.description} onChange={(e) => setNewItem(Object.assign(Object.assign({}, newItem), { description: e.target.value }))}/>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleCreateItem}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                {(category === "businessUnits" || category === "departments") && <TableHead>Code</TableHead>}
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (<TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  {(category === "businessUnits" || category === "departments") && <TableCell>{item.code}</TableCell>}
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Active" ? "default" : "secondary"}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>{item.createdDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4"/>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteItem(category, item.id)} className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4"/>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>);
    };
    return (<div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Master Management</h1>
          <p className="text-muted-foreground">Manage master data used across all PDPA modules</p>
        </div>
        <Button onClick={() => toast.success("All changes saved!")}>
          <Save className="w-4 h-4 mr-2"/>
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="businessUnits" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="businessUnits" className="flex items-center gap-2">
            <Database className="w-4 h-4"/>
            Business Units
          </TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="dataSubjectTypes">Data Subjects</TabsTrigger>
          <TabsTrigger value="dataCategories">Data Categories</TabsTrigger>
          <TabsTrigger value="lawfulBases">Lawful Bases</TabsTrigger>
          <TabsTrigger value="eventTypes">Event Types</TabsTrigger>
        </TabsList>

        <TabsContent value="businessUnits">{renderMasterTable("businessUnits")}</TabsContent>

        <TabsContent value="departments">{renderMasterTable("departments")}</TabsContent>

        <TabsContent value="dataSubjectTypes">{renderMasterTable("dataSubjectTypes")}</TabsContent>

        <TabsContent value="dataCategories">{renderMasterTable("dataCategories")}</TabsContent>

        <TabsContent value="lawfulBases">{renderMasterTable("lawfulBases")}</TabsContent>

        <TabsContent value="eventTypes">{renderMasterTable("eventTypes")}</TabsContent>
      </Tabs>
    </div>);
}
