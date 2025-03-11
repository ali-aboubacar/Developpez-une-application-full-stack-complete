import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ThemeEnum } from "src/app/_enums/themes.enum";
import { ITheme, IThemes } from "src/app/_interfaces/theme";
import { errorType } from "src/app/_interfaces/toasr";
import { IUser } from "src/app/_interfaces/user";
import { ThemeService } from "src/app/_services/theme.service";
import { ToastService } from "src/app/_services/toast.service";
import { UserService } from "src/app/_services/user.service";

@Component({
    selector: 'app-theme-list',
    templateUrl: './theme-list.component.html',
    styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit{
    private themesField!: ITheme[];
    private currentUserField!: IUser;

    constructor(private themeService: ThemeService,
        private userService: UserService,
        private route: ActivatedRoute,
        private toastService: ToastService){}
    public get themes(){
        return this.themesField;
    }

    public get currentUser(){
        return this.currentUserField;
    }
    ngOnInit(): void {
        this.loadAllTheme();
        this.currentUserField = this.route.snapshot.data['response'];
    }

    findSubscribed(themeId: number): boolean{
       return !!this.currentUser.themes.find((theme: ITheme) => theme.id === themeId);
    }

    loadAllTheme(): void{
        this.themeService.getAllTheme().subscribe({
            next: (data)=>{
                this.themesField = data
            },
            error: (err) => {
                this.toastService.showToast(err.error.message, errorType(err));
            }
        })
    }

    subscribe(themeId: number): void{
        this.userService.subscribe(themeId).subscribe({
            next: (data)=>{
                this.userService.getCurrentUser().subscribe({
                    next: (data)=>{
                        this.currentUserField = data;
                    },
                    error: (err) => {
                        this.toastService.showToast(err.error.message, errorType(err));
                    }
                });
            },
            error: (err) => {
                this.toastService.showToast(err.error.message, errorType(err));
            }
        })
    }

    unSubscribe(themeId: number): void{
        this.userService.unSubscribe(themeId).subscribe({
            next: (data)=>{
                this.userService.getCurrentUser().subscribe({
                    next: (data)=>{
                        this.currentUserField = data;
                    },
                    error: (err) => {
                        this.toastService.showToast(err.error.message, errorType(err));
                    }
                });
            },
            error: (err) => {
                this.toastService.showToast(err.error.message, errorType(err));
            }
        })
    }
}