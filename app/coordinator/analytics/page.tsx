"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, DollarSign, Building2, Users } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function AnalyticsPage() {
  const branchWiseData = [
    { branch: "CSE", placed: 245, total: 320, percentage: 76.6 },
    { branch: "IT", placed: 198, total: 280, percentage: 70.7 },
    { branch: "ECE", placed: 167, total: 250, percentage: 66.8 },
    { branch: "MECH", placed: 142, total: 220, percentage: 64.5 },
    { branch: "CIVIL", placed: 104, total: 178, percentage: 58.4 },
  ]

  const packageDistribution = [
    { range: "0-5 LPA", count: 142, color: "hsl(var(--chart-1))" },
    { range: "5-10 LPA", count: 298, color: "hsl(var(--chart-2))" },
    { range: "10-15 LPA", count: 235, color: "hsl(var(--chart-3))" },
    { range: "15-20 LPA", count: 128, color: "hsl(var(--chart-4))" },
    { range: "20+ LPA", count: 53, color: "hsl(var(--chart-5))" },
  ]

  const monthlyTrend = [
    { month: "Aug", placements: 45 },
    { month: "Sep", placements: 78 },
    { month: "Oct", placements: 142 },
    { month: "Nov", placements: 234 },
    { month: "Dec", placements: 356 },
  ]

  const topRecruiters = [
    { company: "Google", hired: 45, avgPackage: "32 LPA" },
    { company: "Microsoft", hired: 38, avgPackage: "30 LPA" },
    { company: "Amazon", hired: 52, avgPackage: "28 LPA" },
    { company: "Apple", hired: 28, avgPackage: "35 LPA" },
    { company: "Meta", hired: 32, avgPackage: "31 LPA" },
  ]

  const skillDemand = [
    { skill: "React", demand: 245 },
    { skill: "Python", demand: 198 },
    { skill: "Java", demand: 187 },
    { skill: "Node.js", demand: 167 },
    { skill: "Machine Learning", demand: 142 },
    { skill: "AWS", demand: 128 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header title="Analytics & Reports" />

      <div className="p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Select defaultValue="2024-25">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Academic Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-25">2024-25</SelectItem>
                <SelectItem value="2023-24">2023-24</SelectItem>
                <SelectItem value="2022-23">2022-23</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Package</p>
                  <p className="text-xl font-bold text-foreground">12.5 LPA</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Highest Package</p>
                  <p className="text-xl font-bold text-foreground">45 LPA</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Companies</p>
                  <p className="text-xl font-bold text-foreground">48</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Placement Rate</p>
                  <p className="text-xl font-bold text-foreground">68.6%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Branch-wise Placement</CardTitle>
              <CardDescription>Placement statistics by department</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  placed: {
                    label: "Placed",
                    color: "hsl(var(--chart-1))",
                  },
                  total: {
                    label: "Total",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={branchWiseData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="branch" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="placed" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="total" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Package Distribution</CardTitle>
              <CardDescription>Number of students by salary range</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Students",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={packageDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ range, percent }) => `${range}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {packageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Placement Trend</CardTitle>
              <CardDescription>Placements over the academic year</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  placements: {
                    label: "Placements",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-muted-foreground" />
                    <YAxis className="text-muted-foreground" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="placements" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skill Demand Analysis</CardTitle>
              <CardDescription>Most requested skills by companies</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  demand: {
                    label: "Demand",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillDemand} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-muted-foreground" />
                    <YAxis dataKey="skill" type="category" width={120} className="text-muted-foreground" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="demand" fill="hsl(var(--chart-3))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Recruiters Table */}
        <Card>
          <CardHeader>
            <CardTitle>Top Recruiters</CardTitle>
            <CardDescription>Companies with highest hiring numbers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRecruiters.map((recruiter, index) => (
                <div
                  key={recruiter.company}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{recruiter.company}</p>
                      <p className="text-sm text-muted-foreground">Average Package: {recruiter.avgPackage}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-foreground">{recruiter.hired}</p>
                    <p className="text-xs text-muted-foreground">Students Hired</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
