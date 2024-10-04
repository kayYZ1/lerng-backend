import { UserRole } from '../../users/enums/user.enum';

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
  exp?: number;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
