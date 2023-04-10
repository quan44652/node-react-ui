export interface IProducts {
  key?: number;
  _id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
}

export interface ICategory {
  key?: number;
  _id?: string;
  name: string;
}

export interface IUser {
  key?: number;
  _id?: string;
  name: string;
  email: string;
  pasword: string;
  role: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  email: string;
  password: string;
}
