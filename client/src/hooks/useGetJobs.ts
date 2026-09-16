import { useEffect, useState, useCallback } from "react";
import type { Job } from "../types/job";
import { getJobsAPI } from "../api/jobsApi";

export function useGetJobs() {
  const [data, setData] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const fetchJobs = useCallback( async () => {
    setLoading(true);
    setError(null);

    try {
      const jobs = await getJobsAPI();
      setData(jobs);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong fetching all jobs.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchJobs();
  }, [fetchJobs]);

  return { loading, data, error, refetch: fetchJobs };
}
