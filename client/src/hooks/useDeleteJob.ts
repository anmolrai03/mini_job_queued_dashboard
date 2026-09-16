import { useState } from "react";
import { deleteJobAPI } from "../api/jobsApi";

export function useDeleteJob(refetch: () => void) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteJob = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteJobAPI(id);
      if (refetch) refetch();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Something went wrong deleting the job.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteJob };
}
