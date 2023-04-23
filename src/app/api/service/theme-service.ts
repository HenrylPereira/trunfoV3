import { environment } from "src/environments/environment";
import { requestBase } from "./request-service-base";
import { theme } from "../model/theme-api-interface";

@Injectable({
    providedIn: 'root',
})

export class themeApi extends requestBase {
    
    url = environment.urlBase + '/api' + '/theme';

    getAllThemes(){
        return this.getAll<theme>(this.url);
    }

    getThemeCards(id: number){
        return this.getById<theme>(this.url, id);
    }
}