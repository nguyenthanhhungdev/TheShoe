export class User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
    this.roles = data.roles;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

export class Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export class Permission {
  id: string;
  name: string;
}
