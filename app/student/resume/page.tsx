"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Sparkles, CheckCircle, AlertTriangle, TrendingUp, Lightbulb } from "lucide-react"

export default function AIResumePage() {
  const [resumeScore] = useState(92)

  const strengthsAndWeaknesses = {
    strengths: [
      "Strong technical skills section with relevant technologies",
      "Clear project descriptions with measurable outcomes",
      "Good use of action verbs and quantifiable achievements",
      "Well-structured education section",
    ],
    weaknesses: [
      "Missing leadership experience",
      "Could add more details about team collaboration",
      "Consider adding certifications section",
    ],
  }

  const skillGaps = [
    { skill: "System Design", importance: "High", hasSkill: false },
    { skill: "Docker", importance: "Medium", hasSkill: false },
    { skill: "GraphQL", importance: "Medium", hasSkill: false },
  ]

  const jobSpecificSuggestions = [
    {
      company: "Google",
      role: "Software Engineer",
      matchScore: 85,
      suggestions: ["Add more distributed systems projects", "Highlight scalability achievements"],
    },
    {
      company: "Microsoft",
      role: "SDE",
      matchScore: 90,
      suggestions: ["Emphasize .NET experience", "Add Azure cloud projects"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="AI Resume Builder" />

      <div className="p-6 space-y-6">
        {/* Resume Score Card */}
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Resume Score: {resumeScore}/100</h2>
                  <p className="text-muted-foreground mt-1">Excellent! Your resume is well-optimized</p>
                  <Progress value={resumeScore} className="mt-3 h-3 w-64" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <FileText className="h-4 w-4" />
                  Preview
                </Button>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Strengths
              </CardTitle>
              <CardDescription>What your resume does well</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {strengthsAndWeaknesses.strengths.map((strength, index) => (
                  <li key={index} className="flex gap-3 text-sm text-foreground">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-600 mt-0.5" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>Suggestions to enhance your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {strengthsAndWeaknesses.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex gap-3 text-sm text-foreground">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-600 mt-0.5" />
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Skill Gap Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Skill Gap Analysis
            </CardTitle>
            <CardDescription>Based on current job market trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillGaps.map((gap, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Lightbulb className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{gap.skill}</p>
                      <p className="text-sm text-muted-foreground">
                        Importance: <span className="font-medium">{gap.importance}</span>
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Job-Specific Resume */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Job-Specific Resume Generation
            </CardTitle>
            <CardDescription>Optimize your resume for specific job roles</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="google">
              <TabsList>
                <TabsTrigger value="google">Google</TabsTrigger>
                <TabsTrigger value="microsoft">Microsoft</TabsTrigger>
              </TabsList>
              {jobSpecificSuggestions.map((job) => (
                <TabsContent key={job.company.toLowerCase()} value={job.company.toLowerCase()} className="space-y-4">
                  <div className="rounded-lg border border-border bg-accent/50 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{job.company}</h4>
                        <p className="text-sm text-muted-foreground">{job.role}</p>
                      </div>
                      <Badge className="bg-primary/10 text-primary">Match: {job.matchScore}%</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">AI Suggestions:</p>
                      <ul className="space-y-2">
                        {job.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex gap-2 text-sm text-muted-foreground">
                            <Sparkles className="h-4 w-4 flex-shrink-0 text-primary mt-0.5" />
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="mt-4 w-full gap-2">
                      <Sparkles className="h-4 w-4" />
                      Generate Optimized Resume
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
