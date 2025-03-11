import { Component, OnInit } from "@angular/core";
import { errorType } from "src/app/_interfaces/toasr";
import { EditPicService } from "src/app/_services/edit-pic.service";
import { ToastService } from "src/app/_services/toast.service";
import { UserService } from "src/app/_services/user.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
    private toggleDivField: boolean = false;
    private profilField!: string;
    constructor(private editPicService: EditPicService,
        private userService: UserService,
        private toastService: ToastService){}
    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe({
            next: (data)=>{
                this.profilField = data.profil
            },
            error: (err) => {
                this.toastService.showToast(err.error.message, errorType(err))
            }
        })
    }
    public get toggleDiv(){
        return this.toggleDivField;
    }

    public get profil(){
        return this.profilField;
    }

    public toggleEditPic(): void{
        this.editPicService.toggleUpdatePic = !this.editPicService.toggleUpdatePic
    }
    public toggleMobileNav(): void{
        this.toggleDivField = !this.toggleDivField

        if(this.toggleDivField){
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }
}