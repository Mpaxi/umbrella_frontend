export class AuthResponse {
  success: boolean = false;
  message?: string;
  data?: Token;
}

export class Token {
  token?: string;
}
