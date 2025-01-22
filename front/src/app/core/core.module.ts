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
@NgModule({
    declarations: [
        HeaderComponent,
        PageNotFoundComponent
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

    ],
    exports: [
        HeaderComponent,
        PageNotFoundComponent,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,

    ]
})
export class CoreModule {}