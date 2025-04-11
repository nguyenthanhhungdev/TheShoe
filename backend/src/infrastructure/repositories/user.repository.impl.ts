import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

interface UserResult {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly roleRepository: UserRepositoryImpl,
  ) {}

  async findById(id: string): Promise<UserResult | null> {
    const user: unknown = await this.dataSource.query<UserResult[]>(
      'Select * from users where id = $1',
      [id],
    );
    if (!Array.isArray(user)) {
      // Unexpected result, return null or throw error
      return null;
    }
    // Optionally, validate the first element's shape
    return user.length > 0 ? this.mapToUser(user[0]) : null;
  }

  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  async findByEmail(email: string): Promise<User | null> {
    // TODO: implement database query
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async save(user: User): Promise<User> {
    // TODO: implement save logic
    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(id: string): Promise<void> {
    // TODO: implement delete logic
  }

  private mapToUser(result: UserResult): Promise< {
    return new User({
      id: result.id,
      username: result.username,
      email: result.email,
      passwordHash: result.passwordHash,
      roles: result.roles.map(roleName => ({ id: '', name: roleName, permissions: [] })),
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
  }
}
