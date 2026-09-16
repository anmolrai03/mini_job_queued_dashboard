import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { JobsService } from "./jobs.service";
import { CreateJobDto, UpdateJobStatusDto } from "./jobs.dto";


@Controller("jobs")
export class JobsController{
  constructor(private readonly jobsService: JobsService){}

  @Get()
  getJobs(){
    return this.jobsService.getJobs();
  }

  @Post()
  postJob(@Body() createJobDto: CreateJobDto){
    return this.jobsService.createJob(createJobDto);
  }

  @Patch("/:id/status")
  updateJob(
    @Param("id") id: string,
    @Body() updateJobStatusDto: UpdateJobStatusDto
  ){
    return this.jobsService.updateJobStatus(id, updateJobStatusDto);
  }

  @Delete("/:id")
  deleteJob(@Param("id") id: string){
    return this.jobsService.deleteJob(id);
  }
}