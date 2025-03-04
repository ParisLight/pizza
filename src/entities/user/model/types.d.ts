export interface IUser {
  id: number;
  name: string;
  username?: string;
  number: number;
  address?: string;
  flat?: number;
}

export interface IUserModal {
  user: IUser
}