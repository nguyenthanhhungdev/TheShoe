export class RegisterUserDto {
  username: string;
  email: string;
  password: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}

export class UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}
