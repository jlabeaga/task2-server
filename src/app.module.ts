import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.confg';
import { TasksModule } from './tasks/tasks.module';
import { LoggerMiddleware } from './shared/middleware/logger-middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    TasksModule
  ],
  // providers: [UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
