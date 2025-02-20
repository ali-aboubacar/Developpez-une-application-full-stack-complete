export interface IComment {
comment: string;
id: number;
owner_id: number;
userName: string
}

export interface IPage {
    content: IComment[];
    totalElements: number
}