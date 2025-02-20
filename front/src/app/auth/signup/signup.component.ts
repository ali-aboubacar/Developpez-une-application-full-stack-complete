import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { nameValidator, StrongPasswordRegx } from "src/app/_helpers/validators";
import { AuthService } from "src/app/_services/auth.service";
import { TokenService } from "src/app/_services/token.service";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
  })
  export class SignupComponent {
    private signUpFormGroupField!: FormGroup;
    private showPasswordField: boolean = true;

    constructor(private authService: AuthService,
      private tokenService: TokenService,
      private router: Router,
      private route: ActivatedRoute) {
      this.signUpFormGroupField = new FormGroup({
        name: new FormControl('', [Validators.required, nameValidator()]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.pattern(StrongPasswordRegx)]),
      })
    }
  
    public get signUpFormGroupControls(): {[key:string]: AbstractControl}{
      return this.signUpFormGroup['controls'];
    }
  
    public get signUpFormGroup() {
      return this.signUpFormGroupField;
    }
  
    public get showPassword() {
      return this.showPasswordField
    }

    togglePasswordVisibility(): void {
      this.showPasswordField = !this.showPasswordField;
    }

    onSubmit(){
      console.log('register formGroup', this.signUpFormGroup.value)
      this.authService.signUp(this.signUpFormGroup.value).subscribe({
        next: (res) => {
          console.log(res)
          this.tokenService.saveToken(res.token);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/article';
          this.router.navigateByUrl(returnUrl)
          // this.tokenService.saveRole(res.role);
          // this.tokenService.saveUserId(res.userId);
          // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          // this.router.navigateByUrl(returnUrl).then(() => {
          //   console.log(res)
          //   // this.toastService.showToast(res.message,'success');
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 3000)
          // });
        },
        error: (err) => {
          console.log(err)
          // this.toastService.showToast(err.error.message, 'error')
        }
      })
    }
  }