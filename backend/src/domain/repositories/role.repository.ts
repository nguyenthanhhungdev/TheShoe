import { Role } from '../entities/user.entity';

export interface RoleRepository {
  findById(id: string): Promise<Role | null>;
  save(role: Role): Promise<Role>;
  delete(id: string): Promise<void>;
}
