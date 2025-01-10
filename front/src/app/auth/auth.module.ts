import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthRoutingMOdule } from "./auth-routing.module";
import { CoreModule } from "../core/core.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        AuthRoutingMOdule,
        ReactiveFormsModule,
        CoreModule,
        CommonModule
    ]
  })
  export class AuthModule { }