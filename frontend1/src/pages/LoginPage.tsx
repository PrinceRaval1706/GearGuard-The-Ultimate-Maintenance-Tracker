import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Shield,
  Wrench,
  Mail,
  Lock,
  User,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  /* ================= LOGIN ================= */
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await api.post("/auth/login", loginData);

    // ✅ SAVE REAL TOKEN
    localStorage.setItem("token", res.data.token);

    toast({
      title: "Login successful",
      description: "Welcome to GearGuard",
    });

    navigate("/dashboard", { replace: true });
  } catch (error: any) {
    toast({
      title: "Login failed",
      description:
        error?.response?.data?.message || "Invalid email or password",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  /* ================= SIGNUP ================= */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.post("/auth/register", signupData);

      toast({
        title: "Account created!",
        description: "You can now sign in.",
      });

      setSignupData({ name: "", email: "", password: "" });
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description:
          error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Shield className="h-8 w-8" />
            </div>
            <span className="text-2xl font-bold">GearGuard</span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold">
              The Ultimate
              <br />
              Maintenance Tracker
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Seamlessly connect Equipment, Teams, and Requests.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="p-4 bg-white/10 rounded-xl">
                <Wrench className="h-6 w-6 mb-2" />
                <p className="font-medium">Equipment Tracking</p>
              </div>
              <div className="p-4 bg-white/10 rounded-xl">
                <Shield className="h-6 w-6 mb-2" />
                <p className="font-medium">Preventive Care</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-primary-foreground/60">
            © 2024 GearGuard
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end p-6">
          <ThemeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome</CardTitle>
              <CardDescription>
                Sign in or create a new account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                {/* LOGIN */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      required
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value,
                        })
                      }
                    />

                    <Label>Password</Label>
                    <Input
                      type="password"
                      required
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>

                {/* SIGNUP */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <Label>Name</Label>
                    <Input
                      required
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          name: e.target.value,
                        })
                      }
                    />

                    <Label>Email</Label>
                    <Input
                      type="email"
                      required
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                    />

                    <Label>Password</Label>
                    <Input
                      type="password"
                      required
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating..." : "Create Account"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
