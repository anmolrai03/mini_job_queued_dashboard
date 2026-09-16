export const JOB_STATUSES = [
  "pending" , "running" , "completed" , "failed"
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];

export interface Job{
  id: string,
  title: string,
  type: string,
  status: JobStatus,
  createdAt: string
}