"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Mail, Lock, User, Building, Globe, Bell } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    jobTitle: "",
    teamName: "",
    defaultView: "board",
    notifications: true,
    timezone: "UTC"
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleEmailVerification = () => {
    setStep(3);
  };

  const handleAccountSetup = () => {
    // Navigate to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Account</h1>
          <p className="text-muted-foreground">
            {step === 1 && "Join thousands of teams using CTM"}
            {step === 2 && "Verify your email address"}
            {step === 3 && "Complete your profile setup"}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {step > stepNumber ? <CheckCircle className="w-4 h-4" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step > stepNumber ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Registration Form */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Create your account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      className="pl-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/signin" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Email Verification */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Verify Your Email</CardTitle>
              <CardDescription>
                We've sent a verification link to {formData.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Mail className="h-4 w-4" />
                <AlertDescription>
                  Check your email and click the verification link to continue.
                </AlertDescription>
              </Alert>

              <div className="text-center space-y-4">
                <Button onClick={handleEmailVerification} className="w-full">
                  I've Verified My Email
                </Button>
                <Button variant="outline" className="w-full">
                  Resend Email
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Account Setup */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>
                Set up your account preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Information */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile Information
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Product Manager"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src="/avatars/default.jpg" />
                      <AvatarFallback>
                        {formData.fullName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Upload Photo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Team Setup */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Team Setup
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="create-team"
                      name="team-option"
                      className="rounded"
                      defaultChecked
                    />
                    <Label htmlFor="create-team">Create a new team</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="join-team"
                      name="team-option"
                      className="rounded"
                    />
                    <Label htmlFor="join-team">Join an existing team</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="skip-team"
                      name="team-option"
                      className="rounded"
                    />
                    <Label htmlFor="skip-team">Skip for now</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input
                    id="teamName"
                    placeholder="Enter team name"
                    value={formData.teamName}
                    onChange={(e) => handleInputChange("teamName", e.target.value)}
                  />
                </div>
              </div>

              {/* Workspace Preferences */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Workspace Preferences
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultView">Default View</Label>
                  <Select value={formData.defaultView} onValueChange={(value) => handleInputChange("defaultView", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="board">Board View</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                      <SelectItem value="timeline">Timeline View</SelectItem>
                      <SelectItem value="calendar">Calendar View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Time Zone</Label>
                  <Select value={formData.timezone} onValueChange={(value) => handleInputChange("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time</SelectItem>
                      <SelectItem value="PST">Pacific Time</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications"
                    checked={formData.notifications}
                    onCheckedChange={(checked) => handleInputChange("notifications", checked)}
                  />
                  <Label htmlFor="notifications" className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Enable email notifications
                  </Label>
                </div>
              </div>

              <Button onClick={handleAccountSetup} className="w-full">
                Complete Setup
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 