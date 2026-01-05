import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Briefcase,
  TrendingUp,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function CoordinatorDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,248",
      change: "+12%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Active Drives",
      value: "8",
      change: "3 closing soon",
      icon: Briefcase,
      trend: "neutral",
    },
    {
      title: "Students Placed",
      value: "856",
      change: "68.6%",
      icon: CheckCircle2,
      trend: "up",
    },
    {
      title: "Upcoming Interviews",
      value: "24",
      change: "This week",
      icon: Calendar,
      trend: "neutral",
    },
  ]

  const upcomingInterviews = [
    {
      company: "Google",
      role: "Software Engineer",
      date: "Today",
      time: "2:00 PM",
      students: 12,
      status: "upcoming",
    },
    {
      company: "Microsoft",
      role: "SDE Intern",
      date: "Tomorrow",
      time: "10:00 AM",
      students: 8,
      status: "upcoming",
    },
    {
      company: "Amazon",
      role: "Full Stack Developer",
      date: "Dec 30",
      time: "3:30 PM",
      students: 15,
      status: "scheduled",
    },
  ]

  const recentActivities = [
    {
      action: "New placement drive created",
      company: "Apple",
      time: "2 hours ago",
      type: "drive",
    },
    {
      action: "Interview results uploaded",
      company: "Netflix",
      time: "4 hours ago",
      type: "result",
    },
    {
      action: "45 students applied",
      company: "Meta",
      time: "6 hours ago",
      type: "application",
    },
    {
      action: "Student profile approved",
      company: "System",
      time: "8 hours ago",
      type: "approval",
    },
  ]

  const pendingActions = [
    {
      title: "Review 23 student profiles",
      description: "Pending approval for placement eligibility",
      priority: "high",
    },
    {
      title: "Schedule interviews for Google",
      description: "12 students shortlisted",
      priority: "high",
    },
    {
      title: "Upload results for Amazon drive",
      description: "Interviews completed 2 days ago",
      priority: "medium",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="Dashboard" />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    {stat.trend === "up" && (
                      <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-700">
                        <TrendingUp className="h-3 w-3" />
                        {stat.change}
                      </Badge>
                    )}
                    {stat.trend === "neutral" && (
                      <Badge variant="secondary" className="text-muted-foreground">
                        {stat.change}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Placement Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Placement Progress 2024-25</CardTitle>
            <CardDescription>Overall placement statistics for current academic year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Total Placed</p>
                  <p className="text-2xl font-bold text-foreground">856 / 1,248</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">68.6%</p>
                  <p className="text-sm text-muted-foreground">Placement Rate</p>
                </div>
              </div>
              <Progress value={68.6} className="h-3" />
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground">856</p>
                    <p className="text-xs text-muted-foreground">Placed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground">124</p>
                    <p className="text-xs text-muted-foreground">In Process</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">268</p>
                    <p className="text-xs text-muted-foreground">Unplaced</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Interviews */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Scheduled interviews this week</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{interview.company}</h4>
                        <Badge variant="outline" className="text-xs">
                          {interview.students} students
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{interview.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {interview.date} at {interview.time}
                      </p>
                    </div>
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pending Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Actions</CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingActions.map((action, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                  >
                    <div
                      className={`mt-0.5 rounded-full p-1 ${
                        action.priority === "high" ? "bg-red-500/10" : "bg-yellow-500/10"
                      }`}
                    >
                      <AlertCircle
                        className={`h-4 w-4 ${action.priority === "high" ? "text-red-600" : "text-yellow-600"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{action.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      Action
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    {activity.type === "drive" && <Briefcase className="h-5 w-5 text-primary" />}
                    {activity.type === "result" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                    {activity.type === "application" && <Users className="h-5 w-5 text-primary" />}
                    {activity.type === "approval" && <CheckCircle2 className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.company}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
