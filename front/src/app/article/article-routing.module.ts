import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ArticleLayoutComponent } from "./article-layout/article-layout.component";
import { ArticleListComponent } from "./article-list/article-list.component";
import { ArticleCreateComponent } from "./article-create/article-create.component";

const routes: Routes = [
    {
        path: '', component: ArticleLayoutComponent, children: [
            { path:'', redirectTo: 'home', pathMatch: 'full' },
            { path:'home', component: ArticleListComponent},
            { path: 'create', component: ArticleCreateComponent},
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ArticleRoutingModule {}