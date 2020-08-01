import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import { GroupRepository } from '../users/group.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, GroupRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || config.get("jwt.secret"),
      signOptions: {
        expiresIn: config.get("jwt.expiresIn")
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule { }
