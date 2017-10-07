import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Config} from "../config";
import {Observable} from "rxjs/Observable";
import {Grocery} from "./grocery";

@Injectable()
export class GroceryListService {

    constructor(private http: Http) {
    }

    load() {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + Config.token);

        return this.http.get(Config.apiUrl + "Groceries", {
            headers: headers
        })
            .map(res => res.json())
            .map(data => {
                let groceryList: Grocery[] = [];
                data.Result.forEach((grocery) => {
                    groceryList.push({id: grocery.Id, name: grocery.Name});
                });
                return groceryList;
            })
            .catch(this.handleErrors);
    }

    add(name: string) {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + Config.token);
        headers.append("Content-Type", "application/json");

        return this.http.post(
            Config.apiUrl + "Groceries",
            JSON.stringify({Name: name}),
            {headers: headers}
        )
            .map(res => res.json())
            .map(data => {
                return {id: data.Result.Id, name: name};
            })
            .catch(this.handleErrors);
    }

    delete(id: string) {
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + Config.token);
        headers.append("Content-Type", "application/json");

        return this.http.delete(
            Config.apiUrl + "Groceries/" + id,
            {headers: headers}
        )
            .map(res => res.json())
            .catch(this.handleErrors);
    }

    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    }
}