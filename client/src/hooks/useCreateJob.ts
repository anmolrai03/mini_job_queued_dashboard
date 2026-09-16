import { useState } from "react";
import type { Job } from "../types/job";
import { createJobAPI } from "../api/jobsApi";

export function useCreateJob() {
  const [data, setData] = useState<Job>();
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const createJob = async (title: string, type: string) : Promise<Job | null> => {
    setLoading(true);
    setError(null);

    try {
      const createdJob = await createJobAPI(title, type);
      setData(createdJob);
      return createdJob;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong creating the job.");
      }
      return null
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, createJob };
}
