import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class requestBase {
    constructor(private http: HttpClient) { }

    getAll<T> (url:string) {
        return this.http.get<T[]>(url)        
    }

    getById<T> (url:string, id:number){
        return this.http.get<T>(url + '/' + id);
    }
}
