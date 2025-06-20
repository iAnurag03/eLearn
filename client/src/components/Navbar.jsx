import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/DarkMode";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const [open, setOpen] = React.useState(false);
  const [logoutUser, {data, isSuccess}] = useLogoutUserMutation();
  const navigate = useNavigate();

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "user logged out");
       navigate("/login")
    }
  },[isSuccess]);

  const logoutHandler = async()=>{
    await logoutUser();
  }

  
  
  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      <div className="md:flex max-w-7xl mx-autp hidden md:flex justify-between items-center gap-10">
        <div>
          <School size={"30"} />
          <h1 className="hidden md:block font-extrabold text-2xl ">e-learn</h1>
        </div>

        <div className="flex items-center gap-5">
          {user ? (
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setOpen(false)}>
                    <Link to="my-learning">My Courses</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => setOpen(false)}>
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => {
                    setOpen(false);
                    logoutHandler();
                  }}>Logout</DropdownMenuItem>
                </DropdownMenuGroup>
 
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link to="/admin/dashboard">Dashboard</Link></DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Login</Button>
              <Button>Signup</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
       <div className="flex md:hidden items-center justify-between px-4 ">
        <h1 className="font-extrabold text-2xl">e-learn</h1>
      <MobileNavbar user={user}/>
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user }) => {
  const role = "instructor";
  const [logoutUser, {data, isSuccess}] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "user logged out");
      navigate("/login");
    }
  },[isSuccess, data, navigate]);

  const handleLogout = () => {
    setOpen(false);
    logoutUser();
  }

  const handleNavigation = (path) => {
    setOpen(false);
    navigate(path);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full bg-gray-200 hover:bg-gray-800">
          {user ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.photoUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          ) : (
            <Menu />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col" >
        <SheetHeader className="flex flex-row justify-between items-center">
          <SheetTitle>My Account</SheetTitle>
           <DarkMode/>
        </SheetHeader>
           <Separator className="mr-2"/>
           <nav className="flex flex-col space-y-4"> 
              <button 
                onClick={() => handleNavigation("/my-learning")}
                className="text-left hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md"
              >
                My Course
              </button>
              <button 
                onClick={() => handleNavigation("/profile")}
                className="text-left hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md"
              >
                Edit Profile
              </button>
              <button 
                onClick={handleLogout}
                className="text-left hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md"
              >
                Logout
              </button>
           </nav>
           {
           role==="instructor" && (      
           <SheetFooter>
              <Button onClick={() => {
                setOpen(false);
                navigate("/admin/dashboard");
              }}>
                Dashboard
              </Button>
          </SheetFooter>
           )}
      </SheetContent>
    </Sheet>
  );
};
