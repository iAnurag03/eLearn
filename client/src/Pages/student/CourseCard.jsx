import { AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

const CourseCard = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://img-c.udemycdn.com/course/750x422/4965902_1592_9.jpg"
          className="w-full h-36 object-cover rounded-t-lg"
          alt = "thumbnail"
        />
      </div>
      <CardContent className="px-1 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">Redux state managment</h1>
        <div className="flex items-center justify-between rounded-full">
        <div className="flex items-center gap-3 ">
            <Avatar className="h-8 w-8 ">
                <AvatarImage src="https://github.com/shadcn.png" className="rounded-full"/>
                <AvatarFallback>cn</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm ">Instrucor Naam</h1>
        </div>
        <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'}>Intermediate</Badge>
        </div>
        <div className="text-lg font-bold">
            <span> ₹999</span>
        </div>
      </CardContent>

    </Card>
  );
};

export default CourseCard;
