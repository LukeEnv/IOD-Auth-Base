"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserContext } from "@/lib/contexts/user";

import EditActivity from "./editActivity";
import AddActivity from "./addActivity";

export default function Activity() {
  const { user } = useUserContext();
  const { DeleteActivity } = useUserContext();

  function handleDeleteActivity(id: number) {
    DeleteActivity(id);
  }

  return (
    <div className="mt-10 font-poppins flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="font-bold">Activity</p>
        <AddActivity />
      </div>

      <Table>
        <TableCaption>A list of your recent exercises</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Activity</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Calories</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {user?.activities?.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>{activity.date}</TableCell>
              <TableCell>{activity.name}</TableCell>
              <TableCell>{activity.duration} mins</TableCell>
              <TableCell>{activity.calories}</TableCell>
              <TableCell>{activity.distance}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <EditActivity activity={activity} />
                <Button
                  className="cursor-pointer"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteActivity(activity.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
