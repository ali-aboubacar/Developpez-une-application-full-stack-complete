import { Component, OnInit } from "@angular/core";
import { IArticle } from "src/app/_interfaces/article";
import { errorType } from "src/app/_interfaces/toasr";
import { ArticleService } from "src/app/_services/article.service";
import { ToastService } from "src/app/_services/toast.service";

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})

export class ArticleListComponent implements OnInit{
    private allArticleField!: IArticle[];
    private isAscending: boolean =true
    constructor(private articleService: ArticleService,
        private toastService: ToastService){}

    public get allArticle(){
        return this.allArticleField;
    }
    ngOnInit(): void {
        this.loadAllArticle();
    }

    loadAllArticle(){
        this.articleService.getAllArticle().subscribe({
            next: (data) => {
                this.allArticleField = data;
                console.log(data);
            },
            error: (err) => {
                this.toastService.showToast(err.error.message, errorType(err));
            }
        });
    }
    sortArticle(order: 'asc' | 'desc'){
        this.allArticleField.sort((a:IArticle,b:IArticle) => {
            const dateA = new Date (a.created_at).getTime();
            const dateB = new Date (b.created_at).getTime();
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        })
    }
    toggleSort(){
        this.sortArticle(this.isAscending ? 'asc':'desc' )
        this.isAscending = !this.isAscending
    }
}