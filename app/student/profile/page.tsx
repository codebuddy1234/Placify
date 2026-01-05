"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { User, Calendar, BookOpen, Award, Briefcase, Plus, X, Save } from "lucide-react"

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [skills, setSkills] = useState(["React", "Node.js", "TypeScript", "Python", "SQL"])
  const [newSkill, setNewSkill] = useState("")

  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    email: "rahul.sharma@college.edu",
    phone: "+91 98765 43210",
    rollNumber: "CSE2021001",
    branch: "Computer Science Engineering",
    year: "Final Year",
    cgpa: "8.5",
    location: "Mumbai, Maharashtra",
    linkedin: "linkedin.com/in/rahulsharma",
    github: "github.com/rahulsharma",
    portfolio: "rahulsharma.dev",
    bio: "Passionate software developer with expertise in full-stack development. Looking for opportunities in product-based companies.",
  })

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Built a full-stack e-commerce platform using MERN stack",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      link: "github.com/project1",
    },
    {
      title: "AI Chatbot",
      description: "Developed an AI-powered chatbot using NLP",
      technologies: ["Python", "TensorFlow", "Flask"],
      link: "github.com/project2",
    },
  ]

  const experiences = [
    {
      company: "Tech Corp",
      role: "Software Development Intern",
      duration: "Jun 2024 - Aug 2024",
      description: "Worked on frontend development using React and TypeScript",
    },
  ]

  const certifications = [
    { name: "AWS Certified Developer", issuer: "Amazon Web Services", date: "Jan 2024" },
    { name: "React Advanced", issuer: "Coursera", date: "Dec 2023" },
  ]

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <>
      <Header />
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal information and career details</p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
            {isEditing ? (
              <>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </>
            ) : (
              "Edit Profile"
            )}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl">RS</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={profile.name}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Roll Number</Label>
                      <Input value={profile.rollNumber} disabled />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={profile.email}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={profile.phone}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Branch</Label>
                      <Input value={profile.branch} disabled />
                    </div>
                    <div>
                      <Label>Year</Label>
                      <Input value={profile.year} disabled />
                    </div>
                    <div>
                      <Label>CGPA</Label>
                      <Input
                        value={profile.cgpa}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, cgpa: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={profile.location}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Bio</Label>
                    <Textarea
                      value={profile.bio}
                      disabled={!isEditing}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>LinkedIn</Label>
                      <Input
                        value={profile.linkedin}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>GitHub</Label>
                      <Input
                        value={profile.github}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Portfolio</Label>
                      <Input
                        value={profile.portfolio}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, portfolio: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Skills
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm">
                      {skill}
                      {isEditing && (
                        <button onClick={() => removeSkill(skill)} className="ml-2">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    />
                    <Button onClick={addSkill}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <h4 className="font-semibold text-foreground">{project.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <a
                    href={`https://${project.link}`}
                    className="mt-2 inline-block text-sm text-primary hover:underline"
                  >
                    View Project →
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                  <h4 className="font-semibold text-foreground">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {exp.duration}
                  </p>
                  <p className="mt-2 text-sm text-foreground">{exp.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <h4 className="font-medium text-foreground">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <Badge variant="secondary">{cert.date}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsEditing(false)}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
