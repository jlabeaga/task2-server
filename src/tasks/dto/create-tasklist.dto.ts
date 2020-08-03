import { IsNotEmpty, MinLength } from "class-validator";

export class CreateTasklistDto {

  @IsNotEmpty()
  @MinLength(4)
  name: string;

  description: string;

}