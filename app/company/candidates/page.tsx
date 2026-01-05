"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MoreVertical, Download, Filter, Eye, CheckCircle, XCircle, Star, TrendingUp } from "lucide-react"

export default function CandidatesPage() {
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const candidates = [
    {
      id: "C001",
      name: "Rahul Sharma",
      email: "rahul.sharma@college.edu",
      role: "Software Engineer",
      branch: "Computer Science",
      cgpa: 9.2,
      skills: ["React", "Node.js", "Python"],
      status: "shortlisted",
      resumeScore: 92,
      appliedDate: "Dec 20, 2024",
    },
    {
      id: "C002",
      name: "Priya Patel",
      email: "priya.patel@college.edu",
      role: "SDE Intern",
      branch: "Information Technology",
      cgpa: 8.9,
      skills: ["Java", "Spring Boot", "MySQL"],
      status: "pending",
      resumeScore: 88,
      appliedDate: "Dec 21, 2024",
    },
    {
      id: "C003",
      name: "Amit Kumar",
      email: "amit.kumar@college.edu",
      role: "Full Stack Developer",
      branch: "Computer Science",
      cgpa: 8.5,
      skills: ["Angular", "TypeScript", "MongoDB"],
      status: "interviewed",
      resumeScore: 85,
      appliedDate: "Dec 19, 2024",
    },
    {
      id: "C004",
      name: "Sneha Reddy",
      email: "sneha.reddy@college.edu",
      role: "Software Engineer",
      branch: "Computer Science",
      cgpa: 9.0,
      skills: ["Python", "Machine Learning", "TensorFlow"],
      status: "offered",
      resumeScore: 95,
      appliedDate: "Dec 18, 2024",
    },
  ]

  const filteredCandidates = candidates.filter((candidate) => {
    if (roleFilter !== "all" && candidate.role !== roleFilter) return false
    if (statusFilter !== "all" && candidate.status !== statusFilter) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <Header title="Candidate Management" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Candidates</p>
              <p className="text-2xl font-bold text-foreground">{candidates.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Shortlisted</p>
              <p className="text-2xl font-bold text-blue-600">
                {candidates.filter((c) => c.status === "shortlisted").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Interviewed</p>
              <p className="text-2xl font-bold text-purple-600">
                {candidates.filter((c) => c.status === "interviewed").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Offers Made</p>
              <p className="text-2xl font-bold text-green-600">
                {candidates.filter((c) => c.status === "offered").length}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                    <SelectItem value="SDE Intern">SDE Intern</SelectItem>
                    <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="interviewed">Interviewed</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Candidates Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Role Applied</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Resume Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCandidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{candidate.name}</p>
                        <p className="text-sm text-muted-foreground">{candidate.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{candidate.role}</TableCell>
                    <TableCell className="text-muted-foreground">{candidate.branch}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{candidate.cgpa}</span>
                        {candidate.cgpa >= 9.0 && <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="font-medium text-foreground">{candidate.resumeScore}/100</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {candidate.status === "shortlisted" && (
                        <Badge className="gap-1 bg-blue-500/10 text-blue-700">
                          <CheckCircle className="h-3 w-3" />
                          Shortlisted
                        </Badge>
                      )}
                      {candidate.status === "pending" && (
                        <Badge variant="secondary" className="gap-1">
                          Pending
                        </Badge>
                      )}
                      {candidate.status === "interviewed" && (
                        <Badge className="gap-1 bg-purple-500/10 text-purple-700">Interviewed</Badge>
                      )}
                      {candidate.status === "offered" && (
                        <Badge className="gap-1 bg-green-500/10 text-green-700">
                          <CheckCircle className="h-3 w-3" />
                          Offered
                        </Badge>
                      )}
                      {candidate.status === "rejected" && (
                        <Badge variant="secondary" className="gap-1 bg-red-500/10 text-red-700">
                          <XCircle className="h-3 w-3" />
                          Rejected
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download Resume
                          </DropdownMenuItem>
                          {candidate.status === "pending" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-blue-600">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Shortlist
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {candidate.status === "shortlisted" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-primary">Schedule Interview</DropdownMenuItem>
                            </>
                          )}
                          {candidate.status === "interviewed" && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-green-600">Send Offer</DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
