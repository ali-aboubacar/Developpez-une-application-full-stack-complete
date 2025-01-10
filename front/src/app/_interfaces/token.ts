import { RoleEnum } from "../_enums/roles.enum";

export interface IToken {
    token: string;
    role: RoleEnum;
    userId: string;
    loggedIn: boolean;
    message: string;
}