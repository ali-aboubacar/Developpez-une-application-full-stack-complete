import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ArticleService } from "src/app/_services/article.service";

@Component({
    selector: 'app-article-create',
    templateUrl: './article-create.component.html',
    styleUrls: ['./article-create.component.scss']
})

export class ArticleCreateComponent {
    message: string = 'le message du toast'
    private createFormGroupField: FormGroup;
  

  
    constructor(private articleService: ArticleService,
      private router: Router,){
      this.createFormGroupField = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]),
        theme: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]),
        description: new FormControl('', [Validators.required, Validators.minLength(100), Validators.maxLength(300)]),
      })
    }
  
    public get createFormGroupControls(): any{
      return this.createFormGroup['controls'];
    }
    public get createFormGroup(){
    return this.createFormGroupField
    }
  
    onSubmit() {
        console.log(this.createFormGroup)
      this.articleService.create(this.createFormGroup.get('title')?.value, this.createFormGroup.get('theme')?.value, this.createFormGroup.get('description')?.value).subscribe({
        next: (res: any) => {
            console.log(res)
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    }
}