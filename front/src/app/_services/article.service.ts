import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IArticle, IMessage } from "../_interfaces/article";
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

  getAllArticle():Observable<IArticle[]>{
    return this.http.get<IArticle[]>(`${this.url}/article`)
  }

  getOneArticle(articleId: string): Observable<IArticle>{
    const ID : Number = parseInt(articleId)
    return this.http.get<IArticle>(`${this.url}/article/${ID}`)
  }

  deleteProduct(productId: number): Observable<IMessage>{
    return this.http.delete<IMessage>(this.url+`/article/${productId}`)
  }
}