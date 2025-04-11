"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/types/user";
import useSWR from "swr";
import { toast } from "sonner";
interface UserContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  accessTokenExpiry: number | null;
  setAccessToken: (token: string | null) => void;
  refreshAccessToken: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  signout: () => Promise<void>;
  user: User | null;
  loading: boolean;
  initialized: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accessTokenExpiry, setAccessTokenExpiry] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  // Derive isAuthenticated from accessToken
  const isAuthenticated = !!accessToken;

  const { data: user, mutate: refetchUser } = useSWR(
    `/api/me`,
    async (url: string) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    },
    {
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      refreshInterval: 0,
    }
  );

  const updateUser = async (updatedUser: User) => {
    try {
      const response = await axios.put(`/api/me`, updatedUser, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      refetchUser();
      toast.success("User updated successfully!");
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const refreshAccessToken = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/refresh-token");
      if (response.status !== 200) {
        setAccessToken(null);
        setAccessTokenExpiry(null);
        return;
      }

      const { accessToken, accessTokenExpiry } = response.data;
      setAccessToken(accessToken);
      setAccessTokenExpiry(accessTokenExpiry);
      if (accessToken) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      }
    } catch {
      setAccessToken(null);
      setAccessTokenExpiry(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  };

  const signout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/refresh-token/logout");
      setAccessToken(null);
      setAccessTokenExpiry(null);
      if (typeof window !== "undefined") {
        delete axios.defaults.headers.common["Authorization"];
      }
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
      toast.success("Successfully signed out");
    }
  };

  // Call refetchUser only when a valid token is present
  useEffect(() => {
    if (isAuthenticated) {
      refetchUser();
    }
  }, [isAuthenticated, accessToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (accessTokenExpiry && Date.now() >= accessTokenExpiry) {
        refreshAccessToken();
      }
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [accessTokenExpiry]);

  useEffect(() => {
    // Initial token refresh with a brief delay to allow cookie initialization in the browser
    const timer = setTimeout(() => {
      refreshAccessToken();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        accessTokenExpiry,
        setAccessToken,
        refreshAccessToken,
        updateUser,
        signout,
        user,
        loading,
        initialized,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
