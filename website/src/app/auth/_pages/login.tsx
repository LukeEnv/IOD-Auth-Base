import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login() {
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    axios
      .post("/api/auth/login", {
        username,
        password,
      })
      .then((response) => {
        console.log("Login successful:", response.data);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
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
          <Button>Login</Button>
        </div>
      </form>
    </Form>
  );
}
