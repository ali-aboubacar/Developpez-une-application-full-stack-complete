import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IArticle } from "src/app/_interfaces/article";
import { IComment } from "src/app/_interfaces/comment";
import { ArticleService } from "src/app/_services/article.service";
import { CommentService } from "src/app/_services/comment.service";

@Component({
    selector: 'app-article-single-display',
    templateUrl: './article-single-display.component.html',
    styleUrls: ['./article-single-display.component.scss']
})

export class ArticleSingleDisplayComponent implements OnInit{
    private articleId!: string;
    private commentField!: IComment[];
    private singleArticleField!: IArticle;
    private commentInputField: string = '';
    private totalArticleFied: number = 0;
    private pageField: number = 0;
    private sizeField: number = 5;
    constructor(private route: ActivatedRoute,
        private articleService: ArticleService,
        private commentService: CommentService,
        private router: Router
    ){}

    public get size(){
        return this.sizeField;
    }

    public get page(){
        return this.pageField;
    }
    public get totalArticle(){
        return this.totalArticleFied;
    }
    public get commentInput(){
        return this.commentInputField;
    }

    public set commentInput(commentInput: string){
        this.commentInputField = commentInput
    }

    public get comment(){
        return this.commentField;
    }

    public get singleArticle(){
        return this.singleArticleField
    }
    
    ngOnInit(): void {
        this.articleId = this.route.snapshot.params['id'];
        this.loadSingleProduct()
    }

    private loadSingleProduct(){
        let isnum = /^\d+$/.test(this.articleId);
        if(isnum) {
            this.articleService.getOneArticle(this.articleId).subscribe((data) => {
                console.log(data)
                this.singleArticleField = data;
            });
            this.loadComments();
        } else {
            this.router.navigate(['article/home/**'])
        }
    }
    loadComments(){
        this.commentService.getAllArticleComments(this.articleId, this.page, this.size).subscribe((data) => {
            console.log('comments',data)
            this.commentField = data.content;
            this.totalArticleFied = data.totalElements;
        });
    }

    nextPage(): void{
        if(this.pageField < this.totalArticleFied / this.sizeField - 1){
            this.pageField++;
            this.loadComments();
        }
    }

    previousPage(): void{
        if(this.pageField > 0){
            this.pageField--;
            this.loadComments();
        }
    }

    onSubmitComment(){
        this.commentService.create(this.commentInput, this.articleId).subscribe((data)=>{
            this.commentService.getAllArticleComments(this.articleId, this.page, this.size).subscribe((data) => {
                console.log('comments',data)
                this.commentField = data.content;
                this.commentInputField = '';
            });
        });
    }

}