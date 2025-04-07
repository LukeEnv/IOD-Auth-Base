"use client";

import { useUserContext } from "@/lib/contexts/user";

export default function DashboardPage() {
  const { user } = useUserContext();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 max-w-screen-xl w-full">
      <div className="flex flex-col gap-2">
        <p className="text-4xl font-bold flex items-center gap-2">
          Hello {user.name}!
        </p>
        <p>Ready to track your progress and achieve your goals!?</p>
      </div>
    </div>
  );
}
