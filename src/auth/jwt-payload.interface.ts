import { Role } from '../users/role.enum';

export interface JwtPayload {
  id: number;
  username: string;
  role: Role
}
