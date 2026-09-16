import { API_ROUTES } from "../constants/routes";
import type { Job } from "../types/job";
import { apiHandler } from "./apiHandler";

export function getJobsAPI() {
  return apiHandler<Job[]>(
    `${import.meta.env.VITE_API_BASE_URL}${API_ROUTES.JOBS}`,
    {
      method: "GET",
    }
  );
}