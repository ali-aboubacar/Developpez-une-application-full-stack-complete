import { Component, OnInit } from "@angular/core";
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

    constructor(private themeService: ThemeService, private userService: UserService){}
    public get themes(){
        return this.themesField;
    }

    ngOnInit(): void {
        this.loadAllTheme();
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
        })
    }

    unSubscribe(themeId: number){
        this.userService.unSubscribe(themeId).subscribe((data)=>{
            console.log(data);
        })
    }
}