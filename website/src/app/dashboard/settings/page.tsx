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
import { useEffect, useState } from "react";

export default function Page() {
  const { user, updateUser } = useUserContext();
  const [isChanged, setIsChanged] = useState(false);

  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      username: user?.username || "",
      password: "",
    },
  });

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
    // Compare the current form values with the original user values to check for changes
    const changedValues = Object.keys(data).reduce((acc, key) => {
      const typedKey = key as keyof typeof data;
      if (data[typedKey] !== user?.[typedKey]) {
        acc[typedKey] = data[typedKey];
      }
      return acc;
    }, {} as Partial<typeof data>);

    // Only invoke updateUser if there are changes
    if (Object.keys(changedValues).length > 0) {
      updateUser(changedValues);
      setIsChanged(false);
    } else {
      console.log("No changes detected.");
    }
  };

  const handleInputChange = () => {
    const currentValues = form.getValues();
    const hasChanges = Object.keys(currentValues).some((key) => {
      const typedKey = key as keyof typeof currentValues;
      return currentValues[typedKey] !== user?.[typedKey];
    });
    setIsChanged(hasChanges);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-4xl font-bold flex items-center gap-2">Settings</p>
      <p>Update your profile settings below.</p>

      <Card className="w-full mt-10 p-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={handleInputChange}
            className="space-y-4"
          >
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
                    Leave blank if you don't want to change your password.
                  </FormDescription>
                </FormItem>
              )}
            />
            <Button
              className="cursor-pointer"
              type="submit"
              size={"sm"}
              disabled={!isChanged}
            >
              Save
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
