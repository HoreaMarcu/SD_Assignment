import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./pages/user/user";
import {Question} from "./pages/question/question";
import {Answer} from "./pages/answer/answer";
import {UserPageComponent} from "./pages/user/user-page.component";
import {Router} from "@angular/router";
import {AuthService} from "./pages/authService";
import {Global} from "./pages/global";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-example';
  activeUser: any = new User(0,"","","","","","");
  constructor(private http: HttpClient,private authService: AuthService, private router: Router) {
  }

  logout(): void {
    // Clear the activeUser in the AuthService
    this.authService.activeUser = null;

    // Clear the activeUser in the Global object
    Global.activeUser = null;

    // Navigate to the login page or any other desired page
    this.router.navigate(['']);
    console.log("active user: ")
    console.log(Global.activeUser)
  }
  onClick(): void{
    if(Global.activeUser){
      this.router.navigate(['/questions']);
    }
  }
  onClick1(): void{
    if(Global.activeUser){
      // @ts-ignore
      if(Global.activeUser.userId == 4) {
        this.router.navigate(['/showUsers']);
      }
    }
  }
  // shouldShowUsersButton() : boolean{
  //   if(Global.activeUser != null) {
  //     // @ts-ignore
  //     if (Global.activeUser.userId == 4) return true;
  //     else return false;
  //   }
  //   return  true;
  // }
  ngOnInit(): void {
    this.activeUser = Global.activeUser;
  }
  getUsers(){
    return this.http.get<any>('http://localhost:8080/users/getAll')
  }
  getQuestions(){
    return this.http.get<any>('http://localhost:8080/questions/getAll')
  }
  getAnswers(){
    return this.http.get<any>('http://localhost:8080/answers/getAll')
  }
  insertUser(user:User){
    return this.http.post<any>('http://localhost:8080/users/insertUser', user)
  }

  updateUser(user: User){
    return this.http.put<any>('http://localhost:8080/users/updateUser', user)
  }

  getUserByID(id : number){
    return this.http.get<any>('http://localhost:8080/users/getById/' + id)
  }

  deleteUserByID(id : number){
    return this.http.delete<any>('http://localhost:8080/deleteById/getById/' + id)
  }

  insertQuestion(question:Question){
    return this.http.post<any>('http://localhost:8080/questions/insertQuestion', question)
  }

  updateQuestion(question:Question){
    return this.http.put<any>('http://localhost:8080/questions/updateQuestion', question)
  }

  getQuestionByID(id : number){
    return this.http.get<any>('http://localhost:8080/questions/getById/' + id)
  }

  deleteQuestionByID(id : number){
    return this.http.delete<any>('http://localhost:8080/questions/getById/' + id)
  }

  insertAnswer(answer:Answer){
    return this.http.post<any>('http://localhost:8080/answers/insertAnswer', answer)
  }

  updateAnswer(answer:Answer){
    return this.http.put<any>('http://localhost:8080/answers/updateAnswer', answer)
  }

  getAnswerByID(id : number){
    return this.http.get<any>('http://localhost:8080/answers/getById/' + id)
  }

  deleteAnswerByID(id : number){
    return this.http.delete<any>('http://localhost:8080/answers/getById/' + id)
  }

}
