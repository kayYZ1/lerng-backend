import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  type: process.env.TYPE,
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
}));
