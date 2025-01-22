import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAllArticles, IArticles, IMessage, ISingleArticle } from "../_interfaces/article";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ArticleService{
      // url = "http://64.226.75.174:6868/api";
  url = "http://localhost:3002/api";

  constructor(private http: HttpClient) { }
  create(title: string, description: string, theme: string):Observable<IMessage>{
    const formData = new FormData();
    formData.append('title', title);
    formData.append('theme', theme);
    formData.append('description', description);
    return this.http.post<IMessage>(this.url+'/article', formData)
  }
  
  createComment(productId: number, comment: string):Observable<IMessage>{
    return this.http.post<IMessage>(`${this.url}/article/${productId}/comments`,{comment: comment})
  }

  getAllArticle():Observable<any>{
    return this.http.get<any>(`${this.url}/article`)
  }

  getOneArticle(articleId: number): Observable<any>{
    return this.http.get<any>(`${this.url}/article/${articleId}`)
  }

  // updateProduct(productId: number, formGroup:any): Observable<IMessage>{
  //   return this.http.patch<IMessage>(this.url+`/products/${productId}`, formGroup)
  // }

  deleteProduct(productId: number): Observable<IMessage>{
    return this.http.delete<IMessage>(this.url+`/article/${productId}`)
  }
}