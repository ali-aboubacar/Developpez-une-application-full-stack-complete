import { NgModule } from "@angular/core";
import { HeaderComponent } from "./components/header/header.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
@NgModule({
    declarations: [
        HeaderComponent,
        PageNotFoundComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        HeaderComponent,
        PageNotFoundComponent,

    ]
})
export class CoreModule {}