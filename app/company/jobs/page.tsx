"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Users, MapPin, Briefcase, DollarSign } from "lucide-react"

export default function JobPostingsPage() {
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: "Software Engineer",
      department: "Engineering",
      location: "Bangalore",
      type: "Full-time",
      experience: "0-2 years",
      package: "8-12 LPA",
      applicants: 45,
      status: "Active",
      postedDate: "2024-01-15",
      description: "Looking for skilled software engineers proficient in modern web technologies.",
      requirements: ["Bachelor's degree in Computer Science", "Strong problem-solving skills", "Good communication"],
      skills: ["JavaScript", "React", "Node.js", "SQL"],
    },
    {
      id: 2,
      title: "Data Analyst",
      department: "Analytics",
      location: "Mumbai",
      type: "Full-time",
      experience: "1-3 years",
      package: "6-10 LPA",
      applicants: 32,
      status: "Active",
      postedDate: "2024-01-10",
      description: "Seeking data analysts to drive business insights through data analysis.",
      requirements: ["Strong analytical skills", "Experience with data visualization", "SQL proficiency"],
      skills: ["Python", "SQL", "Tableau", "Excel"],
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Pune",
      type: "Full-time",
      experience: "2-5 years",
      package: "15-20 LPA",
      applicants: 18,
      status: "Draft",
      postedDate: "2024-01-20",
      description: "Looking for product managers to lead product strategy and development.",
      requirements: ["MBA or equivalent", "Product management experience", "Strong leadership"],
      skills: ["Product Strategy", "Agile", "User Research", "Roadmap Planning"],
    },
  ])

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Job Postings</h1>
          <p className="text-muted-foreground">Manage your job openings and recruitment drives</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Job Posting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Job Posting</DialogTitle>
              <DialogDescription>Fill in the details to create a new job posting</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" placeholder="e.g. Software Engineer" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="e.g. Engineering" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="e.g. Bangalore" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Required</Label>
                  <Input id="experience" placeholder="e.g. 0-2 years" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="package">Package (LPA)</Label>
                  <Input id="package" placeholder="e.g. 8-12 LPA" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" placeholder="Describe the role and responsibilities..." rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements (one per line)</Label>
                <Textarea id="requirements" placeholder="List the job requirements..." rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills (comma separated)</Label>
                <Input id="skills" placeholder="e.g. JavaScript, React, Node.js" />
              </div>

              <div className="space-y-2">
                <Label>Eligibility Criteria</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minCGPA" className="text-sm">
                      Minimum CGPA
                    </Label>
                    <Input id="minCGPA" type="number" step="0.01" placeholder="e.g. 7.0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branches" className="text-sm">
                      Eligible Branches
                    </Label>
                    <Input id="branches" placeholder="e.g. CSE, IT, ECE" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={() => setIsCreateOpen(false)}>Publish Job</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobPostings.filter((j) => j.status === "Active").length}</div>
            <p className="text-xs text-muted-foreground">Currently open positions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobPostings.reduce((sum, job) => sum + job.applicants, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all postings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Jobs</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobPostings.filter((j) => j.status === "Draft").length}</div>
            <p className="text-xs text-muted-foreground">Pending publication</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Applications</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(jobPostings.reduce((sum, job) => sum + job.applicants, 0) / jobPostings.length)}
            </div>
            <p className="text-xs text-muted-foreground">Per job posting</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Job Postings</CardTitle>
          <CardDescription>View and manage all your job openings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobPostings.map((job) => (
              <div
                key={job.id}
                className="flex items-start justify-between rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{job.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3.5 w-3.5" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {job.applicants} applicants
                        </span>
                      </div>
                    </div>
                    <Badge variant={job.status === "Active" ? "default" : "secondary"}>{job.status}</Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{job.type}</Badge>
                    <Badge variant="outline">{job.experience}</Badge>
                    <Badge variant="outline">{job.package}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedJob(job)
                        setIsViewOpen(true)
                      }}
                    >
                      <Eye className="mr-2 h-3.5 w-3.5" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="mr-2 h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Users className="mr-2 h-3.5 w-3.5" />
                      View Applicants
                    </Button>
                    {job.status === "Active" && (
                      <Button size="sm" variant="outline">
                        Close Posting
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedJob.title}</DialogTitle>
                <DialogDescription>
                  {selectedJob.department} • {selectedJob.location}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2">
                  <Badge variant={selectedJob.status === "Active" ? "default" : "secondary"}>
                    {selectedJob.status}
                  </Badge>
                  <Badge variant="outline">{selectedJob.type}</Badge>
                  <Badge variant="outline">{selectedJob.experience}</Badge>
                  <Badge variant="outline">{selectedJob.package}</Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedJob.description}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Requirements</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedJob.requirements.map((req: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Required Skills</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Applicants</p>
                    <p className="text-2xl font-bold">{selectedJob.applicants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Posted On</p>
                    <p className="text-lg font-semibold">{new Date(selectedJob.postedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
