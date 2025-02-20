import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IMessage } from "../_interfaces/article";
import { Observable } from "rxjs";
import { IPage } from "../_interfaces/comment";

@Injectable({
    providedIn: 'root'
})
export class CommentService{

      url = "http://localhost:3002/api";
    
      constructor(private http: HttpClient) { }
      create(comment: string, articleId: string):Observable<IMessage>{
        const ID : Number = parseInt(articleId)
        return this.http.post<IMessage>(this.url+'/comments', {comment: comment, article_id: ID})
      }

      getAllArticleComments(articleId: string, page: number, size: number):Observable<IPage>{
        const ID : Number = parseInt(articleId)
        return this.http.get<IPage>(`${this.url}/comments/${ID}?page=${page}&size=${size}`);
      }
}