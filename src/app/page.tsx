import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { CheckCircle, Users, TrendingUp, Zap, Star, Building2, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            🚀 Now Available
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Collaborative Task Management
            <span className="text-primary block">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Streamline your team's workflow with our intuitive task management platform. 
            Organize, track, and collaborate on projects with ease.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="/signup">Get Started Free</a>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8" asChild>
              <a href="/dashboard">Watch Demo</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose CTM?</h2>
          <p className="text-muted-foreground text-lg">
            Powerful features designed for modern teams
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Task Organization</CardTitle>
              <CardDescription>
                Organize tasks with intuitive lists, boards, and timelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Multiple Views</Badge>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Real-time Collaboration</CardTitle>
              <CardDescription>
                Work together seamlessly with live updates and team features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Team Sync</Badge>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Monitor project progress with detailed analytics and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Analytics</Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Trusted by Teams Worldwide</h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of teams already using CTM
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <CardDescription>
                "CTM has transformed how our team collaborates. The real-time updates and intuitive interface make project management a breeze."
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/avatars/sarah.jpg" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Sarah Mitchell</p>
                  <p className="text-sm text-muted-foreground">Product Manager, TechCorp</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <CardDescription>
                "The analytics and reporting features help us make data-driven decisions. Our productivity has increased by 40%."
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/avatars/david.jpg" />
                  <AvatarFallback>DJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">David Johnson</p>
                  <p className="text-sm text-muted-foreground">Team Lead, InnovateLab</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <CardDescription>
                "Perfect for remote teams. The collaboration features keep everyone connected and productive."
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/avatars/emma.jpg" />
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Emma Wilson</p>
                  <p className="text-sm text-muted-foreground">CTO, RemoteFirst</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <div className="flex justify-center items-center gap-8 opacity-60">
            <Building2 className="w-8 h-8" />
            <BarChart3 className="w-8 h-8" />
            <Zap className="w-8 h-8" />
            <Users className="w-8 h-8" />
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Used by 10,000+ teams worldwide
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">CTM</span>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-48">
                    <NavigationMenuLink asChild>
                      <a href="/features" className="block p-2 hover:bg-muted rounded">
                        Features
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a href="/pricing" className="block p-2 hover:bg-muted rounded">
                        Pricing
                      </a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-48">
                    <NavigationMenuLink asChild>
                      <a href="/about" className="block p-2 hover:bg-muted rounded">
                        About Us
                      </a>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <a href="/contact" className="block p-2 hover:bg-muted rounded">
                        Contact
                      </a>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="text-center mt-8 text-sm text-muted-foreground">
          © 2024 CTM. All rights reserved.
        </div>
      </footer>
    </div>
  );
}