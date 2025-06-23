"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Download, History } from "lucide-react";
import Link from "next/link";
export default function RopaDetailsPage() {
    var _a, _b;
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield fetch(`/api/ropa/${params.id}`);
                if (!res.ok)
                    throw new Error("Failed to fetch data");
                const record = yield res.json();
                setData(record);
            }
            catch (error) {
                console.error("Error fetching RoPA details:", error);
            }
            finally {
                setIsLoading(false);
            }
        });
        if (params.id) {
            fetchData();
        }
    }, [params.id]);
    if (isLoading)
        return <div>Loading...</div>;
    if (!data)
        return <div>Record not found</div>;
    const getRiskBadgeVariant = (risk) => {
        switch (risk) {
            case "High":
                return "destructive";
            case "Medium":
                return "default";
            case "Low":
                return "secondary";
            default:
                return "outline";
        }
    };
    const getStatusBadgeVariant = (status) => {
        return status === "Active" ? "default" : "secondary";
    };
    return (<div className="flex-1 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/ropa">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2"/>
              Back to RoPA List
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">RoPA Record Details</h1>
            <p className="text-muted-foreground">Record ID: {data.id}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <History className="w-4 h-4 mr-2"/>
              View History
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2"/>
              Export PDF
            </Button>
            <Link href={`/ropa/${id}/edit`}>
              <Button size="sm">
                <Edit className="w-4 h-4 mr-2"/>
                Edit Record
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Basic Information
                <div className="flex gap-2">
                  <Badge variant={getStatusBadgeVariant(data.status)}>{data.status}</Badge>
                  <Badge variant={getRiskBadgeVariant(data.riskLevel)}>{data.riskLevel} Risk</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Activity Name</label>
                    <p className="text-lg font-semibold">{data.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Department</label>
                    <p>{data.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Business Unit</label>
                    <p>{data.businessUnit}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Purpose</label>
                    <p>{data.purpose}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Data Controller</label>
                    <p>{data.dataController}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Lawful Basis</label>
                    <p>{data.lawfulBasis}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created Date</label>
                    <p>{data.createdDate}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <p>{data.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Contact Person</label>
                  <p className="font-medium">{data.contactPerson}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p>{data.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p>{data.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Processing Details */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Subjects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {((_a = data.dataSubjects) !== null && _a !== void 0 ? _a : []).map((subject) => (<Badge key={subject} variant="outline">
                      {subject}
                    </Badge>))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {((_b = data.dataCategories) !== null && _b !== void 0 ? _b : []).map((category) => (<Badge key={category} variant="outline">
                      {category}
                    </Badge>))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Processing Details */}
          <Card>
            <CardHeader>
              <CardTitle>Processing Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <p className="mt-1">{data.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Processors</label>
                    <p className="mt-1">{data.processors}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Data Transfer</label>
                    <p className="mt-1">{data.dataTransfer}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Retention Period</label>
                    <p className="mt-1">{data.retentionPeriod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Security Measures</label>
                    <p className="mt-1">{data.securityMeasures}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);
}
