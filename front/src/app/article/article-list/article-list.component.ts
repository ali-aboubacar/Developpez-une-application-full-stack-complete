import { Component, OnInit } from "@angular/core";
import { ArticleService } from "src/app/_services/article.service";

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})

export class ArticleListComponent implements OnInit{
    private allArticleField: any;
    constructor(private articleService: ArticleService){}

    public get allArticle(){
        return this.allArticleField;
    }
    ngOnInit(): void {
        this.loadAllArticle();
    }

    loadAllArticle(){
        this.articleService.getAllArticle().subscribe((data) => {
            this.allArticleField = data;
            console.log(data);
        });
    }
}