"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, FileText, Download } from "lucide-react"

export default function ApplicationsPage() {
  const applications = [
    {
      id: 1,
      company: "Microsoft",
      role: "SDE Intern",
      appliedDate: "2024-01-15",
      status: "Under Review",
      stage: "Resume Screening",
      package: "12 LPA",
      nextStep: "Aptitude Test on Feb 10, 2024",
      timeline: [
        { step: "Applied", date: "Jan 15, 2024", completed: true },
        { step: "Resume Screening", date: "In Progress", completed: false },
        { step: "Aptitude Test", date: "Upcoming", completed: false },
        { step: "Technical Interview", date: "Pending", completed: false },
        { step: "HR Interview", date: "Pending", completed: false },
      ],
    },
    {
      id: 2,
      company: "Flipkart",
      role: "Backend Engineer",
      appliedDate: "2024-01-20",
      status: "Shortlisted",
      stage: "Technical Interview",
      package: "18 LPA",
      nextStep: "Interview scheduled on Feb 08, 2024 at 10:00 AM",
      timeline: [
        { step: "Applied", date: "Jan 20, 2024", completed: true },
        { step: "Resume Screening", date: "Jan 25, 2024", completed: true },
        { step: "Aptitude Test", date: "Jan 28, 2024", completed: true },
        { step: "Technical Interview", date: "Feb 08, 2024", completed: false },
        { step: "HR Interview", date: "Pending", completed: false },
      ],
    },
    {
      id: 3,
      company: "TCS",
      role: "Software Developer",
      appliedDate: "2024-01-10",
      status: "Rejected",
      stage: "Aptitude Test",
      package: "7 LPA",
      nextStep: null,
      timeline: [
        { step: "Applied", date: "Jan 10, 2024", completed: true },
        { step: "Resume Screening", date: "Jan 12, 2024", completed: true },
        { step: "Aptitude Test", date: "Jan 18, 2024", completed: true },
      ],
    },
    {
      id: 4,
      company: "Google India",
      role: "Software Engineer",
      appliedDate: "2024-01-22",
      status: "Applied",
      stage: "Application Submitted",
      package: "28 LPA",
      nextStep: "Waiting for resume screening",
      timeline: [{ step: "Applied", date: "Jan 22, 2024", completed: true }],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-500"
      case "Under Review":
        return "bg-blue-500"
      case "Rejected":
        return "bg-red-500"
      case "Applied":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Shortlisted":
        return <CheckCircle2 className="h-4 w-4" />
      case "Rejected":
        return <XCircle className="h-4 w-4" />
      case "Under Review":
        return <Clock className="h-4 w-4" />
      case "Applied":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <>
      <Header />
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
          <p className="text-muted-foreground">Track your placement application status</p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{applications.length}</div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">
                {applications.filter((a) => a.status === "Shortlisted").length}
              </div>
              <p className="text-sm text-muted-foreground">Shortlisted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {applications.filter((a) => a.status === "Under Review").length}
              </div>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">
                {applications.filter((a) => a.status === "Rejected").length}
              </div>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="space-y-6">
          {applications.map((application) => (
            <Card key={application.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{application.company}</CardTitle>
                    <p className="mt-1 text-muted-foreground">{application.role}</p>
                    <p className="mt-2 text-sm font-semibold text-foreground">{application.package}</p>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    <span className="mr-1">{getStatusIcon(application.status)}</span>
                    {application.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Applied on {new Date(application.appliedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Current Stage: {application.stage}
                    </div>
                  </div>

                  {application.nextStep && (
                    <div className="rounded-lg border border-border bg-muted/50 p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-semibold text-foreground">Next Step</h4>
                          <p className="mt-1 text-sm text-muted-foreground">{application.nextStep}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timeline */}
                  <div>
                    <h4 className="mb-4 text-sm font-semibold text-foreground">Application Timeline</h4>
                    <div className="relative space-y-4">
                      {application.timeline.map((item, index) => (
                        <div key={index} className="relative flex items-start gap-4">
                          <div className="relative flex flex-col items-center">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                item.completed ? "bg-primary" : "bg-muted"
                              }`}
                            >
                              {item.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                              ) : (
                                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                              )}
                            </div>
                            {index < application.timeline.length - 1 && (
                              <div className={`h-12 w-px ${item.completed ? "bg-primary" : "bg-muted"}`} />
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <p
                              className={`font-medium ${item.completed ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {item.step}
                            </p>
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {application.status !== "Rejected" && (
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download Hall Ticket
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
