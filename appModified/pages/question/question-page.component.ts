import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "./question";
import {questionDTO} from "./questionDTO";
import {User} from "../user/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './question-page.component.html',
  styleUrls:['./question-page.component.scss']
})
export class QuestionPageComponent implements AfterViewInit, OnInit{
  constructor(private http: HttpClient) {
  }
  @Input() question = new Question(1,"Question1",1,"text","01/01/2023","img",1,1);
  questions: questionDTO[] = []
  // questions: questionDTO[] = [
  //   {
  //     title:"First question",
  //     text:"text",
  //     image:"https://thumbs.dreamstime.com/b/example-red-tag-example-red-square-price-tag-117502755.jpg",
  //     tag:"tag1",
  //     author: "Author 1",
  //     date: "10/01/2023"
  //   },
  //   {
  //     title:"Second question",
  //     text:"text",
  //     image:"https://thumbs.dreamstime.com/b/example-red-tag-example-red-square-price-tag-117502755.jpg",
  //     tag:"tag2",
  //     author: "Author 1",
  //     date: "10/01/2023"
  //   },
  //   {
  //     title:"Third question",
  //     text:"text",
  //     image:"https://thumbs.dreamstime.com/b/example-red-tag-example-red-square-price-tag-117502755.jpg",
  //     tag:"tag3",
  //     author: "Author 1",
  //     date: "10/01/2023"
  //   }
  // ]
  realQs : any[] = []
  users : any[] = []
  ngOnInit() {
    this.getQuestions().subscribe((data:any) => {
      console.log(data)
      this.realQs = data

      this.getUsers().subscribe((data1:any) => {
        console.log("HERE: \n")
        console.log(data1)
        this.users = data1


        for(let i = 0; i < this.realQs.length; i++){
          let authorString = this.users[this.realQs[i].author_cnp - 1].lastName + " " + this.users[this.realQs[i].author_cnp - 1].firstName;
          this.questions.push({id: this.realQs[i].content_id,title:this.realQs[i].title, text:this.realQs[i].text_content, image:this.realQs[i].picture, tag:this.realQs[i].tag, author: authorString, date:this.realQs[i].creation_date_time.substring(0,10)})
        }

      })

    })
  }

  getQuestions(){
    return this.http.get<any>('http://localhost:8080/questions/getAll')
  }
  getUsers(){
    return this.http.get<any>('http://localhost:8080/users/getAll')
  }
  ngAfterViewInit(): void {

  }

}
