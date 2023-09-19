import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'exercise_db',
  //   type: 'postgres',
  //   host: process.env.POSTGRES_HOST,
  //   port: parseInt(process.env.POSTGRES_PORT, 10),
  //   username: process.env.POSTGRES_USERNAME,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: process.env.POSTGRES_DATABASE,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default typeOrmConfig;
