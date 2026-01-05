"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Building2, MapPin, IndianRupee, Calendar, Users, Search, CheckCircle2, XCircle } from "lucide-react"

export default function AvailableDrivesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "eligible" | "applied">("all")

  const drives = [
    {
      id: 1,
      company: "Google India",
      role: "Software Engineer",
      package: "28 LPA",
      location: "Bangalore",
      deadline: "2024-02-15",
      eligibility: {
        cgpa: 8.0,
        branches: ["CSE", "IT"],
        backlogs: 0,
      },
      registeredCount: 145,
      totalSeats: 15,
      status: "Open",
      isEligible: true,
      hasApplied: false,
      description: "Looking for talented software engineers to join our core development team.",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "SDE Intern",
      package: "12 LPA",
      location: "Hyderabad",
      deadline: "2024-02-20",
      eligibility: {
        cgpa: 7.5,
        branches: ["CSE", "IT", "ECE"],
        backlogs: 0,
      },
      registeredCount: 203,
      totalSeats: 25,
      status: "Open",
      isEligible: true,
      hasApplied: true,
      description: "6-month internship opportunity with potential for full-time conversion.",
    },
    {
      id: 3,
      company: "Amazon",
      role: "Full Stack Developer",
      package: "32 LPA",
      location: "Mumbai",
      deadline: "2024-02-10",
      eligibility: {
        cgpa: 8.5,
        branches: ["CSE", "IT"],
        backlogs: 0,
      },
      registeredCount: 187,
      totalSeats: 10,
      status: "Open",
      isEligible: false,
      hasApplied: false,
      description: "Work on large-scale distributed systems and customer-facing applications.",
    },
    {
      id: 4,
      company: "Flipkart",
      role: "Backend Engineer",
      package: "18 LPA",
      location: "Bangalore",
      deadline: "2024-02-25",
      eligibility: {
        cgpa: 7.0,
        branches: ["CSE", "IT", "ECE"],
        backlogs: 1,
      },
      registeredCount: 164,
      totalSeats: 20,
      status: "Open",
      isEligible: true,
      hasApplied: false,
      description: "Build scalable backend services for India's leading e-commerce platform.",
    },
    {
      id: 5,
      company: "TCS",
      role: "Software Developer",
      package: "7 LPA",
      location: "Multiple",
      deadline: "2024-01-31",
      eligibility: {
        cgpa: 6.5,
        branches: ["CSE", "IT", "ECE", "EE"],
        backlogs: 2,
      },
      registeredCount: 456,
      totalSeats: 100,
      status: "Closed",
      isEligible: true,
      hasApplied: true,
      description: "Mass recruitment drive for various IT service projects.",
    },
  ]

  const filteredDrives = drives.filter((drive) => {
    const matchesSearch =
      drive.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drive.role.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === "eligible") return matchesSearch && drive.isEligible && drive.status === "Open"
    if (filterStatus === "applied") return matchesSearch && drive.hasApplied
    return matchesSearch
  })

  const handleApply = (driveId: number) => {
    console.log("[v0] Applying to drive:", driveId)
    // Application logic here
  }

  return (
    <>
      <Header />
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Available Drives</h1>
          <p className="text-muted-foreground">Browse and apply to placement opportunities</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by company or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              onClick={() => setFilterStatus("all")}
              size="sm"
            >
              All Drives
            </Button>
            <Button
              variant={filterStatus === "eligible" ? "default" : "outline"}
              onClick={() => setFilterStatus("eligible")}
              size="sm"
            >
              Eligible
            </Button>
            <Button
              variant={filterStatus === "applied" ? "default" : "outline"}
              onClick={() => setFilterStatus("applied")}
              size="sm"
            >
              Applied
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {drives.filter((d) => d.status === "Open").length}
              </div>
              <p className="text-sm text-muted-foreground">Active Drives</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">
                {drives.filter((d) => d.isEligible && d.status === "Open").length}
              </div>
              <p className="text-sm text-muted-foreground">Eligible For You</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{drives.filter((d) => d.hasApplied).length}</div>
              <p className="text-sm text-muted-foreground">Applications Submitted</p>
            </CardContent>
          </Card>
        </div>

        {/* Drives List */}
        <div className="space-y-4">
          {filteredDrives.map((drive) => (
            <Card key={drive.id} className={drive.status === "Closed" ? "opacity-60" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{drive.company}</CardTitle>
                      {drive.hasApplied && <Badge variant="secondary">Applied</Badge>}
                      {drive.status === "Closed" && <Badge variant="destructive">Closed</Badge>}
                      {drive.isEligible && drive.status === "Open" && !drive.hasApplied && (
                        <Badge className="bg-green-500">Eligible</Badge>
                      )}
                      {!drive.isEligible && drive.status === "Open" && <Badge variant="outline">Not Eligible</Badge>}
                    </div>
                    <p className="mt-1 text-lg text-muted-foreground">{drive.role}</p>
                    <p className="mt-2 text-sm text-foreground">{drive.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <IndianRupee className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">{drive.package}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {drive.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Deadline: {new Date(drive.deadline).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {drive.registeredCount} Applied | {drive.totalSeats} Seats
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg border border-border bg-muted/50 p-3">
                      <h4 className="mb-2 text-sm font-semibold text-foreground">Eligibility Criteria</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          {drive.isEligible ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          CGPA: {drive.eligibility.cgpa}+
                        </div>
                        <div>Branches: {drive.eligibility.branches.join(", ")}</div>
                        <div>Max Backlogs: {drive.eligibility.backlogs}</div>
                      </div>
                    </div>

                    {drive.status === "Open" && (
                      <Button
                        className="w-full"
                        disabled={!drive.isEligible || drive.hasApplied}
                        onClick={() => handleApply(drive.id)}
                      >
                        {drive.hasApplied ? "Already Applied" : drive.isEligible ? "Apply Now" : "Not Eligible"}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDrives.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">No drives found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  )
}
