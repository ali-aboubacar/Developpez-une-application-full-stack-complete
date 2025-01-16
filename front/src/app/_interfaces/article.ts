export interface IArticle {
    title: string,
    description: string,
    price: number,
    color: string,
    quantity: number,
    comments: [],
    userId: number,
}

export interface ISingleArticle{
    singleProduct: IArticle,
    comment:{},
    likedComment: []
}

export interface IArticles{
    products: IArticle[]
}

export interface IAllArticles{
    listOfProducts: IArticles,
    totalProducts: number
}

export interface IMessage{
    message: string
}