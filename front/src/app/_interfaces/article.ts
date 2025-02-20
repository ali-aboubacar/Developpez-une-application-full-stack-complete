export interface IArticle {
    id: number
    title: string
    description: string
    created_at: string
    updated_at: string
    theme: string
    comments: []
    owner_id: number
    userName: string
}

export interface ISingleArticle{
    singleProduct: IArticle,
    comment:{},
    likedComment: []
}


export interface IMessage{
    message: string
}