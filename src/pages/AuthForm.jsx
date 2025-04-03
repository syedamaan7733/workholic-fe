import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { EyeIcon, EyeOffIcon, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/src/context/auth.context";
import { toast } from "sonner";

const AuthForm = () => {
  const { isAuthenticated, isLoading, error, login, register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [password, setPassword] = useState({
    registerPass: "",
    confirmPassword: "",
  });

  useEffect(() => {
    activeTab === "login"
      ? setFormData({ email: "", password: "" })
      : setFormData({ name: "", email: "", password: "" });
  }, [activeTab]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePassword = (e) => {
    try {
      const { name, value } = e.target;

      const updatedPass = { ...password, [name]: value || "" };
      setPassword(updatedPass);

      if (
        updatedPass.registerPass &&
        updatedPass.registerPass === updatedPass.confirmPassword
      ) {
        setFormData({ ...formData, password: updatedPass.confirmPassword });
      } else if (
        updatedPass.registerPass &&
        updatedPass.registerPass !== updatedPass.confirmPassword
      ) {
        setFormData({ ...formData, password: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("err", error);
  console.log(isAuthenticated);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === "login") {
      login({ email: formData.email, password: formData.password });
     
    } else {
      register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="login"
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="name@example.com"
                        type="email"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="text-sm text-blue-500 hover:text-blue-700"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="pl-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-name"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        placeholder="John Doe"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-email"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        placeholder="name@example.com"
                        type="email"
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-password"
                        name="registerPass"
                        onChange={handlePassword}
                        value={password.registerPass || ""}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className="pl-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <div className="relative ">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="register-confirm"
                        name="confirmPassword"
                        onChange={handlePassword}
                        value={password.confirmPassword || ""}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        className={`pl-10 border-2 outline-none focus:outline-none ${
                          password.confirmPassword !== "" &&
                          password.confirmPassword === password.registerPass
                            ? "border-green-500"
                            : password.confirmPassword !== "" &&
                              password.registerPass !== password.confirmPassword
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={!formData.password || isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            By continuing, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Privacy Policy
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
