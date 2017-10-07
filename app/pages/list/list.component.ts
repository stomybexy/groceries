import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Grocery} from "../../shared/grocery/grocery";
import {GroceryListService} from "../../shared/grocery/grocery-list.service";
import {TextField} from "tns-core-modules/ui/text-field";
import * as SocialShare from "nativescript-social-share";

@Component({
    selector: 'list',
    styleUrls: ['pages/list/list-common.css', 'pages/list/list.css'],
    providers: [GroceryListService],
    templateUrl: 'pages/list/list.html'
})

export class ListComponent implements OnInit {
    @ViewChild('groceryTextField') groceryTextField: ElementRef;
    groceryList: Array<Grocery>;
    grocery: string = '';
    isLoading = false;
    listLoaded = false;

    constructor(private groceryListService: GroceryListService) {

    }

    ngOnInit() {
        this.isLoading = true;
        this.groceryListService.load()
            .subscribe(
                loadedGroceries => {
                    this.groceryList = loadedGroceries;
                    this.isLoading = false;
                    this.listLoaded = true;
                }
            )
    }

    add() {
        if (this.grocery.trim() === "") {
            alert("Enter a grocery item");
            return;
        }

        // Dismiss the keyboard
        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();

        this.groceryListService.add(this.grocery)
            .subscribe(
                groceryObject => {
                    this.groceryList.unshift(groceryObject);
                    this.grocery = '';
                },
                () => {
                    alert({
                        message: 'An error occurred while adding an item to your list.',
                        okButtonText: 'OK'
                    });
                    this.grocery = '';
                }
            )
    }

    share() {
        let listString = this.groceryList
            .map(grocery => grocery.name)
            .join(", ")
            .trim();
        SocialShare.shareText(listString);
    }

    delete(grocery: Grocery) {
        //Latency compensation
        let index = this.groceryList.indexOf(grocery);
        if(index > -1) {
            this.groceryList.splice(index, 1);
        }
        this.groceryListService.delete(grocery.id)
            .subscribe(
                () => {},
                () => {
                    //restore grocery into local list
                    if(index > -1) {
                        this.groceryList.splice(index, 0, grocery);
                    }
                    alert({
                        message: 'An error occurred while removing grocery from your list.',
                        okButtonText: 'OK'
                    });
                }
            )
    }
}