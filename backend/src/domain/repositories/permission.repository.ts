import { Permission } from '../entities/user.entity';

export interface PermissionRepository {
  findById(id: string): Promise<Permission | null>;
  save(permission: Permission): Promise<Permission>;
  delete(id: string): Promise<void>;
}
