import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileLayoutComponent } from "./profile-layout/profile-layout.component";
import { DisplayProfileComponent } from "./display-profile/display-profile.component";
import { UserResolver } from "../_resolver/user-resolver.service";
import { PageNotFoundComponent } from "../core/components/page-not-found/page-not-found.component";

const routes: Routes = [
    {
        path: '', component: ProfileLayoutComponent, children: [
            { path: '', redirectTo: 'view', pathMatch: 'full' },
            { path: 'view', component: DisplayProfileComponent, resolve:{ response: UserResolver }},
            {path: '**', component: PageNotFoundComponent}
        ]
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ProfileRoutingModule{}