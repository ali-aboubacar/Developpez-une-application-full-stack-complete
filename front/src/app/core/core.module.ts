import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import {MatDividerModule} from '@angular/material/divider';
import { HeaderAuthComponent } from "./components/header-auth/header-auth.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
    declarations: [
        HeaderComponent,
        PageNotFoundComponent,
        HeaderAuthComponent,
        HomeComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        

    ],
    exports: [
        HeaderComponent,
        PageNotFoundComponent,
        HeaderAuthComponent,
        HomeComponent,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule

    ]
})
export class CoreModule {}