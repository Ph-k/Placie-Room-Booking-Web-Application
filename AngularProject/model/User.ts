export interface User {
  userId: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  photoUrl: string;
  isTenant: boolean;
  isHost: boolean;
  isAdmin: boolean;
}

export class LoginUser {
  userName: string;
  password: string;
}
