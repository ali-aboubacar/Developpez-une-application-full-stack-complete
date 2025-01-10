import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/_services/auth.service";
import { TokenService } from "src/app/_services/token.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
  export class LoginComponent implements OnInit {
    private loginFormGoupField!: FormGroup;

    constructor(private authService: AuthService,
      private tokenService: TokenService,
      private router: Router,
      private route: ActivatedRoute) {}

    public get loginFormGoup() {
      return this.loginFormGoupField;
    }
  
    public get loginFormGoupControls(): any{
      return this.loginFormGoup['controls'];
    }


    ngOnInit(): void {
      this.loginFormGoupField = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      })
    }

    onSubmit(){
      console.log(this.loginFormGoup.value)
      // this.authService.login(this.loginFormGoup.value).subscribe({
      //   next: (res) => {
      //     this.tokenService.saveToken(res.token, res.loggedIn);
      //     this.tokenService.saveRole(res.role);
      //     this.tokenService.saveUserId(res.userId);
      //     const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      //     this.router.navigateByUrl(returnUrl).then(() => {
      //       console.log(res);
      //       setTimeout(() => {
      //         window.location.reload();
      //       }, 3000)
      //     });
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   }
      // })
    }
  }