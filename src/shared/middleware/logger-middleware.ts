import { NestMiddleware, Injectable, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(private jwtService: JwtService) { }

  use(request: Request, response: Response, next: Function) {
    console.log("logger middleware");
    console.log("request.method", request.method);
    console.log("request.baseUrl", request.baseUrl);
    console.log("request.url", request.url);
    console.log("request.query", request.query);
    console.log("request.body", request.body);
    const debug = false;
    if (debug) {
      const authorization = request.headers['authorization'];
      if (authorization) {
        // Authorization = Bearer [token]
        const token = authorization.substring(7);
        console.log("token", token);
        const payload = this.jwtService.decode(token, { json: true });
        console.log("payload", payload);
      }
    }
    next();
  }
}