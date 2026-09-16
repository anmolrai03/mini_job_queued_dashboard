import { UUID } from "crypto";
import { JobStatus } from "./jobs.type";

export interface Job{

  id: UUID;
  title: string;
  type: string;
  status: JobStatus;
  createdAt: Date
}