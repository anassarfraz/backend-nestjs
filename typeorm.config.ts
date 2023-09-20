import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'src/config/config';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default typeOrmConfig;
