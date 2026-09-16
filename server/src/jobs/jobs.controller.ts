import { Body, Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { CreateJobDTO } from "./jobs.dto";


@Controller("jobs")
export class JobsController{
  constructor(private readonly jobsService: JobsService){}

  @Get()
  getJobs(){
    return this.jobsService.getJobs();
  }

  @Post()
  postJob(@Body() createJobDto: CreateJobDTO){
    return this.jobsService.createJob(createJobDto);
  }

  @Patch("/:id/status")
  updateJob(){

  }

  @Delete("/:id")
  deleteJob(){

  }
}