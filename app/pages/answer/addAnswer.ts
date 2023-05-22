import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "../question/question";
import {Answer} from "./answer";
import {ActivatedRoute} from "@angular/router";
import {Global} from "../global";
import {AuthService} from "../authService";

@Component({
  selector: 'app-user',
  templateUrl: './addAnswer.html',
  styleUrls:['./addAnswer.css']
})
export class AddAnswerPageComponent implements OnInit{
  constructor(private http: HttpClient,private route: ActivatedRoute,private authService: AuthService) {}

  form: HTMLFormElement | undefined;
  realAs : any[] = []

  insertAnswer(answer:Answer){
    return this.http.post<any>('http://localhost:8080/answers/insertAnswer', answer)
  }
  getAnswers(){
    return this.http.get<any>('http://localhost:8080/answers/getAll')
  }

  ngOnInit(): void {
    Global.activeUser = this.authService.activeUser;
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      const idQ = +params.get('id');

      this.form = document.querySelector('form') as HTMLFormElement;

      this.form.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent form from submitting and reloading the page

        const imageInput = document.querySelector('#answer-image') as HTMLInputElement;
        const textArea = document.querySelector('#answer-text') as HTMLTextAreaElement;

        let image: File;
        // @ts-ignore
        image = imageInput.files[0];
        const imageName = "assets\\\\" + image.name;
        const text = textArea.value;
        let date1: Date = new Date();

        this.getAnswers().subscribe((data2:any) => {
          console.log("REAL AS : \n")
          console.log(data2)
          this.realAs = data2
          // @ts-ignore
          const authorCNP = Global.activeUser.userId;
          const newId = this.realAs.length + 101
          const answer: Answer = new Answer(newId, idQ, authorCNP, text, date1, imageName, 0, 0)
          console.log(answer)

          this.insertAnswer(answer).subscribe(result => {
            // handle success
            console.log('Answer added to database');
          }, error => {
            // handle error
            console.error('Failed to add Answer to database');
          });
        });
      });
    });
  }
}
