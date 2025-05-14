"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useTokenContext } from "./token";
import { Activity } from "@/types/user";
import useSWR from "swr";

interface ActivityContextType {
  loading: boolean;
  activities: Activity[];
  DeleteActivity: (id: number) => Promise<void>;
  AddActivity: (activity: {
    name: string;
    duration: number;
    calories: number;
    distance: number;
    date: string;
  }) => Promise<void>;
  UpdateActivity: (
    id: number,
    activity: {
      name: string;
      duration: number;
      calories: number;
      distance: number;
      date: string;
    }
  ) => Promise<void>;
}

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
);

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(true);

  const { accessToken } = useTokenContext();

  const { data: activities, mutate: refetchActivities } = useSWR<Activity[]>(
    `/api/activity`,
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
      refreshInterval: 0, // Disable automatic revalidation
    }
  );

  const AddActivity = async (activity: {
    name: string;
    duration: number;
    calories: number;
    distance: number;
    date: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/activity`, activity, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 201) {
        toast.success("Activity added successfully!");
        refetchActivities();
      } else {
        toast.error("Failed to add activity");
      }
    } catch (error) {
      console.error("Error adding activity:", error);
      toast.error("Error adding activity");
    } finally {
      setLoading(false);
    }
  };

  const UpdateActivity = async (
    id: number,
    activity: {
      name: string;
      duration: number;
      calories: number;
      distance: number;
      date: string;
    }
  ) => {
    setLoading(true);
    try {
      const response = await axios.put(`/api/activity/${id}`, activity, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        toast.success("Activity updated successfully!");
        refetchActivities();
      } else {
        toast.error("Failed to update activity");
      }
    } catch (error) {
      console.error("Error updating activity:", error);
      toast.error("Error updating activity");
    } finally {
      setLoading(false);
    }
  };

  const DeleteActivity = async (id: number) => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/activity/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        toast.success("Activity deleted successfully!");
        refetchActivities();
      } else {
        toast.error("Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error("Error deleting activity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ActivityContext.Provider
      value={{
        loading,
        activities: activities || [],
        DeleteActivity,
        AddActivity,
        UpdateActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivityContext = (): ActivityContextType => {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
