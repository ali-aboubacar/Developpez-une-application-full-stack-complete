import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class EditPicService {
    private toggleUpdatePicField: boolean = false;

    public get toggleUpdatePic(){
        return this.toggleUpdatePicField;
    }

    public set toggleUpdatePic(toggleUpdatePic: boolean){
        this.toggleUpdatePicField = toggleUpdatePic
    }
}