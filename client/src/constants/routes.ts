export const API_ROUTES = {
  JOBS: "/jobs",
  JOB_STATUS: (id: string) => `/jobs/${id}/status`,
  DELETE_JOB: (id: string) =>  `/jobs/${id}`
}