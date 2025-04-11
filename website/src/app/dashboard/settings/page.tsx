"use client";

import { useUserContext } from "@/lib/contexts/user";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export default function Page() {
  const { user, updateUser } = useUserContext();

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
    },
  });

  useEffect(() => {
    form.reset({
      name: user?.name || "",
      username: user?.username || "",
    });
  }, [user, form]);

  const onSubmit = (data: any) => {
    updateUser(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-4xl font-bold flex items-center gap-2">Settings</p>
      <p>Update your profile settings below.</p>

      <Card className="w-full mt-10 p-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Your name"
                      className="input"
                    />
                  </FormControl>
                  <FormDescription>This is your display name.</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Your username"
                      className="input"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your unique username.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button className="cursor-pointer" type="submit" size={"sm"}>
              Save
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
