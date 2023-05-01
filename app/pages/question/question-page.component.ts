import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Question} from "./question";
import {questionDTO} from "./questionDTO";

@Component({
  selector: 'app-user',
  templateUrl: './question-page.component.html',
  styleUrls:['./question-page.component.scss']
})
export class QuestionPageComponent implements AfterViewInit{
  @Input() question = new Question(1,"Question1",1,"text","01/01/2023","img",1,1);
  questions: questionDTO[] = [
    {
      title:"First question",
      text:"text",
      image:"https://thumbs.dreamstime.com/b/example-red-tag-example-red-square-price-tag-117502755.jpg",
      tag:"tag1",
      author: "Author 1",
      date: "10/01/2023"
    },
    {
      title:"Second question",
      text:"text",
      image:"https://thumbs.dreamstime.com/b/example-red-tag-example-red-square-price-tag-117502755.jpg",
      tag:"tag2",
      author: "Author 1",
      date: "10/01/2023"
    },
    {
      title:"Third question",
      text:"text",
      image:"https://thumbs.dreamstime.com/b/example-red-tag-example-red-square-price-tag-117502755.jpg",
      tag:"tag3",
      author: "Author 1",
      date: "10/01/2023"
    }
  ]
  ngAfterViewInit(): void {
  }

}
