"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { User } from "@/types/user";
import useSWR from "swr";

interface UserContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  accessTokenExpiry: number | null;
  setAccessToken: (token: string | null) => void;
  refreshAccessToken: () => Promise<void>;
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accessTokenExpiry, setAccessTokenExpiry] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const { data: user, mutate: refetchUser } = useSWR(
    `/api/me`,
    async (url: string) => {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    }
  );

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("/api/auth/refresh-token");
      if (response.status !== 200) {
        setAccessToken(null);
        setAccessTokenExpiry(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const { accessToken, accessTokenExpiry } = response.data;

      setAccessToken(accessToken);
      setAccessTokenExpiry(accessTokenExpiry);
    } catch {
      //console.error("Error refreshing access token:", error);
    }
  };

  // FUNCTIONS

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
    refreshAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, [accessToken]);

  // RETURN

  return (
    <UserContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        accessTokenExpiry,
        setAccessToken,
        refreshAccessToken,
        user,
        loading,
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
