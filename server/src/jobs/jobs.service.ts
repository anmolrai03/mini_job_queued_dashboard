import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJobDto, UpdateJobStatusDto } from './jobs.dto';
import { randomUUID, UUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEnity } from './jobs.entity';
import { Repository } from 'typeorm';
import { ALLOWED_TRANSITIONS, JOB_STATUSES, JobStatus } from './jobs.type';
import { NotFoundError } from 'rxjs';
import { Job } from './jobs.interface';

@Injectable()
export class JobsService {

  // CONSTRUCTOR WITH REPOSITORY STARTS HERE
  constructor(
    @InjectRepository(JobEnity)
    private readonly jobRepository: Repository<JobEnity>,
  ) {}

  // GET ALL JOBS SERVICE 
  async getJobs(): Promise<JobEnity[]> {
    return this.jobRepository.find();
  }

  // CREATE JOB SERVICE
  async createJob(jobDto: CreateJobDto): Promise<JobEnity> {
    const newJob = this.jobRepository.create({
      id: randomUUID(),
      title: jobDto.title,
      type: jobDto.type,
      status: 'pending',
      createdAt: new Date(),
    });

    return this.jobRepository.save(newJob);
  }

  // UPDATE JOB SERVICE
  async updateJobStatus(
    id: string,
    updateJobStatusDto: UpdateJobStatusDto,
  ): Promise<JobEnity> {
    
    const newStatus = updateJobStatusDto.status;

    // GET CURRENT JOB WITH ID
    const currJob = await this.jobRepository.findOneBy({id});

    if( !currJob ){
      throw new NotFoundException("Job do not exist.")
    }

    //GET THE STATUS
    const allowedNextStates =ALLOWED_TRANSITIONS[currJob.status];

    // check the allowed status.
    if( !allowedNextStates.includes(newStatus)){
      throw new ConflictException(`Cannot change the status from ${currJob.status} to ${newStatus}`)
    }

    const updateJobResult = await this.jobRepository.update(
      {id, status: currJob.status},
      {status: newStatus}
    )

    if( updateJobResult.affected === 0 ){
      throw new ConflictException("Job status changed before this update could be completed.")
    }

    // get the current status then use the .inclues rule  and if all succeds just return the last , but question is i sused findBy({id}) and it returns multiple job entities right , so like i can't just do currJob.status , right

    return this.jobRepository.findOneByOrFail({id});
  }

  async deleteJob(id: string):Promise<void> {
    const currJob = await this.jobRepository.delete(id);

    if( currJob.affected === 0 ){
      throw new NotFoundException("Job not found");
    }

  }
}
