import { IsNotEmpty, MinLength } from "class-validator";

export class CreateGroupDto {

  @IsNotEmpty()
  @MinLength(4)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  code: string;

  description: string;
}