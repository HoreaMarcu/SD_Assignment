import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "../question/question";
import {Answer} from "./answer";
import {ActivatedRoute} from "@angular/router";
import {Global} from "../global";
import {AuthService} from "../authService";

@Component({
  selector: 'app-user',
  templateUrl: './updateAnswer.html',
  styleUrls:['./updateAnswer.css']
})
export class UpdateAnswerPageComponent implements OnInit{
  constructor(private http: HttpClient,private route: ActivatedRoute,private authService: AuthService) {}

  form: HTMLFormElement | undefined;
  realAs : any[] = []

  updateAnswer(answer:Answer){
    return this.http.put<any>('http://localhost:8080/answers/updateAnswer', answer)
  }
  getAnswers(){
    return this.http.get<any>('http://localhost:8080/answers/getAll')
  }
  deleteAnswerByID(id : number){
    return this.http.delete<any>('http://localhost:8080/answers/deleteById/' + id)
  }

  ngOnInit(): void {
    Global.activeUser = this.authService.activeUser;
    const updateButton = document.querySelector('#updateButton') as HTMLInputElement;
    const deleteButton = document.querySelector('#deleteButton') as HTMLInputElement;
    updateButton.addEventListener('click', (event) => {
      event.preventDefault(); // prevent button from submitting and reloading the page
      this.route.paramMap.subscribe(params => {
        // @ts-ignore
        const id = +params.get('id');

        const imageInput = document.querySelector('#answer-image') as HTMLInputElement;
        const textArea = document.querySelector('#answer-text') as HTMLTextAreaElement;

        let image: File;
        // @ts-ignore
        image = imageInput.files[0];
        const imageName = "assets\\\\" + image.name;
        const text = textArea.value;
        let date1: Date = new Date();

        this.getAnswers().subscribe((data: any) => {
          console.log(data)
          this.realAs = data

          // @ts-ignore
          const authorCNP = Global.activeUser.userId;
          let k;
          for (let i = 0; i < this.realAs.length; i++) {
            if (this.realAs[i].content_id == id) {

              k = i;
              console.log(k)
            }
          }
          // @ts-ignore
          const answer: Answer = new Answer(id,this.realAs[k].question_id, authorCNP, text, date1, imageName, this.realAs[k].likes, this.realAs[k].dislikes)

          this.updateAnswer(answer).subscribe(result => {
            // handle success
            console.log('Answer updated to database');
          }, error => {
            // handle error
            console.error('Failed to update answer to database');
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


        let realVotes: any[] = []

        this.getVotes().subscribe((dataVotes:any) =>{
          realVotes = dataVotes;
          for(let i = 0; i < realVotes.length; i++){
            if(realVotes[i].content_id == id){
              this.deleteVoteByID(realVotes[i].id).subscribe();
            }
          }
        })


        this.deleteAnswerByID(id).subscribe(result => {
          // handle success
          //console.log('Question deleted from database');
        }, error => {
          // handle error
          //console.error('Failed to delete question from database');
        });
      });

    });


  }
  deleteVoteByID(id : number){
    return this.http.delete<any>('http://localhost:8080/votes/deleteById/' + id)
  }

  getVotes(){
    return this.http.get<any>('http://localhost:8080/votes/getAll')
  }
}
