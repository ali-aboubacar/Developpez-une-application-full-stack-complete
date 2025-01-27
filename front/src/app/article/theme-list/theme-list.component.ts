import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ThemeEnum } from "src/app/_enums/themes.enum";
import { ThemeService } from "src/app/_services/theme.service";
import { UserService } from "src/app/_services/user.service";

@Component({
    selector: 'app-theme-list',
    templateUrl: './theme-list.component.html',
    styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit{
    private themesField: any;
    private currentUserField: any;

    constructor(private themeService: ThemeService,
        private userService: UserService,
        private route: ActivatedRoute
    ){}
    public get themes(){
        return this.themesField;
    }

    ngOnInit(): void {
        this.loadAllTheme();
        this.currentUserField = this.route.snapshot.data['response'];
        console.log(this.currentUserField)
    }
    findSubscribed(themeId: number): boolean{
       return this.currentUserField.themes.find((theme: any) => theme.id === themeId);
    }

    loadAllTheme(){
        this.themeService.getAllTheme().subscribe((data)=>{
            this.themesField = data
            console.log(data)
        })
    }

    subscribe(themeId: number){
        this.userService.subscribe(themeId).subscribe((data)=>{
            console.log(data);
            this.userService.getCurrentUser().subscribe((data)=>{
                this.currentUserField = data;
            });
        })
    }

    unSubscribe(themeId: number){
        this.userService.unSubscribe(themeId).subscribe((data)=>{
            console.log(data);
            this.userService.getCurrentUser().subscribe((data)=>{
                this.currentUserField = data;
            });
        })
    }
}