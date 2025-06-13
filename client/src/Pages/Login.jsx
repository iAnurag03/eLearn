import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useRegisterUserMutation, useLoginUserMutation } from "../features/api/authApi.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


//login //signup -> signUp
//

const Login = () => {
  const [loginInput, SetLoginInput] = useState({ email: "", password: "" });
  const [signUpInput, SetSignUpInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();
   
  const navigate = useNavigate()
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      SetSignUpInput({ ...signUpInput, [name]: value });
    } else {
      SetLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signUpInput : loginInput;
    console.log(inputData);

    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(()=>{
    if(registerIsSuccess && registerData){
      toast.success(registerData?.message || "Signup successful");
    }
    if(loginIsSuccess && loginData){
      toast.success(loginData?.message || "Login successful");
      navigate("/");
    }
    if(loginError){
      toast.error(loginError?.data?.message || "Login failed");
    }
    if(registerError){
      toast.error(registerError?.data?.message || "Signup failed");
    }
  },[loginIsSuccess, registerIsSuccess, registerError, loginError, loginData, registerData])

  return (
    <div className="flex w-full items-center flex-col gap-6 mt-20">
      <Tabs defaultValue="signup">
        <TabsList>
          <TabsTrigger value="signup">SIGNUP</TabsTrigger>
          <TabsTrigger value="login">LOGIN</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                New to our platform? Create your account now.
              </CardDescription>
            </CardHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegistration("signup");
              }}
            >
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    placeholder="your name"
                    required
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="name"
                    value={signUpInput.name}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="email"
                    value={signUpInput.email}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    placeholder="create a password"
                    required
                    onChange={(e) => changeInputHandler(e, "signup")}
                    name="password"
                    value={signUpInput.password}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={registerIsLoading}>
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging In
                    </>
                  ) : (
                    "signup"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>
                Login to your account and continue learning
              </CardDescription>
            </CardHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegistration("login");
              }}
            >
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    onChange={(e) => changeInputHandler(e, "login")}
                    name="email"
                    value={loginInput.email}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    placeholder="enter your password"
                    required
                    onChange={(e) => changeInputHandler(e, "login")}
                    name="password"
                    value={loginInput.password}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loginIsLoading}>
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging In
                    </>
                  ) : (
                    "login"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
