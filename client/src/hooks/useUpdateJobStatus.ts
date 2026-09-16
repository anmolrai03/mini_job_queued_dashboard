import { useState } from "react";
import type { Job, JobStatus } from "../types/job";
import { updateJobStatusAPI } from "../api/jobsApi";

export function useUpdateJobStatus(refetch: () => void) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Job | null>(null);

  const updateJobStatus = async (id: string, status: JobStatus) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await updateJobStatusAPI(id, status);
      setData(updated);
      if (refetch) refetch();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Something went wrong updating job status.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, updateJobStatus };
}
