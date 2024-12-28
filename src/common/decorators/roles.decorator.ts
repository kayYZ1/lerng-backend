import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../user/enums/user.enum';

export const ROLE_KEY = 'roles';

export const ROLES = (...role: UserRole[]) => SetMetadata(ROLE_KEY, role);
