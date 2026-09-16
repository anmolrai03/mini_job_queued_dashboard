import { API_ROUTES } from "../constants/routes";
import { type Job, type JobStatus } from "../types/job";
import { apiHandler } from "./apiHandler";

// GET ALL JOBS
export function getJobsAPI() {
  return apiHandler<Job[]>(API_ROUTES.JOBS, {
    method: "GET",
  });
}

// CREATE A JOB
export function createJobAPI(title: string, type: string) {
  return apiHandler<Job>(API_ROUTES.JOBS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, type }),
  });
}

// UPDATE EXISTING JOB
export function updateJobStatusAPI(
  id: string,
  status: JobStatus,
): Promise<Job> {
  return apiHandler<Job>(API_ROUTES.JOB_STATUS(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
}

// DELETE A JOB
export function deleteJobAPI(id: string): Promise<void> {
  return apiHandler<void>(API_ROUTES.DELETE_JOB(id), {
    method: "DELETE",
  });
}
