import { Injectable } from "@nestjs/common";
import { Job } from "./jobs.interface";
import { CreateJobDTO } from "./jobs.dto";
import { randomUUID } from "crypto";

@Injectable()
export class JobsService{

  private jobs: Job[] = [
    {
      id: randomUUID(),
      title: "a video processing",
      type: "video",
      status: "pending",
      createdAt: new Date()
    }
  ];

  getJobs(): Job[]{
    return this.jobs;
  }

  createJob(jobDto: CreateJobDTO){
    const newJob: Job = {
      id: randomUUID(),
      title: jobDto.title,
      type: jobDto.type,
      status: "pending",
      createdAt: new Date()
    }

    this.jobs.push(newJob);
    return newJob;
  }

  updateJobStatus(id: number){

  }

  deleteJob(id: number){

  }

}