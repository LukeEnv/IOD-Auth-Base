"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { useUserContext } from "@/lib/contexts/user";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function AddActivity() {
  const { AddActivity } = useUserContext();
  const form = useForm({
    defaultValues: {
      name: "",
      duration: 0,
      calories: 0,
      distance: 0,
      date: "",
    },
  });

  const handleUpdateActivity = async (data: {
    name: string;
    duration: number;
    calories: number;
    distance: number;
    date: string;
  }) => {
    await AddActivity(data);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="flex ">
        <Button className="ml-auto">Add Activity</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Activity</DialogTitle>
          <DialogDescription>
            Make changes to your activity here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleUpdateActivity)}
        >
          <div className="font-poppins text-xs flex flex-col gap-2">
            <p className="font-semibold">Activity Name</p>
            <Input
              placeholder="Activity Name"
              {...form.register("name", {
                required: "Activity name is required",
              })}
            />
          </div>
          <div className="font-poppins text-xs flex flex-col gap-2">
            <p className="font-semibold">Duration</p>
            <Input
              placeholder="Duration"
              {...form.register("duration", {
                required: "Duration is required",
              })}
            />
          </div>
          <div className="font-poppins text-xs flex flex-col gap-2">
            <p className="font-semibold">Calories</p>
            <Input
              placeholder="Calories"
              {...form.register("calories", {
                required: "Calories is required",
              })}
            />
          </div>
          <div className="font-poppins text-xs flex flex-col gap-2">
            <p className="font-semibold">Distance</p>
            <Input
              placeholder="Distance"
              {...form.register("distance", {
                required: "Distance is required",
              })}
            />
          </div>
          <div className="font-poppins text-xs flex flex-col gap-2">
            <p className="font-semibold">Date</p>
            <Input
              placeholder="Date"
              {...form.register("date", {
                required: "Date is required",
              })}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
      <DialogClose />
    </Dialog>
  );
}
