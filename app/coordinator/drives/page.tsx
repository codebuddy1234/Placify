"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Building2, Users, DollarSign, MapPin, Clock, CheckCircle, AlertCircle, Settings } from "lucide-react"

export default function PlacementDrivesPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const drives = [
    {
      id: 1,
      company: "Google",
      role: "Software Engineer",
      type: "Full Time",
      package: "28-35 LPA",
      location: "Bangalore",
      deadline: "2024-12-30",
      eligibility: {
        minCGPA: 8.5,
        branches: ["CSE", "IT"],
        skills: ["DSA", "System Design"],
      },
      applicants: 124,
      shortlisted: 45,
      status: "active",
    },
    {
      id: 2,
      company: "Microsoft",
      role: "SDE Intern",
      type: "Internship",
      package: "1L/month",
      location: "Hyderabad",
      deadline: "2024-12-28",
      eligibility: {
        minCGPA: 8.0,
        branches: ["CSE", "IT", "ECE"],
        skills: ["C++", "Problem Solving"],
      },
      applicants: 98,
      shortlisted: 32,
      status: "active",
    },
    {
      id: 3,
      company: "Amazon",
      role: "Full Stack Developer",
      type: "Full Time",
      package: "25-30 LPA",
      location: "Mumbai",
      deadline: "2025-01-05",
      eligibility: {
        minCGPA: 8.0,
        branches: ["CSE", "IT"],
        skills: ["React", "Node.js", "AWS"],
      },
      applicants: 156,
      shortlisted: 60,
      status: "active",
    },
    {
      id: 4,
      company: "Apple",
      role: "iOS Developer",
      type: "Full Time",
      package: "30-40 LPA",
      location: "Bangalore",
      deadline: "2024-12-15",
      eligibility: {
        minCGPA: 9.0,
        branches: ["CSE"],
        skills: ["Swift", "iOS Development"],
      },
      applicants: 67,
      shortlisted: 18,
      status: "closed",
    },
  ]

  const activeDrives = drives.filter((d) => d.status === "active")
  const closedDrives = drives.filter((d) => d.status === "closed")

  return (
    <div className="min-h-screen bg-background">
      <Header title="Placement Drives" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Total Drives</p>
              </div>
              <p className="text-2xl font-bold text-foreground mt-2">{drives.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <p className="text-2xl font-bold text-green-600 mt-2">{activeDrives.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
              <p className="text-2xl font-bold text-foreground mt-2">
                {drives.reduce((sum, d) => sum + d.applicants, 0)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <p className="text-sm text-muted-foreground">Closing Soon</p>
              </div>
              <p className="text-2xl font-bold text-yellow-600 mt-2">2</p>
            </CardContent>
          </Card>
        </div>

        {/* Create Drive Button */}
        <div className="flex justify-end">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create New Drive
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create Placement Drive</DialogTitle>
                <DialogDescription>Set up a new placement opportunity for students</DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Company Information</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="e.g., Google" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Job Role</Label>
                      <Input id="role" placeholder="e.g., Software Engineer" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Job Type</Label>
                      <Select>
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fulltime">Full Time</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="package">Package (LPA)</Label>
                      <Input id="package" placeholder="e.g., 28-35" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g., Bangalore" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input id="deadline" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea id="description" placeholder="Describe the role and responsibilities..." rows={3} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Eligibility Criteria</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cgpa">Minimum CGPA</Label>
                      <Input id="cgpa" type="number" step="0.1" placeholder="e.g., 8.5" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branches">Eligible Branches</Label>
                      <Select>
                        <SelectTrigger id="branches">
                          <SelectValue placeholder="Select branches" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cse">Computer Science</SelectItem>
                          <SelectItem value="it">Information Technology</SelectItem>
                          <SelectItem value="ece">Electronics</SelectItem>
                          <SelectItem value="mech">Mechanical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skills">Required Skills (comma separated)</Label>
                    <Input id="skills" placeholder="e.g., React, Node.js, Python" />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateDialogOpen(false)}>Create Drive</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Drives Tabs */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Drives</TabsTrigger>
            <TabsTrigger value="closed">Closed Drives</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeDrives.map((drive) => (
              <Card key={drive.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{drive.company}</CardTitle>
                          <Badge variant="secondary">{drive.type}</Badge>
                        </div>
                        <CardDescription className="mt-1">{drive.role}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{drive.package}</p>
                        <p className="text-xs text-muted-foreground">Package</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{drive.location}</p>
                        <p className="text-xs text-muted-foreground">Location</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {new Date(drive.deadline).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">Deadline</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {drive.applicants} / {drive.shortlisted}
                        </p>
                        <p className="text-xs text-muted-foreground">Applied / Shortlisted</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-2">Eligibility Criteria</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>Min CGPA: {drive.eligibility.minCGPA}</span>
                      <span>Branches: {drive.eligibility.branches.join(", ")}</span>
                      <span>Skills: {drive.eligibility.skills.join(", ")}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Applications
                    </Button>
                    <Button variant="outline" size="sm">
                      Auto-Shortlist
                    </Button>
                    <Button variant="outline" size="sm">
                      Schedule Interviews
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4">
            {closedDrives.map((drive) => (
              <Card key={drive.id} className="opacity-75">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                        <Building2 className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{drive.company}</CardTitle>
                          <Badge variant="secondary">{drive.type}</Badge>
                          <Badge variant="outline">Closed</Badge>
                        </div>
                        <CardDescription className="mt-1">{drive.role}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{drive.package}</p>
                        <p className="text-xs text-muted-foreground">Package</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{drive.location}</p>
                        <p className="text-xs text-muted-foreground">Location</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {drive.applicants} / {drive.shortlisted}
                        </p>
                        <p className="text-xs text-muted-foreground">Applied / Shortlisted</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Results
                    </Button>
                    <Button variant="outline" size="sm">
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
