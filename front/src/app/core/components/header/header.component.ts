import { Component, OnInit } from "@angular/core";
import { EditPicService } from "src/app/_services/edit-pic.service";
import { UserService } from "src/app/_services/user.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
    private toggleDivField: boolean = false;
    private profilField!: string;
    constructor(private editPicService: EditPicService, private userService: UserService){}
    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe((data)=>{
            console.log(data)
            this.profilField = data.profil
        })
    }
    public get toggleDiv(){
        return this.toggleDivField;
    }

    public get profil(){
        return this.profilField;
    }

    public toggleEditPic(){
        this.editPicService.toggleUpdatePic = !this.editPicService.toggleUpdatePic
    }
    public toggleMobileNav(){
        this.toggleDivField = !this.toggleDivField

        if(this.toggleDivField){
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }
}