import {Component, Input, OnInit} from '@angular/core';
import { Answer } from './answer';
import {Question} from "../question/question";
import {HttpClient} from "@angular/common/http";
import {questionDTO} from "../question/questionDTO";
import {AnswerDTO} from "./answerDTO";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-answer',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.scss']
})

export class AnswerPageComponent implements OnInit{

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }
  question: questionDTO = { id: 0, title: 'TESTT', text: '', author: '', date: '', tag: '', image: '' };
  answers : AnswerDTO[] = []
  realQs : any[] = []
  users : any[] = []
  realAs : any[] = []
  questions: questionDTO[] = []
  actualQ : questionDTO | undefined



  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      const id = +params.get('id');


    this.getQuestions().subscribe((data:any) => {

      console.log("real Q is ANS: \n")
      console.log(data)
      this.realQs = data





      this.getUsers().subscribe((data1:any) => {


        console.log(data1)
        this.users = data1


        let authorString = this.users[this.realQs[id - 1].author_cnp - 1].lastName + " " + this.users[this.realQs[id - 1].author_cnp - 1].firstName;
        this.actualQ = {id: this.realQs[id - 1].content_id,title:this.realQs[id - 1].title, text:this.realQs[id - 1].text_content, image:this.realQs[id - 1].picture, tag:this.realQs[id - 1].tag, author: authorString, date:this.realQs[id - 1].creation_date_time.substring(0,10)}

        this.getAnswers().subscribe((data2:any) => {
          console.log("REAL AS : \n")
          console.log(data2)
          this.realAs = data2

          for (let i = 0; i < this.realAs.length; i++) {
            let authorString = this.users[this.realAs[i].author_cnp - 1].lastName + " " + this.users[this.realAs[i].author_cnp - 1].firstName;
            if(this.realAs[i].question_id == this.realQs[id - 1].content_id) {
              this.answers.push({
                text: this.realAs[i].text_content,
                image: this.realAs[i].picture,
                author: authorString,
                date: this.realAs[i].creation_date_time.substring(0, 10)
              })
            }
          }
        })

      })

    })



    });

  }
  getQuestions(){
    return this.http.get<any>('http://localhost:8080/questions/getAll')
  }
  getUsers(){
    return this.http.get<any>('http://localhost:8080/users/getAll')
  }
  getAnswers(){
    return this.http.get<any>('http://localhost:8080/answers/getAll')
  }
}
