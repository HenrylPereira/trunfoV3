import { environment } from "src/environments/environment";
import { requestBase } from "./request-service-base";
import { attribute } from "../model/attribute-api-interface";

@Injectable({
    providedIn: 'root',
})

export class attributeApi extends requestBase {
    
    url = environment.urlBase + '/api' + '/theme';

    getAllAttributes(){
        return this.getAll<attribute>(this.url);
    }

    getAttributeById(id: number){
        return this.getById<attribute>(this.url, id);
    }
}