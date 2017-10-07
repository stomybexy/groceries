import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../shared/user/user.service";
import {User} from "../../shared/user/user";
import {Router} from "@angular/router";
import {Page} from "tns-core-modules/ui/page";
import {View} from "tns-core-modules/ui/core/view";
import {Color} from "tns-core-modules/color";
import {TextField} from "tns-core-modules/ui/text-field";
import {setHintColor} from "../../utils/hint-util";

@Component({
    selector: 'login',
    templateUrl: 'pages/login/login.html',
    styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
    providers: [UserService]
})

export class LoginComponent implements OnInit {
    @ViewChild('container') container: ElementRef;
    @ViewChild("email") email: ElementRef;
    @ViewChild("password") password: ElementRef;

    user: User;
    isLoggingIn = true;

    constructor(private userService: UserService, private  router: Router, private page: Page) {
        this.user = {email: 'jsombie@klik.com', password: 'jsombie'}
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
        // this.page.backgroundImage = "res://bg_login";
    }

    submit() {
        if (!this.userService.isValidEmail(this.user.email)) {
            alert("Enter a valid email address.");
            return;
        }
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    login() {
        this.userService.login(this.user)
            .subscribe(
                () => this.router.navigate(['/list']),
                (error) => alert(`Unfortunately we could not find your account.`)
            );
    }

    signUp() {
        this.userService.register(this.user)
            .subscribe(
                () => {
                    alert("Your account was successfully created.");
                    this.toggleDisplay();
                },
                () => alert("unfortunately we were unable to create your account.")
            )
    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
        this.setTextFieldColors();
        let container = <View>this.container.nativeElement;
        container.animate({
            backgroundColor: this.isLoggingIn ? new Color('white') : new Color('#301217'),
            duration: 200
        })
    }

    setTextFieldColors() {
        let emailTextField = <TextField>this.email.nativeElement;
        let passwordTextField = <TextField>this.password.nativeElement;

        let mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
        emailTextField.color = mainTextColor;
        passwordTextField.color = mainTextColor;

        let hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
        setHintColor({view: emailTextField, color: hintColor});
        setHintColor({view: passwordTextField, color: hintColor});
    }

    startBackgroundAnimation(background) {
        background.animate({
            scale: { x: 1.0, y: 1.0 },
            duration: 10000
        });
    }

}