// config.ts
import { config } from 'dotenv';
config();

export default {
  jwtSecret: process.env.JWT_SECRET || 'exercisesecret',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
};
