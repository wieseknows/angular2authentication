import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Auth } from "./services/auth.service";

import { AppComponent }  from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { routing, appRoutingProviders } from "./app.routing";
import { AuthGuard } from "./app.guard";
import {GalleryComponent} from "./components/collages/gallery.component";
import {DndModule} from 'ng2-dnd';


@NgModule({
  imports:      [ BrowserModule, routing, DndModule.forRoot() ],
  declarations: [ AppComponent, HomeComponent, ProfileComponent, GalleryComponent ],
  bootstrap:    [ AppComponent ],
  providers: [
    appRoutingProviders,
    AUTH_PROVIDERS,
    Auth,
    AuthGuard
  ]
})
export class AppModule { }
