import { IsNotEmpty, MinLength } from "class-validator";

export class CreateTaskDto {

  @IsNotEmpty()
  @MinLength(4)
  name: string;

  description: string;

  tasklistId: number;

  ownerId: number;

  hoursEstimated: number;

}