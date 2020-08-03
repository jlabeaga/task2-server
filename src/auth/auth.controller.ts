import { Controller, Post, Body, ValidationPipe, UseGuards, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation
} from '@nestjs/swagger';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { Request } from 'express';
import { User } from '../tasks/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
    // console.log("credentials", authCredentialsDto);
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test-auth')
  @UseGuards(AuthGuard())
  async test(@GetUser() user) {
    console.log("test user", user);
    return user;
  }

  // @Post('/test2')
  async test2(@Req() request: Request) {
    console.log("test2 request", request);
    return request;
  }

}
