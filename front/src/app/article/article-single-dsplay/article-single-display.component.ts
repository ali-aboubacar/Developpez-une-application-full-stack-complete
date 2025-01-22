import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ArticleService } from "src/app/_services/article.service";
import { CommentService } from "src/app/_services/comment.service";

@Component({
    selector: 'app-article-single-display',
    templateUrl: './article-single-display.component.html',
    styleUrls: ['./article-single-display.component.scss']
})

export class ArticleSingleDisplayComponent implements OnInit{
    private articleId: any;
    private commentField: any;
    private singleArticleField: any;
    constructor(private route: ActivatedRoute,
        private articleService: ArticleService,
        private commentService: CommentService
    ){}

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
        this.articleService.getOneArticle(this.articleId).subscribe((data) => {
            console.log(data)
            this.singleArticleField = data;
        //   this.singleProductField = data.singleProduct;
        //   this.commentsField = data.singleProduct.comments.map((comment:any) => ({...comment, showMore:false}));
        //   this.likedCommentField = data.likedComment
        });
        this.commentService.getAllArticleComments(this.articleId).subscribe((data) => {
            console.log('comments',data)
            this.commentField = data;
        });
    }

    onSubmitComment(){
        console.log("clicked");
        this.commentService.create("this my new comment", this.articleId).subscribe((data)=>{
            this.commentService.getAllArticleComments(this.articleId).subscribe((data) => {
                console.log('comments',data)
                this.commentField = data;
            });
        });
    }

}