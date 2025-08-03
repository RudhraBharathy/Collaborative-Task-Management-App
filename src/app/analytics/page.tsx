"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CheckSquare, 
  Clock, 
  AlertTriangle,
  BarChart3,
  Calendar,
  Download,
  Filter,
  Eye,
  Target,
  Zap,
  Activity
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");

  const overviewMetrics = [
    { title: "Total Tasks", value: "156", change: "+12%", icon: CheckSquare, color: "text-blue-500", trend: "up" },
    { title: "Completed Tasks", value: "128", change: "+8%", icon: CheckSquare, color: "text-green-500", trend: "up" },
    { title: "Overdue Tasks", value: "8", change: "-15%", icon: AlertTriangle, color: "text-red-500", trend: "down" },
    { title: "Active Projects", value: "12", change: "+2", icon: BarChart3, color: "text-purple-500", trend: "up" },
    { title: "Team Members", value: "24", change: "+3", icon: Users, color: "text-orange-500", trend: "up" },
    { title: "Overall Progress", value: "82%", change: "+5%", icon: Target, color: "text-green-500", trend: "up" }
  ];

  const topPerformers = [
    { name: "Sarah Mitchell", avatar: "SM", completed: 45, efficiency: 94, role: "Product Manager" },
    { name: "David Johnson", avatar: "DJ", completed: 38, efficiency: 89, role: "Developer" },
    { name: "Emma Wilson", avatar: "EW", completed: 42, efficiency: 87, role: "Designer" },
    { name: "Mike Rodriguez", avatar: "MR", completed: 35, efficiency: 85, role: "Developer" }
  ];

  const projectProgress = [
    { name: "Website Redesign", progress: 75, status: "on-track", dueDate: "Dec 20" },
    { name: "Mobile App Development", progress: 45, status: "at-risk", dueDate: "Jan 15" },
    { name: "Q4 Marketing Campaign", progress: 90, status: "on-track", dueDate: "Dec 31" },
    { name: "Data Migration", progress: 30, status: "behind", dueDate: "Feb 28" },
    { name: "Customer Portal", progress: 60, status: "on-track", dueDate: "Jan 30" }
  ];

  const workloadDistribution = [
    { name: "Sarah M.", tasks: 18, capacity: 85, avatar: "SM" },
    { name: "David J.", tasks: 15, capacity: 92, avatar: "DJ" },
    { name: "Emma W.", tasks: 12, capacity: 78, avatar: "EW" },
    { name: "Mike R.", tasks: 20, capacity: 88, avatar: "MR" },
    { name: "John D.", tasks: 14, capacity: 75, avatar: "JD" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "bg-green-500";
      case "at-risk": return "bg-yellow-500";
      case "behind": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Track performance, productivity, and project insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {overviewMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.title}
                  </CardTitle>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 text-xs">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>
                      {metric.change}
                    </span>
                    <span className="text-muted-foreground">from last period</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Insights</CardTitle>
                <CardDescription>
                  Key performance indicators and trends
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Top Performer</p>
                      <p className="text-xs text-muted-foreground">Sarah completed 45 tasks this month</p>
                    </div>
                  </div>
                  <Badge variant="secondary">+15%</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">At Risk</p>
                      <p className="text-xs text-muted-foreground">Mobile App project is behind schedule</p>
                    </div>
                  </div>
                  <Badge variant="destructive">-8%</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">High Activity</p>
                      <p className="text-xs text-muted-foreground">Team velocity increased by 12%</p>
                    </div>
                  </div>
                  <Badge variant="secondary">+12%</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>
                  Team milestones and accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sarah completed 10 tasks in a day</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                  <Badge variant="outline">Milestone</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>DJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">David fixed 5 critical bugs</p>
                    <p className="text-xs text-muted-foreground">4 hours ago</p>
                  </div>
                  <Badge variant="outline">Achievement</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>EW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Emma delivered design system</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>
                  Team members with highest productivity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{performer.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{performer.name}</p>
                          <p className="text-xs text-muted-foreground">{performer.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{performer.completed} tasks</p>
                        <p className="text-xs text-muted-foreground">{performer.efficiency}% efficiency</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Workload Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Workload Distribution</CardTitle>
                <CardDescription>
                  Current task allocation across team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workloadDistribution.map((member, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{member.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{member.tasks} tasks</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Capacity</span>
                          <span>{member.capacity}%</span>
                        </div>
                        <Progress value={member.capacity} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
              <CardDescription>
                Current status and progress of all projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projectProgress.map((project, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                        <span className="font-medium">{project.name}</span>
                      </div>
                      <Badge variant="outline">Due {project.dueDate}</Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{project.progress}%</p>
                        <p className="text-xs text-muted-foreground">Complete</p>
                      </div>
                      <Progress value={project.progress} className="w-24 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Team Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
                <CardDescription>
                  Overall team metrics and productivity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Productivity Score</span>
                  <span className="text-lg font-bold text-green-600">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Collaboration Score</span>
                  <span className="text-lg font-bold text-blue-600">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Goal Achievement</span>
                  <span className="text-lg font-bold text-purple-600">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Team Velocity</span>
                  <span className="text-lg font-bold text-orange-600">+15%</span>
                </div>
              </CardContent>
            </Card>

            {/* Communication Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Communication</CardTitle>
                <CardDescription>
                  Team communication patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Comments</span>
                  <span className="text-lg font-bold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mentions</span>
                  <span className="text-lg font-bold">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Response Time</span>
                  <span className="text-lg font-bold">2.3h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Meeting Efficiency</span>
                  <span className="text-lg font-bold text-green-600">85%</span>
                </div>
              </CardContent>
            </Card>

            {/* Growth Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Growth Tracking</CardTitle>
                <CardDescription>
                  Skill development and career progression
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Skill Development</span>
                  <span className="text-lg font-bold text-green-600">+12%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Training Completion</span>
                  <span className="text-lg font-bold">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Career Progression</span>
                  <span className="text-lg font-bold text-blue-600">+8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Performance Trends</span>
                  <span className="text-lg font-bold text-green-600">↗</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 