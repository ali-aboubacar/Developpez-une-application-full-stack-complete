import { NgModule } from "@angular/core";
import { ProfileRoutingModule } from "./profile-routing.module";
import { CommonModule } from "@angular/common";
import { CoreModule } from "../core/core.module";
import { ReactiveFormsModule } from "@angular/forms";
import { DisplayProfileComponent } from "./display-profile/display-profile.component";
import { ProfileLayoutComponent } from "./profile-layout/profile-layout.component";

@NgModule({
    declarations: [
        DisplayProfileComponent,
        ProfileLayoutComponent
    ],
    imports: [
        ProfileRoutingModule,
        CommonModule,
        CoreModule,
        ReactiveFormsModule
    ]
})
export class ProfileModule {}