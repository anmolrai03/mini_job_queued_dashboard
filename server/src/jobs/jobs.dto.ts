import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { JOB_STATUSES } from "./jobs.type";
import type {  JobStatus } from "./jobs.type";


export class CreateJobDto{
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}

export class UpdateJobStatusDto{
  @IsString()
  @IsNotEmpty()
  @IsIn(JOB_STATUSES)
  status: JobStatus
}