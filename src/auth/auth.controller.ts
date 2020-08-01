import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    // console.log("credentials", authCredentialsDto);
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
    // console.log("credentials", authCredentialsDto);
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  async test(@GetUser() user) {
    console.log("test user", user);
    return user;
  }

  @Post('/test2')
  async test2(@Req() request: Request) {
    console.log("test2 request", request);
    return request;
  }

}
