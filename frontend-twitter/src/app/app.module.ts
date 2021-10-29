import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CardComponent } from './components/card/card.component';
import { GameComponent } from './components/game/game.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import { NavigationButtonComponent } from './components/navigation-button/navigation-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardComponent,
    GameComponent,
    SearchUserComponent,
    NavigationButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
