import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Question } from "./question";
import {Global} from "../global";
import {AuthService} from "../authService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './updateQuestion.html',
  styleUrls: ['./updateQuestion.css']
})
export class UpdateQuestionPageComponent implements OnInit {

  constructor(private http: HttpClient,private authService: AuthService,private route: ActivatedRoute) {}

  form: HTMLFormElement | undefined;
  realQs : any[] = []
  ngOnInit(): void {
    Global.activeUser = this.authService.activeUser;
    const updateButton = document.querySelector('#updateButton') as HTMLInputElement;
    const deleteButton = document.querySelector('#deleteButton') as HTMLInputElement;
    updateButton.addEventListener('click', (event) => {
      event.preventDefault(); // prevent button from submitting and reloading the page
      this.route.paramMap.subscribe(params => {
        // @ts-ignore
        const id = +params.get('id');

          const titleInput = document.querySelector('#title') as HTMLInputElement;
          const imageInput = document.querySelector('#image') as HTMLInputElement;
          const textArea = document.querySelector('#text') as HTMLTextAreaElement;

          const title = titleInput.value;
          let image: File;
          // @ts-ignore
          image = imageInput.files[0];
          const imageName = "assets\\\\" + image.name;
          const text = textArea.value;
          let date1: Date = new Date();

          this.getQuestions().subscribe((data: any) => {
            console.log(data)
            this.realQs = data

            // @ts-ignore
            const authorCNP = Global.activeUser.userId;
            let k;
            for (let i = 0; i < this.realQs.length; i++) {
              if (this.realQs[i].content_id == id) {

                k = i;
                console.log(k)
              }
            }
            // @ts-ignore
            const question: Question = new Question(id, title, authorCNP, text, date1, imageName, this.realQs[k].likes, this.realQs[k].dislikes)

            this.updateQuestion(question).subscribe(result => {
              // handle success
              console.log('Question updated to database');
            }, error => {
              // handle error
              console.error('Failed to update question to database');
            });
          });
        });
    });
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault(); // prevent button from submitting and reloading the page
      console.log("delete pressed")
      this.route.paramMap.subscribe(params => {
        // @ts-ignore
        const id = +params.get('id');
        let realAns : any[] = []

        this.getAnswers().subscribe((dataAns:any) =>{
          realAns = dataAns;
          for(let i = 0; i < realAns.length; i++){
            if(realAns[i].question_id == id){
              this.deleteAnswerByID(realAns[i].content_id).subscribe();
            }
          }
        })
        let realVotes: any[] = []

        this.getVotes().subscribe((dataVotes:any) =>{
          realVotes = dataVotes;
          for(let i = 0; i < realVotes.length; i++){
            if(realVotes[i].content_id == id){
              this.deleteVoteByID(realVotes[i].id).subscribe();
            }
          }
        })

        let realTagQ: any[] = []

        this.getTagQ().subscribe((dataTagQ:any) =>{
          realTagQ = dataTagQ;
          for(let i = 0; i < realTagQ.length; i++){
            if(realTagQ[i].question_id == id){
              this.deleteTagQByID(realTagQ[i].id).subscribe();
            }
          }
        })

        this.deleteQuestionByID(id).subscribe(result => {
          // handle success
          //console.log('Question deleted from database');
        }, error => {
          // handle error
          //console.error('Failed to delete question from database');
        });
      });

    });


  }


  getQuestions(){
    return this.http.get<any>('http://localhost:8080/questions/getAll')
  }
  updateQuestion(question:Question){
    return this.http.put<any>('http://localhost:8080/questions/updateQuestion', question)
  }
  deleteQuestionByID(id : number){
    return this.http.delete<any>('http://localhost:8080/questions/deleteById/' + id)
  }
  deleteAnswerByID(id : number){
    return this.http.delete<any>('http://localhost:8080/answers/deleteById/' + id)
  }

  getAnswers(){
    return this.http.get<any>('http://localhost:8080/answers/getAll')
  }

  deleteVoteByID(id : number){
    return this.http.delete<any>('http://localhost:8080/votes/deleteById/' + id)
  }

  getVotes(){
    return this.http.get<any>('http://localhost:8080/votes/getAll')
  }

  deleteTagQByID(id : number){
    return this.http.delete<any>('http://localhost:8080/tagQ/deleteById/' + id)
  }

  getTagQ(){
    return this.http.get<any>('http://localhost:8080/tagQ/getAll')
  }

}
