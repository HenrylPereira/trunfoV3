import { environment } from "src/environments/environment";
import { requestBase } from "./request-service-base";
import { card } from "../model/card-api-interface";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class cardApi extends requestBase {
    
    constructor(httpClient: HttpClient){
        super(httpClient)
    }

    url = environment.urlBase + '/api' + '/theme';

    getAllCards(){
        return this.getAll<card>(this.url);
    }

    getCardById(id: number){
        return this.getById<card>(this.url, id);
    }
}