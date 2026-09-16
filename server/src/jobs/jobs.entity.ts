import { Column, Entity, PrimaryColumn } from "typeorm";
import type { JobStatus } from "./jobs.type";

@Entity("jobs")
export class JobEnity{
  @PrimaryColumn()
  id: string;
  
  @Column()
  title: string;
  
  @Column()
  type: string;
  
  @Column()
  status: JobStatus;
  
  @Column()
  createdAt: Date
}