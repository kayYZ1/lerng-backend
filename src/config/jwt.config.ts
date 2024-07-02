import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  access_token: process.env.ACCESS_TOKEN,
  refresh_token: process.env.REFRESH_TOKEN,
  password_reset: process.env.PASSWORD_RESET,
}));
