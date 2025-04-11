import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionRepositoryImpl } from './permission.repository.impl';
import { Repository } from 'typeorm';
import { RoleRepository } from '../../domain/repositories/role.repository';
import { Role } from '../../domain/entities/user.entity';

interface RoleResult {
  id: string;
  name: string;
  permissions: string[];
}

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
    private readonly permissionRepository: PermissionRepositoryImpl,
  ) {}

  async findById(id: string): Promise<Role | null> {
    const role = await this.repo.findOneBy({ id });

    if (!role) {
      return null;
    }

    return this.mapToRole(role);
  }

  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  async save(role: Role): Promise<Role> {
    // Implementation for save
    throw new Error('Not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  async delete(id: string): Promise<void> {
    // Implementation for delete
    throw new Error('Not implemented');
  }

  private async mapToRole(result: Role): Promise<Role> {
    const permissions = await this.permissionRepository.findByIds(
      result.permissions.map((p) => p.id),
    );
    return {
      id: result.id,
      name: result.name,
      permissions: permissions,
    };
  }
}
