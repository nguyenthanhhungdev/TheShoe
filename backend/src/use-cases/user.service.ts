import { User } from '../domain/entities/user.entity';

export interface UserService {
  register(userData: Partial<User>): Promise<User>;
  login(email: string, password: string): Promise<User | null>;
  getProfile(userId: string): Promise<User | null>;
  updateProfile(userId: string, updateData: Partial<User>): Promise<User>;
  deleteUser(userId: string): Promise<void>;
}
