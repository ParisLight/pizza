export interface IUser {
  id: number;
  name: string;
  username?: string;
  user_id: number,
  number: number;
  address?: string;
  flat?: number;
  floor: number;
}

export interface IUserModal {
  user: IUser
}