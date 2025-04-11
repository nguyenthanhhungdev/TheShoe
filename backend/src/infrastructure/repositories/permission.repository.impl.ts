import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PermissionRepository } from '../../domain/repositories/permission.repository';
import { Permission } from '../../domain/entities/user.entity';

interface PermissionResult {
  id: string;
  name: string;
}

@Injectable()
export class PermissionRepositoryImpl implements PermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly repo: Repository<Permission>,
  ) {}

  async findById(id: string): Promise<Permission | null> {
    const permission = await this.repo.findOneBy({ id });
    return permission ? this.mapToPermission(permission) : null;
  }

  async findByIds(ids: string[]): Promise<Permission[]> {
    const permissions = await this.repo.findByIds(ids);
    return permissions.map((p) => this.mapToPermission(p));
  }

  async save(permission: Permission): Promise<Permission> {
    const saved = await this.repo.save(permission);
    return this.mapToPermission(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  private mapToPermission(result: PermissionResult): Permission {
    return {
      id: result.id,
      name: result.name,
    };
  }
}
