import {NgModule} from "@angular/core";
import {NativeScriptModule} from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import {NativeScriptHttpModule} from "nativescript-angular/http";

import {AppComponent} from "./app.component";
import {NativeScriptRouterModule} from "nativescript-angular";
import {navigableComponents, routes} from "./app.routing";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        ...navigableComponents
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
