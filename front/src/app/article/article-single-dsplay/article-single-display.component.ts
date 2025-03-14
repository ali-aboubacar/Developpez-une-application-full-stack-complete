import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IArticle } from "src/app/_interfaces/article";
import { IComment } from "src/app/_interfaces/comment";
import { errorType } from "src/app/_interfaces/toasr";
import { ArticleService } from "src/app/_services/article.service";
import { CommentService } from "src/app/_services/comment.service";
import { ToastService } from "src/app/_services/toast.service";

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
        private router: Router,
        private toastService: ToastService
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

    private loadSingleProduct(): void{
        let isnum = /^\d+$/.test(this.articleId);
        if(isnum) {
            this.articleService.getOneArticle(this.articleId).subscribe({
                next: (res) => {
                    this.singleArticleField = res;
                },
                error: (err) => {
                    if(err.status === 404){
                        this.toastService.showToast(err.error.message, errorType(err));
                        this.router.navigate(['article/home/**'])
                    } else {
                        this.toastService.showToast(err.error.message, errorType(err));
                    }
                }
            });
            this.loadComments();
        } else {
            this.router.navigate(['article/home/**'])
        }
    }
    loadComments(): void{
        this.commentService.getAllArticleComments(this.articleId, this.page, this.size).subscribe({
            next: (data) => {
                this.commentField = data.content;
                this.totalArticleFied = data.totalElements;
            },
            error: (err) => {
                this.toastService.showToast(err.error.message, errorType(err));
            }
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

    onSubmitComment(): void{
        this.commentService.create(this.commentInput, this.articleId).subscribe((data)=>{
            this.commentService.getAllArticleComments(this.articleId, this.page, this.size).subscribe({
                next: (data) => {
                    this.commentField = data.content;
                    this.commentInputField = '';
                    this.toastService.showToast('comment created', 'success')
                },
                error: (err) => {
                    this.toastService.showToast(err.error.message, errorType(err));
                }
            });
        });
    }

}