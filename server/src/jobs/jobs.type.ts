export const JOB_STATUSES = [
  "pending" , "running" , "completed" , "failed"
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export const ALLOWED_TRANSITIONS: Record<JobStatus, JobStatus[]> = {
  "pending": ["running"],
  "running": ["completed" , "failed"],
  "completed": [],
  "failed": []
};