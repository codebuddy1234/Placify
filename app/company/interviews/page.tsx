import { Calendar, Clock, Video, MapPin, CheckCircle2, XCircle, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompanyInterviewsPage() {
  const scheduledInterviews = [
    {
      id: 1,
      candidate: "Rahul Sharma",
      position: "Software Engineer",
      round: "Technical Round 2",
      date: "2024-01-18",
      time: "10:00 AM",
      duration: "60 min",
      mode: "Online",
      interviewer: "John Davis",
      meetLink: "meet.google.com/abc-defg-hij",
    },
    {
      id: 2,
      candidate: "Priya Patel",
      position: "Product Manager",
      round: "Manager Round",
      date: "2024-01-18",
      time: "2:00 PM",
      duration: "45 min",
      mode: "Offline",
      interviewer: "Sarah Johnson",
      location: "Office Building A",
    },
    {
      id: 3,
      candidate: "Amit Kumar",
      position: "Data Scientist",
      round: "Technical Round 1",
      date: "2024-01-19",
      time: "11:00 AM",
      duration: "60 min",
      mode: "Online",
      interviewer: "Mike Chen",
      meetLink: "zoom.us/j/123456789",
    },
  ]

  const completedInterviews = [
    {
      id: 4,
      candidate: "Sneha Reddy",
      position: "Software Engineer",
      round: "Technical Round 1",
      date: "2024-01-10",
      interviewer: "Tom Wilson",
      result: "selected",
      rating: 4.5,
      feedback: "Strong coding skills, excellent problem-solving",
    },
    {
      id: 5,
      candidate: "Rohan Verma",
      position: "Full Stack Developer",
      round: "Technical Round 2",
      date: "2024-01-09",
      interviewer: "Lisa Anderson",
      result: "rejected",
      rating: 3.0,
      feedback: "Needs improvement in system design",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Interview Management</h1>
          <p className="text-muted-foreground mt-2">Schedule and manage candidate interviews</p>
        </div>
        <Button>Schedule Interview</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Interviews scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Total candidates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Selected</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">56% selection rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Awaiting feedback</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="scheduled" className="space-y-4">
        <TabsList>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="scheduled" className="space-y-4">
          {scheduledInterviews.map((interview) => (
            <Card key={interview.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{interview.candidate}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">{interview.position}</p>
                        <Badge variant="outline">{interview.round}</Badge>
                      </div>
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-700">Scheduled</Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Date</p>
                        <p className="font-medium">{interview.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Time</p>
                        <p className="font-medium">{interview.time}</p>
                      </div>
                    </div>
                    {interview.mode === "Online" ? (
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Mode</p>
                          <p className="font-medium">Online</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Location</p>
                          <p className="font-medium">{interview.location}</p>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground">Interviewer</p>
                      <p className="font-medium">{interview.interviewer}</p>
                    </div>
                  </div>

                  {interview.meetLink && (
                    <div className="flex items-center gap-2 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                      <Video className="h-4 w-4 text-blue-600" />
                      <a
                        href={`https://${interview.meetLink}`}
                        className="text-sm text-blue-600 hover:underline flex-1"
                      >
                        {interview.meetLink}
                      </a>
                      <Button size="sm">Join</Button>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Resume
                    </Button>
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
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{interview.candidate}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">{interview.position}</p>
                        <Badge variant="outline">{interview.round}</Badge>
                      </div>
                    </div>
                    {interview.result === "selected" ? (
                      <Badge className="bg-green-500/10 text-green-700">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Selected
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="bg-red-500/10 text-red-700">
                        <XCircle className="h-3 w-3 mr-1" />
                        Not Selected
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="font-medium">{interview.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Interviewer</p>
                      <p className="font-medium">{interview.interviewer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p className="font-medium">{interview.rating}/5.0</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-1">Feedback</p>
                    <p className="text-sm text-muted-foreground">{interview.feedback}</p>
                  </div>

                  <Button variant="outline" size="sm">
                    View Full Report
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
