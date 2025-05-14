"use client";

import { Button } from "@/components/ui/button";
import { useActivityContext } from "@/lib/contexts/activity";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { useUserContext } from "@/lib/contexts/user";
import { Minus, Plus } from "lucide-react";
import Radial from "@/components/radial-chart";

export default function EditSteps() {
  const { user, editSteps } = useUserContext();
  const {} = useActivityContext();

  const [steps, setSteps] = useState(user?.steps || 0);

  function onClick(adjustment: number) {
    setSteps((prev) => prev + adjustment);
  }

  async function onSubmit() {
    await editSteps(steps);
  }

  return (
    <Drawer>
      <DrawerTrigger asChild className="flex ">
        <Button variant="outline">Edit Steps</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Adjust your steps</DrawerTitle>
            <DrawerDescription>
              Make changes to your steps here. Click save when you&apos;re done.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-50)}
                disabled={steps <= 0}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <Radial
                  title="Steps"
                  label={steps.toString()}
                  percentage={(steps / (user?.stepsGoal || 1)) * 100}
                />
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Steps
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(50)}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            {/* <div className="mt-3 h-[120px]">
              <Radial
                title="Steps"
                label={steps.toString()}
                percentage={(steps / (user?.stepsGoal || 1)) * 100}
              />
            </div> */}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button onClick={onSubmit}>Submit</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
      <DrawerClose />
    </Drawer>
  );
}
