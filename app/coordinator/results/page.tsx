import { TrendingUp, TrendingDown, Award, Briefcase, CheckCircle2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ResultsPage() {
  const offerStats = [
    { label: "Total Offers", value: 156, change: "+12%", icon: Award, color: "text-green-600" },
    { label: "Pending Offers", value: 23, change: "-5%", icon: Clock, color: "text-yellow-600" },
    { label: "Accepted Offers", value: 142, change: "+8%", icon: CheckCircle2, color: "text-blue-600" },
    { label: "Avg Package", value: "₹8.5 LPA", change: "+15%", icon: TrendingUp, color: "text-indigo-600" },
  ]

  const recentOffers = [
    {
      id: 1,
      student: "Rahul Sharma",
      rollNo: "CSE2021001",
      company: "Google India",
      position: "Software Engineer",
      package: "₹24 LPA",
      type: "Full-time",
      status: "accepted",
      date: "2024-01-14",
    },
    {
      id: 2,
      student: "Priya Patel",
      rollNo: "CSE2021042",
      company: "Microsoft",
      position: "Product Manager",
      package: "₹18 LPA",
      type: "Full-time",
      status: "pending",
      date: "2024-01-13",
    },
    {
      id: 3,
      student: "Amit Kumar",
      rollNo: "IT2021015",
      company: "Amazon",
      position: "Data Scientist",
      package: "₹22 LPA",
      type: "Full-time",
      status: "accepted",
      date: "2024-01-12",
    },
    {
      id: 4,
      student: "Sneha Reddy",
      rollNo: "CSE2021089",
      company: "Flipkart",
      position: "Software Engineer",
      package: "₹16 LPA",
      type: "Full-time",
      status: "accepted",
      date: "2024-01-11",
    },
    {
      id: 5,
      student: "Rohan Verma",
      rollNo: "IT2021033",
      company: "Accenture",
      position: "Consultant",
      package: "₹7.5 LPA",
      type: "Full-time",
      status: "accepted",
      date: "2024-01-10",
    },
  ]

  const topPerformers = [
    { name: "Rahul Sharma", branch: "CSE", offers: 3, highest: "₹24 LPA" },
    { name: "Anjali Singh", branch: "IT", offers: 2, highest: "₹20 LPA" },
    { name: "Vikram Malhotra", branch: "CSE", offers: 2, highest: "₹18 LPA" },
  ]

  const placementResults = [
    {
      id: 1,
      student: "Neha Gupta",
      rollNo: "ECE2021056",
      company: "Intel",
      round: "Final HR",
      status: "selected",
      date: "2024-01-14",
      nextRound: null,
    },
    {
      id: 2,
      student: "Karthik Reddy",
      rollNo: "CSE2021078",
      company: "Adobe",
      round: "Technical Round 2",
      status: "selected",
      date: "2024-01-14",
      nextRound: "Final HR",
    },
    {
      id: 3,
      student: "Divya Sharma",
      rollNo: "IT2021023",
      company: "Salesforce",
      round: "Technical Round 1",
      status: "rejected",
      date: "2024-01-13",
      nextRound: null,
    },
    {
      id: 4,
      student: "Arjun Patel",
      rollNo: "CSE2021012",
      company: "Oracle",
      round: "Technical Round 2",
      status: "selected",
      date: "2024-01-13",
      nextRound: "Manager Round",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Results & Offers</h1>
          <p className="text-muted-foreground mt-2">Track placement outcomes and job offers</p>
        </div>
        <Button>Export Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {offerStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {stat.change.startsWith("+") ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="offers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="results">Interview Results</TabsTrigger>
          <TabsTrigger value="performers">Top Performers</TabsTrigger>
        </TabsList>

        <TabsContent value="offers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Job Offers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOffers.map((offer) => (
                  <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{offer.student}</h3>
                        <Badge variant="outline" className="text-xs">
                          {offer.rollNo}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {offer.company}
                        </span>
                        <span>•</span>
                        <span>{offer.position}</span>
                        <span>•</span>
                        <span className="font-medium text-foreground">{offer.package}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {offer.status === "accepted" ? (
                        <Badge className="bg-green-500/10 text-green-700">Accepted</Badge>
                      ) : (
                        <Badge className="bg-yellow-500/10 text-yellow-700">Pending</Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{offer.date}</span>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Interview Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {placementResults.map((result) => (
                  <div key={result.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{result.student}</h3>
                        <Badge variant="outline" className="text-xs">
                          {result.rollNo}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{result.company}</span>
                        <span>•</span>
                        <span>{result.round}</span>
                        {result.nextRound && (
                          <>
                            <span>•</span>
                            <span className="text-blue-600">Next: {result.nextRound}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {result.status === "selected" ? (
                        <Badge className="bg-green-500/10 text-green-700">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Selected
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="bg-red-500/10 text-red-700">
                          Not Selected
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{result.date}</span>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers This Season</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-600 font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{performer.name}</h3>
                        <p className="text-sm text-muted-foreground">{performer.branch}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">{performer.highest}</div>
                      <p className="text-xs text-muted-foreground">{performer.offers} offers received</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
