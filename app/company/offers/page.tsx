"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, Download, Send, CheckCircle2, XCircle, Clock, DollarSign, Mail } from "lucide-react"

export default function OffersPage() {
  const [offers, setOffers] = useState([
    {
      id: 1,
      candidateName: "Rahul Sharma",
      candidateEmail: "rahul.sharma@college.edu",
      rollNumber: "CS2021001",
      position: "Software Engineer",
      package: "12 LPA",
      joiningDate: "2024-07-01",
      status: "Accepted",
      sentDate: "2024-01-20",
      responseDate: "2024-01-22",
      branch: "Computer Science",
      cgpa: 8.7,
    },
    {
      id: 2,
      candidateName: "Priya Patel",
      candidateEmail: "priya.patel@college.edu",
      rollNumber: "IT2021023",
      position: "Data Analyst",
      package: "9 LPA",
      joiningDate: "2024-07-01",
      status: "Pending",
      sentDate: "2024-01-25",
      responseDate: null,
      branch: "Information Technology",
      cgpa: 8.9,
    },
    {
      id: 3,
      candidateName: "Amit Kumar",
      candidateEmail: "amit.kumar@college.edu",
      rollNumber: "CS2021045",
      position: "Software Engineer",
      package: "12 LPA",
      joiningDate: "2024-07-01",
      status: "Declined",
      sentDate: "2024-01-18",
      responseDate: "2024-01-20",
      branch: "Computer Science",
      cgpa: 8.5,
    },
    {
      id: 4,
      candidateName: "Sneha Reddy",
      candidateEmail: "sneha.reddy@college.edu",
      rollNumber: "ECE2021012",
      position: "Product Manager",
      package: "18 LPA",
      joiningDate: "2024-07-15",
      status: "Accepted",
      sentDate: "2024-01-23",
      responseDate: "2024-01-24",
      branch: "Electronics",
      cgpa: 9.1,
    },
  ])

  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isSendOfferOpen, setIsSendOfferOpen] = useState(false)

  const filteredOffers = offers.filter((offer) => {
    const matchesStatus = filterStatus === "all" || offer.status.toLowerCase() === filterStatus
    const matchesSearch =
      searchQuery === "" ||
      offer.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.position.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const stats = {
    total: offers.length,
    accepted: offers.filter((o) => o.status === "Accepted").length,
    pending: offers.filter((o) => o.status === "Pending").length,
    declined: offers.filter((o) => o.status === "Declined").length,
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Accepted":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "Declined":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "Accepted":
        return "default"
      case "Declined":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Offers</h1>
          <p className="text-muted-foreground">Manage job offers and track candidate responses</p>
        </div>

        <Dialog open={isSendOfferOpen} onOpenChange={setIsSendOfferOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Send Offer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Send Job Offer</DialogTitle>
              <DialogDescription>Create and send an offer letter to a candidate</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="candidate">Candidate</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Rahul Sharma (CS2021001)</SelectItem>
                      <SelectItem value="2">Priya Patel (IT2021023)</SelectItem>
                      <SelectItem value="3">Amit Kumar (CS2021045)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="swe">Software Engineer</SelectItem>
                      <SelectItem value="da">Data Analyst</SelectItem>
                      <SelectItem value="pm">Product Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="package">Package (LPA)</Label>
                  <Input id="package" type="number" placeholder="e.g. 12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joiningDate">Joining Date</Label>
                  <Input id="joiningDate" type="date" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="offerDetails">Offer Details</Label>
                <Textarea id="offerDetails" placeholder="Enter additional offer details, benefits, etc." rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responseDeadline">Response Deadline</Label>
                <Input id="responseDeadline" type="date" />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsSendOfferOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsSendOfferOpen(false)}>Send Offer Letter</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Offers</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Sent to candidates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.accepted}</div>
            <p className="text-xs text-muted-foreground">
              {stats.total > 0 ? Math.round((stats.accepted / stats.total) * 100) : 0}% acceptance rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Declined</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.declined}</div>
            <p className="text-xs text-muted-foreground">Offers rejected</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Offers</CardTitle>
              <CardDescription>View and manage all job offers sent to candidates</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, roll number, or position..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="declined">Declined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-lg border border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Candidate</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Position</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Package</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Joining Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Sent Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredOffers.map((offer) => (
                      <tr key={offer.id} className="hover:bg-accent/50">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-foreground">{offer.candidateName}</p>
                            <p className="text-sm text-muted-foreground">{offer.rollNumber}</p>
                            <p className="text-xs text-muted-foreground">{offer.branch}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-foreground">{offer.position}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                            <DollarSign className="h-3.5 w-3.5" />
                            {offer.package}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {new Date(offer.joiningDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={getStatusVariant(offer.status)} className="gap-1">
                            {getStatusIcon(offer.status)}
                            {offer.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">
                          {new Date(offer.sentDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            {offer.status === "Pending" && (
                              <Button size="sm" variant="ghost">
                                Resend
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredOffers.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No offers found matching your filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
