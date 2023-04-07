export interface IProducts {
  key?: number;
  id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
}

export interface ICategory {
  key?: number;
  id: number;
  name: string;
}

export interface IUser {
  key?: number;
  id: number;
  name: string;
  email: string;
  image?: string;
}
