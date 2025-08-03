"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Star,
  Users,
  Calendar,
  Clock,
  AlertTriangle,
  CheckSquare,
  MessageSquare,
  Paperclip,
  Tag,
  Eye,
  Edit,
  Trash2,
  Copy,
  Archive,
  List,
  Grid3X3,
  Kanban,
  Calendar as CalendarIcon,
  Table as TableIcon,
  GanttChart
} from "lucide-react";

export default function TasksPage() {
  const [viewMode, setViewMode] = useState("list");
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const tasks = [
    {
      id: 1,
      title: "Review design mockups for homepage",
      description: "Review and provide feedback on the new homepage design mockups",
      status: "in-progress",
      priority: "high",
      assignee: "Sarah M.",
      dueDate: "Dec 12, 2024",
      project: "Website Redesign",
      tags: ["design", "review"],
      attachments: 2,
      comments: 5,
      checklist: { total: 4, completed: 2 }
    },
    {
      id: 2,
      title: "Update API documentation",
      description: "Update the API documentation with new endpoints and examples",
      status: "todo",
      priority: "medium",
      assignee: "David J.",
      dueDate: "Dec 15, 2024",
      project: "Mobile App Development",
      tags: ["documentation", "api"],
      attachments: 0,
      comments: 2,
      checklist: { total: 6, completed: 0 }
    },
    {
      id: 3,
      title: "Prepare presentation slides",
      description: "Create presentation slides for the quarterly review meeting",
      status: "completed",
      priority: "low",
      assignee: "Emma W.",
      dueDate: "Dec 10, 2024",
      project: "Q4 Marketing Campaign",
      tags: ["presentation", "marketing"],
      attachments: 3,
      comments: 8,
      checklist: { total: 8, completed: 8 }
    },
    {
      id: 4,
      title: "Fix authentication bug",
      description: "Investigate and fix the authentication issue in the login flow",
      status: "in-progress",
      priority: "high",
      assignee: "Mike R.",
      dueDate: "Dec 12, 2024",
      project: "Mobile App Development",
      tags: ["bug", "security"],
      attachments: 1,
      comments: 12,
      checklist: { total: 3, completed: 1 }
    },
    {
      id: 5,
      title: "Set up CI/CD pipeline",
      description: "Configure continuous integration and deployment pipeline",
      status: "todo",
      priority: "medium",
      assignee: "John D.",
      dueDate: "Dec 20, 2024",
      project: "Data Migration",
      tags: ["devops", "automation"],
      attachments: 0,
      comments: 3,
      checklist: { total: 5, completed: 0 }
    },
    {
      id: 6,
      title: "Conduct user research interviews",
      description: "Schedule and conduct user interviews for the new feature",
      status: "planning",
      priority: "medium",
      assignee: "Sarah M.",
      dueDate: "Dec 18, 2024",
      project: "Customer Portal",
      tags: ["research", "user-feedback"],
      attachments: 0,
      comments: 1,
      checklist: { total: 7, completed: 0 }
    }
  ];

  const columns = [
    { id: "todo", title: "To Do", tasks: tasks.filter(t => t.status === "todo") },
    { id: "planning", title: "Planning", tasks: tasks.filter(t => t.status === "planning") },
    { id: "in-progress", title: "In Progress", tasks: tasks.filter(t => t.status === "in-progress") },
    { id: "completed", title: "Completed", tasks: tasks.filter(t => t.status === "completed") }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-blue-500";
      case "todo": return "bg-gray-500";
      case "planning": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const handleTaskSelect = (taskId: number) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === tasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(tasks.map(t => t.id));
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and organize your team's tasks
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="website">Website Redesign</SelectItem>
              <SelectItem value="mobile">Mobile App</SelectItem>
              <SelectItem value="marketing">Marketing Campaign</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedTasks.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg mb-6">
          <span className="text-sm font-medium">
            {selectedTasks.length} task{selectedTasks.length !== 1 ? 's' : ''} selected
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Change Status</Button>
            <Button size="sm" variant="outline">Assign To</Button>
            <Button size="sm" variant="outline">Add Tags</Button>
            <Button size="sm" variant="destructive">Delete</Button>
          </div>
        </div>
      )}

      {/* View Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)}>
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="board" aria-label="Board view">
              <Kanban className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Table view">
              <TableIcon className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="timeline" aria-label="Timeline view">
              <GanttChart className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {tasks.length} tasks
        </div>
      </div>

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Checkbox 
                    checked={selectedTasks.includes(task.id)}
                    onCheckedChange={() => handleTaskSelect(task.id)}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{task.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                            {task.priority}
                          </Badge>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
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
                            Edit Task
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
                    
                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-5 w-5">
                          <AvatarFallback className="text-xs">
                            {task.assignee.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span>{task.assignee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Due {task.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        <span>{task.project}</span>
                      </div>
                      {task.attachments > 0 && (
                        <div className="flex items-center gap-2">
                          <Paperclip className="h-4 w-4" />
                          <span>{task.attachments}</span>
                        </div>
                      )}
                      {task.comments > 0 && (
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>{task.comments}</span>
                        </div>
                      )}
                    </div>
                    
                    {task.checklist.total > 0 && (
                      <div className="flex items-center gap-2 mt-3">
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {task.checklist.completed}/{task.checklist.total} checklist items
                        </span>
                        <Progress 
                          value={(task.checklist.completed / task.checklist.total) * 100} 
                          className="w-20 h-1" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Board View (Kanban) */}
      {viewMode === "board" && (
        <div className="flex gap-6 overflow-x-auto pb-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-80">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{column.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {column.tasks.length}
                  </Badge>
                </div>
                <Button size="sm" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <Card key={task.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Edit Task</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {task.description}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                            {task.priority}
                          </Badge>
                          {task.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {task.assignee.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {task.attachments > 0 && (
                              <div className="flex items-center gap-1">
                                <Paperclip className="h-3 w-3" />
                                <span>{task.attachments}</span>
                              </div>
                            )}
                            {task.comments > 0 && (
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-3 w-3" />
                                <span>{task.comments}</span>
                              </div>
                            )}
                            {task.checklist.total > 0 && (
                              <div className="flex items-center gap-1">
                                <CheckSquare className="h-3 w-3" />
                                <span>{task.checklist.completed}/{task.checklist.total}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Due {task.dueDate}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedTasks.length === tasks.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedTasks.includes(task.id)}
                        onCheckedChange={() => handleTaskSelect(task.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-muted-foreground line-clamp-1">
                          {task.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                        <Badge variant="outline" className="text-xs capitalize">
                          {task.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(task.priority)} className="text-xs">
                        {task.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {task.assignee.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignee}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{task.dueDate}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{task.project}</div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
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

      {/* Timeline View Placeholder */}
      {viewMode === "timeline" && (
        <Card>
          <CardHeader>
            <CardTitle>Timeline View</CardTitle>
            <CardDescription>
              Gantt chart view for task dependencies and timelines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <div className="text-center">
                <GanttChart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Timeline view coming soon</p>
                <p className="text-sm">This will show task dependencies and timelines in a Gantt chart format</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 