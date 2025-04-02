"use client";

import { Button } from "@/components/ui/button";
import { useUserContext } from "@/lib/contexts/user";
import { redirect, RedirectType } from "next/navigation";

export default function Page() {
  const { user, accessToken } = useUserContext();

  return (
    <div>
      <h1>Welcome to the User Page</h1>
      <p>This is a simple user page.</p>

      {accessToken && (
        <div className="flex flex-col gap-4 mt-5">
          <h2>Access Token</h2>
          <p>{accessToken}</p>
        </div>
      )}

      {user ? (
        <div className="flex flex-col gap-4 mt-5">
          <h2>User Information</h2>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mt-5">
            <p>You are not logged in</p>
            <Button onClick={() => redirect("/auth", RedirectType.push)}>
              Log in
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
