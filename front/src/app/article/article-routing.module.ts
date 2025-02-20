import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleLayoutComponent } from "./article-layout/article-layout.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleCreateComponent } from "./article-create/article-create.component";
import { ArticleSingleDisplayComponent } from "./article-single-dsplay/article-single-display.component";
import { ThemeListComponent } from "./theme-list/theme-list.component";
import { UserResolver } from "../_resolver/user-resolver.service";
import { PageNotFoundComponent } from "../core/components/page-not-found/page-not-found.component";

const routes: Routes = [
    {
        path: '', component: ArticleLayoutComponent, children: [
            { path:'', redirectTo: 'home', pathMatch: 'full' },
            { path:'home', component: ArticleListComponent},
            { path: 'create', component: ArticleCreateComponent},
            { path: 'themes', component: ThemeListComponent, resolve:{ response: UserResolver }},
            { path: ':id', component: ArticleSingleDisplayComponent},
            {path: '**', component: PageNotFoundComponent}
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ArticleRoutingModule {}