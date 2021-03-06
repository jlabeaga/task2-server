import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Role } from './role.enum';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredentialsDto: AuthCredentialsDto, role: Role = Role.USER): Promise<User> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    let user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;
    user.active = true;
    user.role = role;
    try {
      user = await user.save();
      console.log("user created", user);
    } catch (error) {
      if (error.code === "23505") { // duplicated key
        throw new ConflictException("Username already exists.");
      } else {
        throw new InternalServerErrorException(error);
      }
    }
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const validation = user.validatePassword(password);
    if (!validation) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return user;
  }
}