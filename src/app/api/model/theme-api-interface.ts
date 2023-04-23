import { card } from "./card-api-interface";

export interface theme {
    Id :number;
    Name :string;
    Colors :string;
    ProfileImage :string;
    BackgroundImage :string;
    Card? : card[];
}