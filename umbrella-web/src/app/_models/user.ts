export class User {
  id?: string;
  userName?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  nome?: string;
  cpf?: string;
  isAdmin?: boolean;
  token?:string;
  lockoutEnabled?: boolean;
  roles?: string[]
}