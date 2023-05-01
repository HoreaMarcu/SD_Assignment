import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {UserPageComponent} from "./pages/user/user-page.component";
import {HttpClientModule} from "@angular/common/http";
import {HomePageComponent} from "./pages/home/home-page.component";
import {QuestionPageComponent} from "./pages/question/question-page.component";
import {AnswerPageComponent} from "./pages/answer/answer-page.component";



const appRoute: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'profile', component: UserPageComponent},
  {path: 'questions', component: QuestionPageComponent},
  {path: 'answers', component: AnswerPageComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserPageComponent,
    HomePageComponent,
    QuestionPageComponent,
    AnswerPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PasswordModule,
    ButtonModule,
    InputTextModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
