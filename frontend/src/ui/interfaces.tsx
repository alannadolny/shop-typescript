export interface UserDetails {
  active: boolean;
  bought: Array<string>;
  email: string;
  login: string;
  money: number;
  selling: Array<string>;
  sold: Array<string>;
}

export interface UserProps {
  user: UserDetails;
  getUser: () => void;
  logged: boolean;
}

export interface LoggedUserProps {
  getUser: () => void;
}

export interface YupSchema {
  login: string;
  password: string;
}
