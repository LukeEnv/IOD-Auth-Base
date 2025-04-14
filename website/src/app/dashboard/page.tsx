"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useUserContext } from "@/lib/contexts/user";
import Radial from "@/components/radial-chart";
import Activity from "./activity";

export default function DashboardPage() {
  const { user } = useUserContext();

  if (!user) {
    return <div>Loading...</div>;
  }

  const data = {
    steps: 1247,
    stepsGoal: 10000,
    activity: 23,
    activityGoal: 30,
  };

  return (
    <div className="flex flex-col gap-4 max-w-screen-xl w-full font-poppins">
      <div className="flex flex-col gap-2">
        <p className="text-4xl font-bold flex items-center gap-2">
          Hello {user.name}!
        </p>
        <p>Ready to track your progress and achieve your goals!?</p>
        <div className="flex flex-col gap-2 mt-4">
          <p className="font-bold">Today&apos;s progress</p>
          <div className="grid grid-cols-4 gap-4">
            <Card className=" rounded-2xl p-0">
              <div className="flex justify-between w-full px-4 py-2 items-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-bold font-poppins">Steps</p>
                  <Badge className="animate-loadinquick">GOAL 10,000</Badge>
                </div>
                <div className="min-w-[70px]">
                  <Radial
                    title="Steps"
                    label={data.steps.toString()}
                    percentage={(data.steps / data.stepsGoal) * 100}
                  />
                </div>
              </div>
            </Card>
            <Card className=" rounded-2xl p-0">
              <div className="flex justify-between w-full px-4 py-2 items-center gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-2xl font-bold font-poppins">Activity</p>
                  <Badge className="animate-loadinquick">GOAL 30 MINS</Badge>
                </div>
                <div className="min-w-[70px]">
                  <Radial
                    title="Activity"
                    label={data.activity.toString()}
                    percentage={(data.activity / data.activityGoal) * 100}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
        <Activity />
      </div>
    </div>
  );
}
