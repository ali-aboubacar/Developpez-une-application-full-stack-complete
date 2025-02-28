import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IMessage } from "src/app/_interfaces/article";
import { errorType } from "src/app/_interfaces/toasr";
import { ArticleService } from "src/app/_services/article.service";
import { ToastService } from "src/app/_services/toast.service";

@Component({
    selector: 'app-article-create',
    templateUrl: './article-create.component.html',
    styleUrls: ['./article-create.component.scss']
})

export class ArticleCreateComponent {
    message: string = 'le message du toast'
    private createFormGroupField: FormGroup;
  

  
    constructor(private articleService: ArticleService,
      private router: Router,private toastService: ToastService){
      this.createFormGroupField = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]),
        theme: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]),
        description: new FormControl('', [Validators.required, Validators.minLength(100), Validators.maxLength(300)]),
      })
    }
  
    public get createFormGroupControls(): {[key:string]: AbstractControl}{
      return this.createFormGroup['controls'];
    }
    public get createFormGroup(){
    return this.createFormGroupField
    }
  
    onSubmit() {
        console.log(this.createFormGroup)
      this.articleService.create(this.createFormGroup.get('title')?.value,
      this.createFormGroup.get('description')?.value,
      this.createFormGroup.get('theme')?.value,).subscribe({
        next: (res) => {
            console.log(res)
            this.toastService.showToast(res.message, 'success');
        },
        error: (err) => {
          console.log(err);
          this.toastService.showToast(err.error.message, errorType(err));
        }
      });
    }
}