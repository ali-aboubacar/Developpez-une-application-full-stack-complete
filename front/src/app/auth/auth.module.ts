import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthRoutingMOdule } from "./auth-routing.module";
import { CoreModule } from "../core/core.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent
    ],
    imports: [
        AuthRoutingMOdule,
        ReactiveFormsModule,
        CoreModule,
        CommonModule,
    ]
  })
  export class AuthModule { }