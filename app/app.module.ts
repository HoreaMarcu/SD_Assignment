import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserPageComponent } from './pages/user/user-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { QuestionPageComponent } from './pages/question/question-page.component';
import { AnswerPageComponent } from './pages/answer/answer-page.component';
import { SignupPageComponent } from './pages/signUp/signup-page.component';
import { AskQuestionPageComponent } from './pages/question/askQuestion';
import { AddAnswerPageComponent } from './pages/answer/addAnswer';
import { environment } from 'src/environments/environment';
import { setCorsConfiguration } from './cors-config';
import {CorsInterceptor} from "./CorsInterceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UpdateQuestionPageComponent} from "./pages/question/updateQuestion";
import {UpdateAnswerPageComponent} from "./pages/answer/updateAnswer";
import {BannedPageComponent} from "./pages/home/banned";
import {ShowUsersComponent} from "./pages/showAllUsers/showUsers";

const appRoute: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'profile', component: UserPageComponent },
  { path: 'questions', component: QuestionPageComponent },
  { path: 'answers', component: AnswerPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'askQ', component: AskQuestionPageComponent },
  { path: 'addAnswer', component: AddAnswerPageComponent },
  { path: 'question/:id', component: AnswerPageComponent },
  { path: 'addAnswer/:id', component: AddAnswerPageComponent },
  { path: 'updateQ/:id', component: UpdateQuestionPageComponent },
  { path: 'updateA/:id', component: UpdateAnswerPageComponent },
  { path: 'banned', component: BannedPageComponent},
  { path: 'showUsers', component: ShowUsersComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserPageComponent,
    HomePageComponent,
    QuestionPageComponent,
    AnswerPageComponent,
    SignupPageComponent,
    AskQuestionPageComponent,
    AddAnswerPageComponent,
    UpdateQuestionPageComponent,
    UpdateAnswerPageComponent,
    BannedPageComponent,
    ShowUsersComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        PasswordModule,
        ButtonModule,
        InputTextModule,
        HttpClientModule,
        RouterModule.forRoot(appRoute),
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

setCorsConfiguration();
