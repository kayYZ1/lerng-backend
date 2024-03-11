import { UserRole } from '../../users/enums/user.enum';

export type JwtPayload = {
  sub: number;
  email: string;
  role: UserRole;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
