"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Users,
  Calendar,
  TrendingUp,
  FolderOpen,
  Eye,
  Edit,
  Trash2,
  Share,
  Copy,
  Archive,
  Settings,
  Grid3X3,
  List,
  Calendar as CalendarIcon,
  BarChart3,
  Table as TableIcon,
  CheckSquare,
} from "lucide-react";

export default function ProjectsPage() {
  const [viewMode, setViewMode] = useState("grid");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description:
        "Complete overhaul of the company website with modern design and improved UX",
      progress: 75,
      status: "in-progress",
      priority: "high",
      dueDate: "Dec 20, 2024",
      team: ["Sarah M.", "David J.", "Emma W."],
      tasks: { total: 24, completed: 18, overdue: 2 },
      avatar: "WR",
    },
    {
      id: 2,
      name: "Mobile App Development",
      description:
        "iOS and Android app for customer engagement and service delivery",
      progress: 45,
      status: "active",
      priority: "medium",
      dueDate: "Jan 15, 2025",
      team: ["Mike R.", "Sarah M.", "John D."],
      tasks: { total: 32, completed: 14, overdue: 1 },
      avatar: "MA",
    },
    {
      id: 3,
      name: "Q4 Marketing Campaign",
      description: "End-of-year marketing campaign across all digital channels",
      progress: 90,
      status: "nearly-complete",
      priority: "high",
      dueDate: "Dec 31, 2024",
      team: ["Emma W.", "David J."],
      tasks: { total: 18, completed: 16, overdue: 0 },
      avatar: "MC",
    },
    {
      id: 4,
      name: "Data Migration",
      description: "Migrate legacy data to new cloud-based system",
      progress: 30,
      status: "planning",
      priority: "low",
      dueDate: "Feb 28, 2025",
      team: ["John D.", "Mike R."],
      tasks: { total: 45, completed: 13, overdue: 3 },
      avatar: "DM",
    },
    {
      id: 5,
      name: "Customer Portal",
      description: "Self-service portal for customer account management",
      progress: 60,
      status: "in-progress",
      priority: "medium",
      dueDate: "Jan 30, 2025",
      team: ["Sarah M.", "Emma W.", "David J."],
      tasks: { total: 28, completed: 17, overdue: 1 },
      avatar: "CP",
    },
    {
      id: 6,
      name: "Security Audit",
      description: "Comprehensive security review and vulnerability assessment",
      progress: 20,
      status: "active",
      priority: "high",
      dueDate: "Dec 15, 2024",
      team: ["Mike R.", "John D."],
      tasks: { total: 15, completed: 3, overdue: 2 },
      avatar: "SA",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      case "nearly-complete":
        return "bg-green-400";
      case "active":
        return "bg-yellow-500";
      case "planning":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your team's projects
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search projects..." className="pl-10" />
          </div>
        </div>

        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="recent">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently Updated</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="due-date">Due Date</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <ToggleGroup
            type="single"
            value={viewMode}
            onValueChange={(value) => value && setViewMode(value)}
          >
            <ToggleGroupItem value="grid" aria-label="Grid view">
              <Grid3X3 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table view">
              <TableIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="calendar" aria-label="Calendar view">
              <CalendarIcon className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="text-sm text-muted-foreground">
          {projects.length} projects
        </div>
      </div>

      {/* Projects Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{project.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Project Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="mr-2 h-4 w-4" />
                        Share Project
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {project.progress}%
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Status and Priority */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusColor(
                      project.status
                    )}`}
                  />
                  <Badge variant="outline" className="text-xs capitalize">
                    {project.status.replace("-", " ")}
                  </Badge>
                  <Badge
                    variant={getPriorityColor(project.priority)}
                    className="text-xs"
                  >
                    {project.priority}
                  </Badge>
                </div>

                {/* Team */}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map((member, index) => (
                      <Avatar
                        key={index}
                        className="h-6 w-6 border-2 border-background"
                      >
                        <AvatarFallback className="text-xs">
                          {member
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.team.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tasks Summary */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {project.tasks.completed}/{project.tasks.total} tasks
                  </span>
                  {project.tasks.overdue > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {project.tasks.overdue} overdue
                    </Badge>
                  )}
                </div>

                {/* Due Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Due {project.dueDate}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Projects List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{project.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${getStatusColor(
                              project.status
                            )}`}
                          />
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {project.status.replace("-", " ")}
                          </Badge>
                          <Badge
                            variant={getPriorityColor(project.priority)}
                            className="text-xs"
                          >
                            {project.priority}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{project.team.length} members</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckSquare className="h-4 w-4" />
                          <span>
                            {project.tasks.completed}/{project.tasks.total}{" "}
                            tasks
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Due {project.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {project.progress}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Complete
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share className="mr-2 h-4 w-4" />
                          Share Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Projects Table View */}
      {viewMode === "table" && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Tasks</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{project.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{project.name}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">
                            {project.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(
                            project.status
                          )}`}
                        />
                        <Badge variant="outline" className="text-xs capitalize">
                          {project.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={project.progress}
                          className="w-20 h-2"
                        />
                        <span className="text-sm font-medium">
                          {project.progress}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member, index) => (
                          <Avatar
                            key={index}
                            className="h-6 w-6 border-2 border-background"
                          >
                            <AvatarFallback className="text-xs">
                              {member
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.team.length > 3 && (
                          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                            +{project.team.length - 3}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{project.dueDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {project.tasks.completed}/{project.tasks.total}
                        {project.tasks.overdue > 0 && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            {project.tasks.overdue}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Project
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share className="mr-2 h-4 w-4" />
                            Share Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Calendar View Placeholder */}
      {viewMode === "calendar" && (
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>
              Calendar view for project deadlines and milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Calendar view coming soon</p>
                <p className="text-sm">
                  This will show project deadlines and milestones in a calendar
                  format
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
