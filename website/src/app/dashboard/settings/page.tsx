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
      password: "",
    },
  });

  const { formState } = form; // Access formState to use dirtyFields

  useEffect(() => {
    form.reset({
      name: user?.name || "",
      username: user?.username || "",
    });
  }, [user, form]);

  const onSubmit = (data: {
    name?: string;
    username?: string;
    password?: string;
  }) => {
    const changedValues: Partial<{
      name: string;
      username: string;
      password: string;
    }> = {};

    // Check for changes using dirtyFields
    if (formState.dirtyFields.name) changedValues.name = data.name;
    if (formState.dirtyFields.username) changedValues.username = data.username;
    if (formState.dirtyFields.password) changedValues.password = data.password;

    // Only invoke updateUser if there are changes
    if (Object.keys(changedValues).length > 0) {
      updateUser(changedValues);
    } else {
      console.log("No changes detected.");
    }
  };

  return (
    <div className="flex flex-col font-poppins">
      <p className="text-4xl font-bold flex items-center">Settings</p>
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
                      className="input "
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Your password"
                      className="input"
                    />
                  </FormControl>
                  <FormDescription>
                    Leave blank if you don&apos;t want to change your password.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              className="cursor-pointer"
              type="submit"
              size={"sm"}
              disabled={!formState.isDirty} // Disable button if no changes
            >
              Save
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
