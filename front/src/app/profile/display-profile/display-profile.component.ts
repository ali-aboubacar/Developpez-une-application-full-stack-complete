import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-display-profile',
    templateUrl: './display-profile.component.html',
    styleUrls: ['./display-profile.component.scss']
})
export class DisplayProfileComponent implements OnInit{
    private currentUserField: any;

    constructor(private route: ActivatedRoute){}

    public get currentUser(){
        return this.currentUserField;
    }

    ngOnInit(): void {
        this.currentUserField = this.route.snapshot.data['response'];
        console.log(this.currentUserField)
    }
}