import { Role } from '../tasks/role.enum';

export interface JwtPayload {
  id: number;
  username: string;
  role: Role
}
