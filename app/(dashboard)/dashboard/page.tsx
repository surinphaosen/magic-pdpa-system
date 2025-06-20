"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, Activity, Shield, AlertTriangle, Eye, Users, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

const statsCards = [
  {
    title: "Total RoPA Records",
    value: "47",
    change: "+3 this month",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Today's Activity Logs",
    value: "23",
    change: "+12 from yesterday",
    icon: Activity,
    color: "text-green-600",
  },
  {
    title: "Active Consents",
    value: "1,247",
    change: "94% opt-in rate",
    icon: Shield,
    color: "text-purple-600",
  },
  {
    title: "High Risk Assessments",
    value: "3",
    change: "Requires attention",
    icon: AlertTriangle,
    color: "text-red-600",
  },
]

const complianceData = [
  { label: "Complete RoPA Records", value: 89, color: "bg-green-600" },
  { label: "Valid Consents", value: 94, color: "bg-blue-600" },
  { label: "Risk Assessments", value: 76, color: "bg-yellow-600" },
]

const recentActivities = [
  {
    type: "Data Access",
    user: "Somchai Jaidee • HR",
    status: "completed",
    time: "2 hours ago",
  },
  {
    type: "Consent Withdrawal",
    user: "System • Marketing",
    status: "processed",
    time: "4 hours ago",
  },
  {
    type: "RoPA Update",
    user: "Niran Suksan • IT",
    status: "pending",
    time: "6 hours ago",
  },
]

const upcomingTasks = [
  {
    title: "Review HR Department RoPA",
    date: "2024-01-15",
    priority: "high",
  },
  {
    title: "Consent Expiry - Marketing Dept",
    date: "2024-01-18",
    priority: "medium",
  },
  {
    title: "Quarterly Risk Assessment",
    date: "2024-01-20",
    priority: "low",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()

  const handleViewReports = () => {
    // Navigate to reports page or show reports modal
    window.open("/reports", "_blank")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">PDPA Dashboard</h1>
          <p className="text-muted-foreground">Overview of Personal Data Protection Act compliance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleViewReports}>
            <Eye className="w-4 h-4 mr-2" />
            View Reports
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceData.map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/ropa/create">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Create New RoPA
              </Button>
            </Link>
            <Link href="/logs/create">
              <Button variant="outline" className="w-full justify-start">
                <Activity className="w-4 h-4 mr-2" />
                Log Activity
              </Button>
            </Link>
            <Link href="/consent">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Manage Consent
              </Button>
            </Link>
            <Link href="/settings/data-master">
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Data Master
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.type}</p>
                    <p className="text-xs text-muted-foreground">{activity.user}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        activity.status === "completed"
                          ? "default"
                          : activity.status === "processed"
                            ? "secondary"
                            : "outline"
                      }
                      className="mb-1"
                    >
                      {activity.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Upcoming Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.date}</p>
                  </div>
                  <Badge
                    variant={
                      task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
