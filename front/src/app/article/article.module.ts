import { NgModule } from "@angular/core";
import { ArticleCreateComponent } from "./article-create/article-create.component";
import { ArticleLayoutComponent } from "./article-layout/article-layout.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleSingleDisplayComponent } from "./article-single-dsplay/article-single-display.component";
import { CoreModule } from "../core/core.module";
import { CommonModule } from "@angular/common";
import { ArticleRoutingModule } from "./article-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ThemeListComponent } from "./theme-list/theme-list.component";

@NgModule({
    declarations: [
        ArticleCreateComponent,
        ArticleLayoutComponent,
        ArticleListComponent,
        ArticleSingleDisplayComponent,
        ThemeListComponent
    ],
    imports: [
        ArticleRoutingModule,
        CommonModule,
        CoreModule,
        ReactiveFormsModule,
    ]
})
export class ArticleModule {}