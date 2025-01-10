import { RoleEnum } from "../_enums/roles.enum"


export interface ICredential {
    email: string,
    password: string
}

export interface IUserCredential{
    nom: string,
    prenom: string,
    email: string,
    password: string,
    role: RoleEnum
}