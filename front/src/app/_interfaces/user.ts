import { ITheme } from "./theme";

export interface IUser{
    id: number;
    email: string;
    name: string;
    profil: string;
    themes: ITheme[]
    createdAt: string;
    updatedAt: string;
}

