import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Question } from "./question";

@Component({
  selector: 'app-user',
  templateUrl: './askQuestion.html',
  styleUrls: ['./askQuestion.css']
})
export class AskQuestionPageComponent implements OnInit {

  constructor(private http: HttpClient) {}

  form: HTMLFormElement | undefined;

  ngOnInit(): void {
    this.form = document.querySelector('form') as HTMLFormElement;

    this.form.addEventListener('submit', (event) => {
      event.preventDefault(); // prevent form from submitting and reloading the page

      const titleInput = document.querySelector('#title') as HTMLInputElement;
      const imageInput = document.querySelector('#image') as HTMLInputElement;
      const textArea = document.querySelector('#text') as HTMLTextAreaElement;

      const title = titleInput.value;
      let image: File;
      // @ts-ignore
      image = imageInput.files[0];
      const imageName = image.name;
      const text = textArea.value;

      const question: Question = new Question(4,title,1,text,"15-05-2023",imageName,0,0)

      this.insertQuestion(question).subscribe(result => {
        // handle success
        console.log('Question added to database');
      }, error => {
        // handle error
        console.error('Failed to add question to database');
      });
    });
  }

  insertQuestion(question: Question) {
    return this.http.post<any>('http://localhost:8080/questions/insertQuestion', question);
  }
}
