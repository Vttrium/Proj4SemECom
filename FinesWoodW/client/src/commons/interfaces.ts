
export interface IUserSignup {
    name: string;
    email: string;
    password: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface ICategory {
    id: number;
    name: string;
}

export interface IProduct {
    id?: number;
    name: string;
    description: string;
    price: number;
    urlImage?: string;
    category: ICategory;
}