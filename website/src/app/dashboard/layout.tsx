"use client";
import Header from "@/components/header";
import { useUserContext } from "@/lib/contexts/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading, initialized } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        console.log("User is not authenticated, redirecting to login...");
        router.push("/auth");
      }
    }
  }, [isAuthenticated, loading, router]);

  if (!initialized || loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-14 items-center">
      <Header />
      <div className="flex flex-col gap-4 max-w-screen-xl w-full p-4">
        {children}
      </div>
    </div>
  );
}
