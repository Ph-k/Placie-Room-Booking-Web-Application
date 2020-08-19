export interface User {
  userId: number;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  ProfilePhoto: File;
  isTenant: boolean;
  isHost: boolean;
  isAdmin: boolean;
}

export class LoginUser {
  userName: string;
  password: string;
}
