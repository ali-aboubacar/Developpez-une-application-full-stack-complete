import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IMessage } from "../_interfaces/article";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CommentService{

      url = "http://localhost:3002/api";
    
      constructor(private http: HttpClient) { }
      create(comment: string, articleId: number):Observable<IMessage>{
        return this.http.post<IMessage>(this.url+'/comments', {comment: comment, article_id: articleId})
      }

      getAllArticleComments(articleId: number):Observable<any>{
        return this.http.get<IMessage>(`${this.url}/comments/${articleId}`);
      }
}