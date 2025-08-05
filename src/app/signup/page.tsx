"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  Mail,
  Lock,
  User,
  Building,
  Globe,
  Bell,
  AlertCircle,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useAuthContext } from "@/contexts/auth-context";
import {
  createProfile,
  updateProfile,
  upsertProfile,
  getProfile,
} from "@/lib/profile";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { getGravatarUrl } from "@/lib/gravatar";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, user: authUser } = useAuthContext();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    jobTitle: "",
    // teamName: "",
    defaultView: "board",
    notifications: true,
    timezone: "UTC",
    gravatarUrl: "",
  });
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear errors when user starts typing
    if (error) setError(null);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      // Follow the proper workflow: Sign up → Email & Password → Email Verification
      const { data, error } = await signUp(formData.email, formData.password);

      if (error) {
        setError(error.message);
      } else {
        setSuccess(
          "Account created successfully! Please check your email to verify your account."
        );
        setStep(2);
        setResendTimer(60);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerification = async () => {
    setLoading(true);
    try {
      // After email verification, user should be able to sign in
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

      if (signInError) {
        setError("Please verify your email first, then try again.");
      } else {
        setSuccess("Email verified and signed in successfully!");
        const gravatarUrl = getGravatarUrl(formData.email);
        setFormData((prev) => ({ ...prev, gravatarUrl }));
        setStep(3);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: formData.email,
      options: {
        emailRedirectTo: `${location.origin}/signup`,
      },
    });
    if (error) console.error("Resend email error:", error.message);
    setStep(2);
    setSuccess("Email resent successfully!");
    setError(null);
  };

  const handleAccountSetup = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get current session to ensure user is authenticated
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        setError("Failed to get session. Please try signing in again.");
        return;
      }

      if (!session?.user) {
        setError(
          "No active session found. Please complete email verification first."
        );
        return;
      }

      const user = session.user;

      // Use upsertProfile to handle cases where profile might not exist
      const { data: profileData, error: profileError } = await upsertProfile({
        id: user.id,
        email: user.email || formData.email,
        full_name: formData.fullName,
        job_title: formData.jobTitle,
        // team_name: formData.teamName,
        default_view: formData.defaultView,
        timezone: formData.timezone,
        notifications_enabled: formData.notifications,
      });

      if (profileError) {
        // Try to create profile if update fails
        const { data: createData, error: createError } = await createProfile({
          id: user.id,
          email: user.email || formData.email,
          full_name: formData.fullName,
          job_title: formData.jobTitle,
          // team_name: formData.teamName,
          default_view: formData.defaultView,
          timezone: formData.timezone,
          notifications_enabled: formData.notifications,
        });

        if (createError) {
          setError(`Failed to create profile: ${createError.message}`);
        } else {
          setSuccess("Profile created successfully!");
          router.push("/dashboard");
        }
      } else {
        setSuccess("Profile updated successfully!");
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    const signInWithGoogle = async () => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/signup`,
        },
      });
      if (error) console.error("Google sign-in error:", error.message);
    };
    signInWithGoogle();
    setStep(2);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    setUploading(true);

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      toast.error("Upload failed.");
      console.error(uploadError);
      setUploading(false);
      return;
    }

    const { data: publicData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    setImageUrl(publicData?.publicUrl ?? "");
    setFormData((prev) => ({ ...prev, gravatarUrl: "" }));
    toast.success("Image uploaded!");
    setUploading(false);
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    setFormData((prev) => ({ ...prev, gravatarUrl: "" }));
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
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > stepNumber ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      step > stepNumber ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Registration Form */}
        {step === 1 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Create your account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Error Message */}
              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Success Message */}
              {success && (
                <Alert className="mb-4 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

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
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="my-4 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin("google")}
                    className="flex items-center gap-2"
                  >
                    <FcGoogle className="w-4 h-4" />
                    <span className="hidden sm:inline">Google</span>
                  </Button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Email Verification */}
        {step === 2 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Verify Your Email</CardTitle>
              <CardDescription>
                We've sent a verification link to {formData.email}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error Message */}
              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {/* Success Message */}
              {success && (
                <Alert className="mb-4 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              <div className="text-center space-y-4">
                <Button onClick={handleEmailVerification} className="w-full">
                  I've Verified My Email
                </Button>

                <Button
                  disabled={resendTimer > 0}
                  variant="outline"
                  className="w-full"
                  onClick={handleResendEmail}
                >
                  {resendTimer > 0
                    ? `Resend in ${resendTimer}s`
                    : "Resend Email"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Account Setup */}
        {step === 3 && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>Set up your account preferences</CardDescription>
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
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Product Manager"
                    value={formData.jobTitle}
                    onChange={(e) =>
                      handleInputChange("jobTitle", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Profile Picture</Label>

                  <div className="flex items-center gap-4 my-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={imageUrl || formData.gravatarUrl} />
                      <AvatarFallback>
                        {(formData.fullName || "U")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="space-y-4 max-w-sm mx-auto">
                      <Label htmlFor="avatar">Upload Avatar</Label>
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                      />

                      {uploading && (
                        <p className="text-sm text-blue-600">Uploading...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Setup */}
              {/* <div className="space-y-4">
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
                    onChange={(e) =>
                      handleInputChange("teamName", e.target.value)
                    }
                  />
                </div>
              </div> */}

              {/* Workspace Preferences */}
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Workspace Preferences
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="defaultView">Default View</Label>
                  <Select
                    value={formData.defaultView}
                    onValueChange={(value) =>
                      handleInputChange("defaultView", value)
                    }
                  >
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
                  <Select
                    value={formData.timezone}
                    onValueChange={(value) =>
                      handleInputChange("timezone", value)
                    }
                  >
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
                    onCheckedChange={(checked) =>
                      handleInputChange("notifications", checked)
                    }
                  />
                  <Label
                    htmlFor="notifications"
                    className="flex items-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    Enable email notifications
                  </Label>
                </div>
              </div>

              <Button
                onClick={handleAccountSetup}
                className="w-full"
                disabled={loading}
              >
                {loading ? "Setting Up..." : "Complete Setup"}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
