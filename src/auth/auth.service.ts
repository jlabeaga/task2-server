import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../tasks/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../tasks/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ token: string }> {
    const user = await this.userRepository.signIn(authCredentialsDto);
    if (!user) {
      throw new UnauthorizedException("Unable to authenticate.");
    }
    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      role: user.role
    };
    const token = await this.jwtService.sign(payload);
    return { token };
  }

}
