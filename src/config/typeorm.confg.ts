import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as config from 'config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: config.get("db.type"),
  host: process.env.RDS_HOSTNAME || config.get("db.host"),
  port: process.env.RDS_PORT || config.get("db.port"),
  username: process.env.RDS_USERNAME || config.get("db.username"),
  password: process.env.RDS_PASSWORD || config.get("db.password"),
  database: process.env.RDS_DBNAME || config.get("db.database"),
  // entities: [__dirname + "/../**/*.entity.{ts|js}"],
  entities: [__dirname + "/../**/*.entity.ts",
  __dirname + "/../../dist/**/*.entity.js"],
  synchronize: process.env.TYPEORM_SYNC || config.get("db.synchronize"),
  namingStrategy: new SnakeNamingStrategy(),
  logging: config.get("db.logging"),
}