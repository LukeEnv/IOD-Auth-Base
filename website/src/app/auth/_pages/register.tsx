import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

export default function Register() {
  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = ({
    name,
    username,
    password,
  }: {
    name: string;
    username: string;
    password: string;
  }) => {
    axios
      .post("/api/users", {
        name,
        username,
        password,
      })
      .then((response) => {
        toast.success("Signup successful!");
        console.log("Signup successful:", response.data);
      })
      .catch((error) => {
        toast.error("Signup failed!");
        console.error("Signup failed:", error);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <Input {...field} placeholder="Name" type="text" />
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <Input {...field} placeholder="Username" type="text" />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <Input {...field} placeholder="Password" type="password" />
            )}
          />
          <Button>Signup</Button>
        </div>
      </form>
    </Form>
  );
}
