

export class User {
  
  id: string;
 
  role: Role;
}

export enum Action {
  Superadmin = 'manage',
  Admin = 'read',
}

export enum Role {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
}