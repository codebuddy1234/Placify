import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  User,
  FileText,
  Briefcase,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react"

export default function StudentDashboard() {
  const profileCompletion = 85

  const applications = [
    {
      company: "Google",
      role: "Software Engineer",
      status: "Under Review",
      appliedDate: "Dec 20, 2024",
      type: "review",
    },
    {
      company: "Microsoft",
      role: "SDE Intern",
      status: "Shortlisted",
      appliedDate: "Dec 18, 2024",
      type: "shortlisted",
    },
    {
      company: "Amazon",
      role: "Full Stack Developer",
      status: "Applied",
      appliedDate: "Dec 22, 2024",
      type: "applied",
    },
  ]

  const upcomingInterviews = [
    {
      company: "Microsoft",
      role: "SDE Intern",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "Technical Round",
    },
    {
      company: "Google",
      role: "Software Engineer",
      date: "Dec 30",
      time: "2:00 PM",
      type: "HR Round",
    },
  ]

  const availableDrives = [
    {
      company: "Meta",
      role: "Frontend Developer",
      package: "30-35 LPA",
      deadline: "3 days left",
      eligible: true,
    },
    {
      company: "Apple",
      role: "iOS Developer",
      package: "35-40 LPA",
      deadline: "5 days left",
      eligible: true,
    },
    {
      company: "Netflix",
      role: "Backend Engineer",
      package: "28-32 LPA",
      deadline: "7 days left",
      eligible: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="Student Dashboard" />

      <div className="p-6 space-y-6">
        {/* Welcome Card */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Welcome back, Rahul!</h2>
                <p className="text-muted-foreground mt-1">You have 2 upcoming interviews this week</p>
              </div>
              <div className="flex items-center gap-3">
                <Button>View Interviews</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Profile Score</p>
                  <p className="text-2xl font-bold text-foreground">{profileCompletion}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold text-foreground">{applications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Interviews</p>
                  <p className="text-2xl font-bold text-foreground">{upcomingInterviews.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resume Score</p>
                  <p className="text-2xl font-bold text-foreground">92/100</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion */}
        {profileCompletion < 100 && (
          <Card className="border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/10">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Complete Your Profile</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your profile is {profileCompletion}% complete. Add missing information to increase your chances.
                  </p>
                  <Progress value={profileCompletion} className="mt-3 h-2" />
                  <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                    Complete Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Application Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Applications</CardTitle>
                  <CardDescription>Track your application status</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {applications.map((app, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{app.company}</h4>
                      <p className="text-sm text-muted-foreground">{app.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">Applied on {app.appliedDate}</p>
                    </div>
                    <div>
                      {app.type === "shortlisted" && (
                        <Badge className="gap-1 bg-green-500/10 text-green-700">
                          <CheckCircle className="h-3 w-3" />
                          {app.status}
                        </Badge>
                      )}
                      {app.type === "review" && (
                        <Badge className="gap-1 bg-blue-500/10 text-blue-700">
                          <Clock className="h-3 w-3" />
                          {app.status}
                        </Badge>
                      )}
                      {app.type === "applied" && (
                        <Badge variant="secondary" className="gap-1">
                          <FileText className="h-3 w-3" />
                          {app.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Prepare for your scheduled interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{interview.company}</h4>
                        <Badge variant="outline" className="text-xs">
                          {interview.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{interview.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {interview.date} at {interview.time}
                      </p>
                      <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Drives */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Available Placement Drives</CardTitle>
                <CardDescription>New opportunities matching your profile</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableDrives.map((drive, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-lg border p-4 ${
                    drive.eligible ? "border-border hover:bg-accent" : "border-border/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{drive.company}</h4>
                        {!drive.eligible && <Badge variant="outline">Not Eligible</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{drive.role}</p>
                      <p className="text-xs text-muted-foreground mt-1">Package: {drive.package}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-2">
                      <Clock className="mr-1 h-3 w-3" />
                      {drive.deadline}
                    </Badge>
                    {drive.eligible && <Button size="sm">Apply Now</Button>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
