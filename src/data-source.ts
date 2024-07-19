import { DataSource } from 'typeorm';
import { User } from './user/user.entity';
import { Role } from './roles/role.entity';
import { Permission } from './permissions/permission.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [User, Role, Permission],
  synchronize: true,
  migrations: ['src/migration/**/*.ts'],
});
