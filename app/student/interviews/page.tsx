import { Calendar, Clock, Video, FileText, CheckCircle2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentInterviewsPage() {
  const upcomingInterviews = [
    {
      id: 1,
      company: "Google India",
      position: "Software Engineer",
      round: "Technical Round 2",
      date: "2024-01-18",
      time: "10:00 AM",
      duration: "60 min",
      mode: "Online",
      meetLink: "meet.google.com/abc-defg-hij",
      interviewer: "John Davis",
      instructions: "Prepare for DSA questions, system design, and coding",
    },
    {
      id: 2,
      company: "Amazon",
      position: "SDE Intern",
      round: "Technical Round 1",
      date: "2024-01-20",
      time: "2:00 PM",
      duration: "45 min",
      mode: "Online",
      meetLink: "chime.aws/abc123",
      interviewer: "Sarah Johnson",
      instructions: "Focus on data structures and problem solving",
    },
  ]

  const pastInterviews = [
    {
      id: 3,
      company: "Microsoft",
      position: "Software Engineer",
      round: "Technical Round 1",
      date: "2024-01-10",
      status: "cleared",
      nextRound: "Technical Round 2",
      feedback: "Good problem-solving approach",
    },
    {
      id: 4,
      company: "Flipkart",
      position: "Frontend Developer",
      round: "HR Round",
      date: "2024-01-08",
      status: "cleared",
      nextRound: "Final Offer",
      feedback: "Excellent communication skills",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Interviews</h1>
        <p className="text-muted-foreground mt-2">Track your scheduled and completed interviews</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">6 cleared</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Interview</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 days</div>
            <p className="text-xs text-muted-foreground">Google India</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Interviews</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingInterviews.map((interview) => (
            <Card key={interview.id}>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{interview.company}</h3>
                        <Badge variant="outline">{interview.round}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{interview.position}</p>
                    </div>
                    <Badge className="bg-blue-500/10 text-blue-700">Scheduled</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Date</p>
                        <p className="font-medium">{interview.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Time</p>
                        <p className="font-medium">
                          {interview.time} ({interview.duration})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Mode</p>
                        <p className="font-medium">{interview.mode}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Interviewer</p>
                        <p className="font-medium">{interview.interviewer}</p>
                      </div>
                    </div>
                  </div>

                  {interview.meetLink && (
                    <div className="flex items-center gap-2 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                      <Video className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Join Meeting</p>
                        <a href={`https://${interview.meetLink}`} className="text-xs text-blue-600 hover:underline">
                          {interview.meetLink}
                        </a>
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                  )}

                  {interview.instructions && (
                    <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-amber-900">Preparation Tips</p>
                          <p className="text-sm text-muted-foreground mt-1">{interview.instructions}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Add to Calendar
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastInterviews.map((interview) => (
            <Card key={interview.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{interview.company}</h3>
                      <Badge variant="outline">{interview.round}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-700">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Cleared
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Interview Date:</span>
                    <span className="font-medium">{interview.date}</span>
                  </div>

                  {interview.nextRound && (
                    <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                      <p className="text-sm font-medium text-green-900">Next Round: {interview.nextRound}</p>
                      <p className="text-xs text-muted-foreground mt-1">You'll be notified when scheduled</p>
                    </div>
                  )}

                  {interview.feedback && (
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium mb-1">Interviewer Feedback</p>
                      <p className="text-sm text-muted-foreground">{interview.feedback}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
