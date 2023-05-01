import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./pages/user/user";
import {Question} from "./pages/question/question";
import {Answer} from "./pages/answer/answer";
import {UserPageComponent} from "./pages/user/user-page.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-example';
  user: any = {
    name:"Pop Ion",
    username: "poppyion@gmail.com",
    password: "testpwd",
    address: "dummy  Address"
  };

  users : any[] = []
  constructor(private http: HttpClient) {
  }



  ngOnInit() {
    this.getUsers().subscribe((data:any) => {
      console.log(data)
      this.users = data
    })
    //this.ex.email = this.ex.user.email;

    //debugger
    //this.change();
  }
  // change(){
  //   let ex = new UserPageComponent(this.users[0]);
  // }
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
