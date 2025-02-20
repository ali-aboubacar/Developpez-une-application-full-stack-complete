import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { StrongPasswordRegx } from "src/app/_helpers/validators";
import { AuthService } from "src/app/_services/auth.service";
import { TokenService } from "src/app/_services/token.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {
    private loginFormGoupField!: FormGroup;

    private showPasswordField: boolean = true;

    constructor(private authService: AuthService,
      private tokenService: TokenService,
      private router: Router,
      private route: ActivatedRoute) {}

    public get loginFormGoup() {
      return this.loginFormGoupField;
    }

    public get showPassword() {
      return this.showPasswordField
    }
  
    public get loginFormGoupControls(): {[key:string]: AbstractControl}{
      return this.loginFormGoup['controls'];
    }


    ngOnInit(): void {
      this.loginFormGoupField = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.pattern(StrongPasswordRegx)])
      })
    }

    togglePasswordVisibility(): void {
      this.showPasswordField = !this.showPasswordField;
    }

    onSubmit(){
      console.log(this.loginFormGoup.value)
      this.authService.login(this.loginFormGoup.value).subscribe({
        next: (res) => {
          console.log(res)
          this.tokenService.saveToken(res.token);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/article';
          this.router.navigateByUrl(returnUrl)
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }