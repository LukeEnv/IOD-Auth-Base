"use client";

import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import Login from "./_pages/login";
import Register from "./_pages/register";

export default function AuthPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Welcome to the Auth Page</h1>
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="register">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
}
