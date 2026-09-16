import { IsNotEmpty, IsString } from "class-validator";

export class CreateJobDTO{
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}