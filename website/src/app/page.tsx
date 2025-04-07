"use client";

import { Button } from "@/components/ui/button";
import { useUserContext } from "@/lib/contexts/user";
import { redirect, RedirectType } from "next/navigation";
import { Activity } from "lucide-react";

export default function Page() {
  const { isAuthenticated } = useUserContext();

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className="flex flex-col gap-4 max-w-screen-xl w-full">
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-bold flex items-center gap-2">
            <Activity className="text-orange-600" />
            Track your exercise activity
          </p>
          <p>Get more active and track your exercise progress.</p>
        </div>
        <div>
          {isAuthenticated ? (
            <Button
              onClick={() => {
                redirect("/dashboard", RedirectType.push);
              }}
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button
              onClick={() => {
                redirect("/auth", RedirectType.push);
              }}
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
