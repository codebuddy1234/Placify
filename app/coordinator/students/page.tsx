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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MoreVertical, Download, Filter, Eye, CheckCircle, XCircle, FileText, Star } from "lucide-react"

export default function StudentsPage() {
  const [statusFilter, setStatusFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)

  const students = [
    {
      id: "ST001",
      name: "Rahul Sharma",
      email: "rahul.sharma@college.edu",
      branch: "Computer Science",
      cgpa: 9.2,
      skills: ["React", "Node.js", "Python"],
      status: "approved",
      placed: false,
      resumeScore: 92,
    },
    {
      id: "ST002",
      name: "Priya Patel",
      email: "priya.patel@college.edu",
      branch: "Information Technology",
      cgpa: 8.9,
      skills: ["Java", "Spring Boot", "MySQL"],
      status: "approved",
      placed: true,
      company: "Google",
      package: "28 LPA",
      resumeScore: 88,
    },
    {
      id: "ST003",
      name: "Amit Kumar",
      email: "amit.kumar@college.edu",
      branch: "Computer Science",
      cgpa: 8.5,
      skills: ["Angular", "TypeScript", "MongoDB"],
      status: "pending",
      placed: false,
      resumeScore: 78,
    },
    {
      id: "ST004",
      name: "Sneha Reddy",
      email: "sneha.reddy@college.edu",
      branch: "Electronics",
      cgpa: 9.0,
      skills: ["Python", "Machine Learning", "TensorFlow"],
      status: "approved",
      placed: true,
      company: "Microsoft",
      package: "32 LPA",
      resumeScore: 95,
    },
    {
      id: "ST005",
      name: "Vikram Singh",
      email: "vikram.singh@college.edu",
      branch: "Computer Science",
      cgpa: 7.8,
      skills: ["React Native", "Flutter", "Firebase"],
      status: "approved",
      placed: false,
      resumeScore: 82,
    },
  ]

  const filteredStudents = students.filter((student) => {
    if (statusFilter !== "all" && statusFilter === "placed" && !student.placed) return false
    if (statusFilter !== "all" && statusFilter === "unplaced" && student.placed) return false
    if (statusFilter !== "all" && statusFilter === "pending" && student.status !== "pending") return false
    if (branchFilter !== "all" && student.branch !== branchFilter) return false
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <Header title="Student Management" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Students</p>
              <p className="text-2xl font-bold text-foreground">{students.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {students.filter((s) => s.status === "approved").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Pending Approval</p>
              <p className="text-2xl font-bold text-yellow-600">
                {students.filter((s) => s.status === "pending").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Placed</p>
              <p className="text-2xl font-bold text-primary">{students.filter((s) => s.placed).length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="placed">Placed</SelectItem>
                    <SelectItem value="unplaced">Unplaced</SelectItem>
                    <SelectItem value="pending">Pending Approval</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={branchFilter} onValueChange={setBranchFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Mechanical">Mechanical</SelectItem>
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

        {/* Students Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>CGPA</TableHead>
                  <TableHead>Skills</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Placement</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-foreground">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{student.branch}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{student.cgpa}</span>
                        {student.cgpa >= 9.0 && <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {student.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {student.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{student.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {student.status === "approved" ? (
                        <Badge className="gap-1 bg-green-500/10 text-green-700">
                          <CheckCircle className="h-3 w-3" />
                          Approved
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="gap-1 bg-yellow-500/10 text-yellow-700">
                          <XCircle className="h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {student.placed ? (
                        <div>
                          <Badge className="bg-primary/10 text-primary">Placed</Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            {student.company} - {student.package}
                          </p>
                        </div>
                      ) : (
                        <Badge variant="outline">Not Placed</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DialogTrigger asChild>
                              <DropdownMenuItem onSelect={() => setSelectedStudent(student)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Resume
                            </DropdownMenuItem>
                            {student.status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Student Profile</DialogTitle>
                            <DialogDescription>Detailed information about the student</DialogDescription>
                          </DialogHeader>
                          {selectedStudent && (
                            <div className="space-y-6">
                              <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                  <p className="text-sm text-muted-foreground">Name</p>
                                  <p className="font-medium text-foreground">{selectedStudent.name}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Student ID</p>
                                  <p className="font-medium text-foreground">{selectedStudent.id}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Email</p>
                                  <p className="font-medium text-foreground">{selectedStudent.email}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Branch</p>
                                  <p className="font-medium text-foreground">{selectedStudent.branch}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">CGPA</p>
                                  <p className="font-medium text-foreground">{selectedStudent.cgpa}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Resume Score</p>
                                  <p className="font-medium text-foreground">{selectedStudent.resumeScore}/100</p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm text-muted-foreground mb-2">Skills</p>
                                <div className="flex flex-wrap gap-2">
                                  {selectedStudent.skills.map((skill: string) => (
                                    <Badge key={skill} variant="secondary">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {selectedStudent.placed && (
                                <div className="rounded-lg border border-border bg-accent p-4">
                                  <p className="text-sm font-medium text-foreground mb-2">Placement Details</p>
                                  <div className="grid gap-2 md:grid-cols-2">
                                    <div>
                                      <p className="text-xs text-muted-foreground">Company</p>
                                      <p className="font-medium text-foreground">{selectedStudent.company}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground">Package</p>
                                      <p className="font-medium text-foreground">{selectedStudent.package}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="flex justify-end gap-2">
                                <Button variant="outline">Download Resume</Button>
                                {selectedStudent.status === "pending" && (
                                  <>
                                    <Button variant="outline" className="text-red-600 bg-transparent">
                                      Reject
                                    </Button>
                                    <Button>Approve Profile</Button>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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
