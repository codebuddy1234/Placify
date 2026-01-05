import { Calendar, Clock, Video, MapPin, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function InterviewsPage() {
  const upcomingInterviews = [
    {
      id: 1,
      company: "Google India",
      candidate: "Rahul Sharma",
      position: "Software Engineer",
      round: "Technical Round 2",
      date: "2024-01-15",
      time: "10:00 AM",
      mode: "Online",
      meetLink: "meet.google.com/abc-defg-hij",
      interviewer: "John Davis",
      status: "scheduled",
    },
    {
      id: 2,
      company: "Microsoft",
      candidate: "Priya Patel",
      position: "Product Manager",
      round: "HR Round",
      date: "2024-01-15",
      time: "2:00 PM",
      mode: "Offline",
      location: "Seminar Hall A",
      interviewer: "Sarah Johnson",
      status: "scheduled",
    },
    {
      id: 3,
      company: "Amazon",
      candidate: "Amit Kumar",
      position: "Data Scientist",
      round: "Technical Round 1",
      date: "2024-01-16",
      time: "11:00 AM",
      mode: "Online",
      meetLink: "zoom.us/j/123456789",
      interviewer: "Mike Chen",
      status: "scheduled",
    },
  ]

  const completedInterviews = [
    {
      id: 4,
      company: "Google India",
      candidate: "Sneha Reddy",
      position: "Software Engineer",
      round: "Technical Round 1",
      date: "2024-01-10",
      time: "3:00 PM",
      mode: "Online",
      status: "completed",
      result: "selected",
      feedback: "Strong coding skills, good problem-solving approach",
    },
    {
      id: 5,
      company: "Wipro",
      candidate: "Rohan Verma",
      position: "Full Stack Developer",
      round: "Technical Round 2",
      date: "2024-01-09",
      time: "10:00 AM",
      mode: "Offline",
      status: "completed",
      result: "rejected",
      feedback: "Needs improvement in system design concepts",
    },
    {
      id: 6,
      company: "TCS",
      candidate: "Anjali Singh",
      position: "Business Analyst",
      round: "HR Round",
      date: "2024-01-08",
      time: "4:00 PM",
      mode: "Online",
      status: "completed",
      result: "selected",
      feedback: "Excellent communication and analytical skills",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Interview Management</h1>
        <p className="text-muted-foreground mt-2">Schedule and track all placement interviews</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across 5 companies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+8 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Results</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Awaiting feedback</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <Button>Schedule Interview</Button>
        </div>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingInterviews.map((interview) => (
            <Card key={interview.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{interview.company}</h3>
                          <Badge variant="outline">{interview.round}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {interview.position} • {interview.candidate}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{interview.time}</span>
                      </div>
                      {interview.mode === "Online" ? (
                        <div className="flex items-center gap-2">
                          <Video className="h-4 w-4 text-muted-foreground" />
                          <a href={`https://${interview.meetLink}`} className="text-primary hover:underline">
                            {interview.meetLink}
                          </a>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{interview.location}</span>
                        </div>
                      )}
                      <div className="text-sm">
                        <span className="text-muted-foreground">Interviewer: </span>
                        {interview.interviewer}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedInterviews.map((interview) => (
            <Card key={interview.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{interview.company}</h3>
                          <Badge variant="outline">{interview.round}</Badge>
                          {interview.result === "selected" ? (
                            <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Selected
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="bg-red-500/10 text-red-700 hover:bg-red-500/20">
                              <XCircle className="h-3 w-3 mr-1" />
                              Not Selected
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {interview.position} • {interview.candidate}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{interview.time}</span>
                      </div>
                    </div>

                    {interview.feedback && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Interviewer Feedback</p>
                        <p className="text-sm text-muted-foreground">{interview.feedback}</p>
                      </div>
                    )}
                  </div>

                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
