import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Calendar, FileText, TrendingUp, Eye } from "lucide-react"

export default function CompanyDashboard() {
  const stats = [
    {
      title: "Active Job Postings",
      value: "5",
      icon: Briefcase,
      color: "primary",
    },
    {
      title: "Total Applications",
      value: "247",
      icon: FileText,
      color: "blue",
    },
    {
      title: "Shortlisted Candidates",
      value: "82",
      icon: Users,
      color: "green",
    },
    {
      title: "Interviews Scheduled",
      value: "18",
      icon: Calendar,
      color: "purple",
    },
  ]

  const jobPostings = [
    {
      role: "Software Engineer",
      type: "Full Time",
      package: "28-35 LPA",
      applications: 124,
      shortlisted: 45,
      status: "active",
      deadline: "Dec 30, 2024",
    },
    {
      role: "SDE Intern",
      type: "Internship",
      package: "1L/month",
      applications: 98,
      shortlisted: 32,
      status: "active",
      deadline: "Dec 28, 2024",
    },
    {
      role: "Full Stack Developer",
      type: "Full Time",
      package: "25-30 LPA",
      applications: 156,
      shortlisted: 60,
      status: "active",
      deadline: "Jan 5, 2025",
    },
  ]

  const recentApplications = [
    {
      name: "Rahul Sharma",
      role: "Software Engineer",
      cgpa: 9.2,
      skills: ["React", "Node.js", "Python"],
      resumeScore: 92,
      status: "pending",
    },
    {
      name: "Priya Patel",
      role: "SDE Intern",
      cgpa: 8.9,
      skills: ["Java", "Spring Boot", "MySQL"],
      resumeScore: 88,
      status: "pending",
    },
    {
      name: "Amit Kumar",
      role: "Full Stack Developer",
      cgpa: 8.5,
      skills: ["Angular", "TypeScript", "MongoDB"],
      resumeScore: 85,
      status: "pending",
    },
  ]

  const upcomingInterviews = [
    {
      candidate: "Sneha Reddy",
      role: "Software Engineer",
      date: "Tomorrow",
      time: "10:00 AM",
      round: "Technical",
    },
    {
      candidate: "Vikram Singh",
      role: "SDE Intern",
      date: "Dec 29",
      time: "2:00 PM",
      round: "HR",
    },
    {
      candidate: "Anita Desai",
      role: "Full Stack Developer",
      date: "Dec 30",
      time: "11:00 AM",
      round: "Technical",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="Company Dashboard" />

      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Welcome to Google Recruitment</h2>
                <p className="text-muted-foreground mt-1">Manage your campus recruitment process efficiently</p>
              </div>
              <Button className="gap-2">
                <Briefcase className="h-4 w-4" />
                Create New Job
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                        stat.color === "primary"
                          ? "bg-primary/10"
                          : stat.color === "blue"
                            ? "bg-blue-500/10"
                            : stat.color === "green"
                              ? "bg-green-500/10"
                              : "bg-purple-500/10"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          stat.color === "primary"
                            ? "text-primary"
                            : stat.color === "blue"
                              ? "text-blue-600"
                              : stat.color === "green"
                                ? "text-green-600"
                                : "text-purple-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Job Postings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Job Postings</CardTitle>
                <CardDescription>Your current recruitment drives</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobPostings.map((job, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{job.role}</h4>
                        <Badge variant="secondary">{job.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Package: {job.package} • Deadline: {job.deadline}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{job.applications}</p>
                      <p className="text-xs text-muted-foreground">Applications</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{job.shortlisted}</p>
                      <p className="text-xs text-muted-foreground">Shortlisted</p>
                    </div>
                    <Button size="sm">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>New candidates awaiting review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((application, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-foreground">{application.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          CGPA: {application.cgpa}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{application.role}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {application.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {application.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{application.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-center mr-2">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="text-sm font-bold text-foreground">{application.resumeScore}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
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
              <CardDescription>Scheduled candidate interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-accent"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{interview.candidate}</h4>
                        <p className="text-sm text-muted-foreground">{interview.role}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {interview.date} at {interview.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">{interview.round}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recruitment Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Recruitment Pipeline</CardTitle>
            <CardDescription>Overall hiring progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              <div className="text-center">
                <div className="flex h-16 w-full items-center justify-center rounded-lg bg-primary/10">
                  <p className="text-2xl font-bold text-primary">247</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-2">Applications</p>
              </div>
              <div className="text-center">
                <div className="flex h-16 w-full items-center justify-center rounded-lg bg-blue-500/10">
                  <p className="text-2xl font-bold text-blue-600">82</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-2">Shortlisted</p>
              </div>
              <div className="text-center">
                <div className="flex h-16 w-full items-center justify-center rounded-lg bg-purple-500/10">
                  <p className="text-2xl font-bold text-purple-600">56</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-2">Interviewed</p>
              </div>
              <div className="text-center">
                <div className="flex h-16 w-full items-center justify-center rounded-lg bg-yellow-500/10">
                  <p className="text-2xl font-bold text-yellow-600">28</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-2">Final Round</p>
              </div>
              <div className="text-center">
                <div className="flex h-16 w-full items-center justify-center rounded-lg bg-green-500/10">
                  <p className="text-2xl font-bold text-green-600">15</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-2">Offers Made</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
