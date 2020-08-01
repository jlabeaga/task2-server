import { IsNotEmpty, MinLength } from "class-validator";

export class CreateGroupDto {

  @IsNotEmpty()
  @MinLength(4)
  name: string;

  code: string;

  description: string;
}