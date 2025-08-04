"use client";

import { useState, useEffect } from "react";
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
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Search,
  Bell,
  Plus,
  CheckSquare,
  Calendar,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Home,
  FolderOpen,
  Star,
  Clock,
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  FileText,
  Zap,
} from "lucide-react";
import { useAuthContext } from "@/contexts/auth-context";
import { getProfile } from "@/lib/profile";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/ui/loading";

export default function DashboardPage() {
  const router = useRouter();
  const { user, signOut, loading } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (user && !profileLoading) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await getProfile(user.id);
      if (error) {
        console.error("Error loading profile:", error);
      } else {
        setUserProfile(data);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      router.push("/signin");
    }
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [loading, user]);

  // While checking auth or redirecting
  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  const quickStats = [
    {
      title: "Tasks Due Today",
      value: "12",
      change: "+2",
      icon: Clock,
      color: "text-blue-500",
    },
    {
      title: "Overdue Tasks",
      value: "3",
      change: "-1",
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      title: "Completed This Week",
      value: "28",
      change: "+5",
      icon: CheckSquare,
      color: "text-green-500",
    },
    {
      title: "Active Projects",
      value: "8",
      change: "+1",
      icon: FolderOpen,
      color: "text-purple-500",
    },
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Review design mockups",
      assignee: "Sarah M.",
      dueDate: "Today",
      priority: "high",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Update API documentation",
      assignee: "David J.",
      dueDate: "Tomorrow",
      priority: "medium",
      status: "todo",
    },
    {
      id: 3,
      title: "Prepare presentation slides",
      assignee: "Emma W.",
      dueDate: "Dec 15",
      priority: "low",
      status: "completed",
    },
    {
      id: 4,
      title: "Fix authentication bug",
      assignee: "Mike R.",
      dueDate: "Dec 12",
      priority: "high",
      status: "in-progress",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      user: "Sarah M.",
      action: "completed task",
      target: "Review design mockups",
      time: "2 hours ago",
      avatar: "SM",
    },
    {
      id: 2,
      user: "David J.",
      action: "commented on",
      target: "API documentation",
      time: "4 hours ago",
      avatar: "DJ",
    },
    {
      id: 3,
      user: "Emma W.",
      action: "created project",
      target: "Q4 Marketing Campaign",
      time: "6 hours ago",
      avatar: "EW",
    },
    {
      id: 4,
      user: "Mike R.",
      action: "assigned task to",
      target: "Sarah M.",
      time: "1 day ago",
      avatar: "MR",
    },
  ];

  const upcomingDeadlines = [
    { title: "Design Review", date: "Dec 12", project: "Website Redesign" },
    { title: "Client Presentation", date: "Dec 15", project: "Q4 Campaign" },
    { title: "Code Review", date: "Dec 18", project: "Mobile App" },
    { title: "Team Meeting", date: "Dec 20", project: "All Projects" },
  ];

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="min-h-screen bg-background">
        {/* Top Navigation Bar */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center px-4">
            <SidebarTrigger
              className="-ml-1 mr-2 h-6 w-6"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />

            <div className="flex items-center gap-2 mr-4">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CTM</span>
            </div>

            {/* Global Search */}
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks, projects, people..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 mr-4">
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Sarah completed a task
                      </p>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>DJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        David commented on your task
                      </p>
                      <p className="text-xs text-muted-foreground">
                        4 hours ago
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>EW</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Emma created a new project
                      </p>
                      <p className="text-xs text-muted-foreground">
                        6 hours ago
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={userProfile?.avatar_url || "/avatars/user.jpg"}
                    />
                    <AvatarFallback>
                      {userProfile?.full_name
                        ? userProfile.full_name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                        : user?.email?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userProfile?.full_name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Team Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Billing & Plans</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex">
          {/* Side Navigation Panel */}
          <Sidebar>
            <SidebarContent>
              <SidebarHeader>
                <div className="flex items-center gap-2 px-2">
                  <span className="text-sm font-medium">Workspace</span>
                </div>
              </SidebarHeader>

              <SidebarGroup>
                <SidebarGroupLabel>My Tasks</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center gap-2">
                          <CheckSquare className="h-4 w-4" />
                          Assigned to Me
                          <Badge variant="secondary" className="ml-auto">
                            8
                          </Badge>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Created by Me
                          <Badge variant="secondary" className="ml-auto">
                            12
                          </Badge>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Due Today
                          <Badge variant="secondary" className="ml-auto">
                            5
                          </Badge>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Overdue
                          <Badge variant="destructive" className="ml-auto">
                            3
                          </Badge>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Starred Projects
                          <Badge variant="secondary" className="ml-auto">
                            3
                          </Badge>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center gap-2">
                          <FolderOpen className="h-4 w-4" />
                          Recent Projects
                          <Badge variant="secondary" className="ml-auto">
                            5
                          </Badge>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center gap-2">
                          <Home className="h-4 w-4" />
                          All Projects
                          <Badge variant="secondary" className="ml-auto">
                            12
                          </Badge>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Teams</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          My Teams
                          <Badge variant="secondary" className="ml-auto">
                            2
                          </Badge>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Tools</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Calendar
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href="#" className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Reports & Analytics
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {userProfile?.full_name?.split(" ")[0] || "there"}
                ! 👋
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your projects today.
              </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickStats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-600">{stat.change}</span> from
                      last week
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* My Tasks Widget */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>My Tasks</CardTitle>
                  <CardDescription>
                    Your recent and priority tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <CheckSquare className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">
                              Assigned to {task.assignee} • Due {task.dueDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              task.priority === "high"
                                ? "destructive"
                                : task.priority === "medium"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {task.priority}
                          </Badge>
                          <Badge
                            variant={
                              task.status === "completed"
                                ? "default"
                                : "outline"
                            }
                          >
                            {task.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Tasks
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity Feed */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest updates from your team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{activity.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>{" "}
                            {activity.action}{" "}
                            <span className="font-medium">
                              {activity.target}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Deadlines */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>
                  Important dates and milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {upcomingDeadlines.map((deadline, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{deadline.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {deadline.project}
                        </p>
                      </div>
                      <Badge variant="outline">{deadline.date}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Panel */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common actions to get you started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-20 flex-col gap-2">
                    <Plus className="h-6 w-6" />
                    <span>Create New Project</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Users className="h-6 w-6" />
                    <span>Invite Team Member</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    <span>Schedule Meeting</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
