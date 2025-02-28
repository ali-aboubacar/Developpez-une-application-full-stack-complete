import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { mustMatch, nameValidator, StrongPasswordRegx } from "src/app/_helpers/validators";
import { errorType } from "src/app/_interfaces/toasr";
import { IUser } from "src/app/_interfaces/user";
import { EditPicService } from "src/app/_services/edit-pic.service";
import { ToastService } from "src/app/_services/toast.service";
import { TokenService } from "src/app/_services/token.service";
import { UserService } from "src/app/_services/user.service";

@Component({
    selector: 'app-display-profile',
    templateUrl: './display-profile.component.html',
    styleUrls: ['./display-profile.component.scss']
})
export class DisplayProfileComponent implements OnInit{
    private currentUserField!: IUser;
    private editFormGroupField: FormGroup;
    private showPasswordField: boolean = true;
    private showNewPasswordField: boolean = true;
    private showConfPasswordField: boolean = true;

    private imageUrlField!: File;
    private previewImgField!: string | ArrayBuffer | null;

    constructor(private route: ActivatedRoute,
        private userService: UserService,
        private editPicService: EditPicService,
        private tokenService: TokenService,
        private router: Router,
        private toastService: ToastService
    ){
        this.editFormGroupField = new FormGroup({
            email: new FormControl('',[Validators.required, Validators.email]),
            userName: new FormControl('',[Validators.required, nameValidator()]),
            password: new FormControl('',[Validators.required, Validators.pattern(StrongPasswordRegx)]),
            newPassword: new FormControl('',[Validators.required, Validators.pattern(StrongPasswordRegx)]),
            confPassword: new FormControl('',[Validators.required, Validators.pattern(StrongPasswordRegx)]), 
          },[mustMatch('newPassword', 'confPassword')]);
    }

    public get previewImg(){
        return this.previewImgField;
    }

    public get editFormGroup(){
        return this.editFormGroupField;
    }

    public get editFormGroupControls(): {[key:string]: AbstractControl}{
        return this.editFormGroup['controls'];
      }
    

    public get currentUser(){
        return this.currentUserField;
    }

    public get toggleEditPic(){
        return this.editPicService.toggleUpdatePic
    }

    public get showPassword() {
        return this.showPasswordField
    }

    public get showNewPassword() {
        return this.showNewPasswordField
    }

    public get showConfPassword() {
        return this.showConfPasswordField
    }

    ngOnInit(): void {
        this.currentUserField = this.route.snapshot.data['response'];
        console.log(this.currentUserField)
    }

    togglePasswordVisibility(): void {
        this.showPasswordField = !this.showPasswordField;
    }

    toggleNewPasswordVisibility(): void {
        this.showNewPasswordField = !this.showNewPasswordField;
    }

    toggleConfPasswordVisibility(): void {
        this.showConfPasswordField = !this.showConfPasswordField;
    }


    unSubscribe(themeId: number){
        this.userService.unSubscribe(themeId).subscribe({
            next: (data)=>{
                console.log(data);
                this.userService.getCurrentUser().subscribe({
                    next: (data)=>{
                        this.currentUserField = data;
                    },
                    error: (err) => {
                        this.toastService.showToast(err.error.message, errorType(err))
                    }
                });
            },
            error: (err) => {
                this.toastService.showToast(err.error.message, errorType(err))
            }
        })
    }

    onFileSelect(event: Event){
        const input = event.target as HTMLInputElement
        if (input.files!.length > 0) {
          this.imageUrlField = input.files![0];
    
          const reader = new FileReader();
          reader.onload = e => this.previewImgField = reader.result;
          reader.readAsDataURL(this.imageUrlField);
        }
    }
      
    editProfile(){
        this.userService.edit(
            this.editFormGroupField.get('email')?.value,
            this.editFormGroupField.get('userName')?.value,
            this.imageUrlField, this.editFormGroup.get('password')?.value,
            this.editFormGroupField.get('confPassword')?.value).subscribe({
                next: (data) => {
                    this.toastService.showToast(data.message, 'success');
                    this.router.navigate(['/article'])
                },
                error: (err) => {
                    this.toastService.showToast(err.error.message, errorType(err))
                }
            });
    }

    logout():void {
        this.tokenService.clearToken();
        this.router.navigate(['/']).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
      }
}