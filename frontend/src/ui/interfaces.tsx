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

export interface GetProductListProps {
  getProductList: () => void;
}

export interface User {
  active: boolean;
  bought: Array<Product>;
  email: string;
  login: string;
  money: number;
  selling: Array<Product>;
  sold: Array<Product>;
}

export interface Cart {
  _id: string;
  owner: string;
  products: Array<string>;
  active: boolean;
}

export interface CartProps {
  carts: Array<Cart>;
  products: Array<Product>;
  getCartList: () => void;
  getProductList: () => void;
}

export interface AddToCartInterface {
  addToCart: (id: string | undefined) => void;
}
