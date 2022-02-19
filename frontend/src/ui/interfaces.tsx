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

export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  added: Date;
  owner: string;
  sold?: Date;
  buyer: string;
  image: string;
  description: string;
}

export interface ProductsProps {
  products: Array<Product>;
  getProductList: () => void;
}
