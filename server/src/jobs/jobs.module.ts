import { Module } from "@nestjs/common";
import { JobsController } from "./jobs.controller";
import { JobsService } from "./jobs.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobEnity } from "./jobs.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([JobEnity])
  ],
  controllers:[JobsController],
  providers:[JobsService]
})

export class JobsModule {}