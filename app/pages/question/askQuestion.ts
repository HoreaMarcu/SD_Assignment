import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Question } from "./question";
import {Global} from "../global";
import {AuthService} from "../authService";
import {Tag} from "./tag";
import {TagQ} from "./tagQ";

@Component({
  selector: 'app-user',
  templateUrl: './askQuestion.html',
  styleUrls: ['./askQuestion.css']
})
export class AskQuestionPageComponent implements OnInit {

  constructor(private http: HttpClient,private authService: AuthService) {}

  form: HTMLFormElement | undefined;
  realQs : any[] = []

  tags : any[] = []
  tagQ : any[] = []
  ngOnInit(): void {
    Global.activeUser = this.authService.activeUser;
    this.form = document.querySelector('form') as HTMLFormElement;

    this.form.addEventListener('submit', (event) => {
      event.preventDefault(); // prevent form from submitting and reloading the page

      const titleInput = document.querySelector('#title') as HTMLInputElement;
      const imageInput = document.querySelector('#image') as HTMLInputElement;
      const textArea = document.querySelector('#text') as HTMLTextAreaElement;
      const tagsInput = document.querySelector('#tags') as HTMLTextAreaElement;

      const title = titleInput.value;
      let image: File;
      // @ts-ignore
      image = imageInput.files[0];
      const imageName = "assets\\\\"+image.name;
      const text = textArea.value;
      let date1 : Date = new Date();
      const actualTag = tagsInput.value;
      let newId1 = 0;
      this.getTags().subscribe((data1:any) => {

        this.tags = data1

        newId1 = this.tags.length + 1
        const tag = new Tag(newId1,actualTag);
        this.insertTag(tag).subscribe(result=>{
          console.log("Tag added to database")
        }, error => {
          console.error("Failed to add tag to database")
        })
      })



      this.getQuestions().subscribe((data:any) => {
        console.log(data)
        this.realQs = data

        const newId = this.realQs[this.realQs.length - 1].content_id + 1
        // @ts-ignore
        const authorCNP = Global.activeUser.userId;
        const question: Question = new Question(newId, title, authorCNP, text, date1, imageName, 0, 0)


        this.getTagsQ().subscribe((data2:any) => {
          this.tagQ = data2

          const newId2 = this.tagQ.length + 1

          const tagQ = new TagQ(newId2,newId,newId1)
          this.insertTagQ(tagQ).subscribe(result=>{
            console.log("TagQ added to database")
          }, error => {
            console.error("Failed to add tagQ to database")
          })
        })


        this.insertQuestion(question).subscribe(result => {
          // handle success
          console.log('Question added to database');
        }, error => {
          // handle error
          console.error('Failed to add question to database');
        });
      });
    });
  }


  getQuestions(){
    return this.http.get<any>('http://localhost:8080/questions/getAll')
  }
  insertQuestion(question: Question) {
    return this.http.post<any>('http://localhost:8080/questions/insertQuestion', question);
  }

  getTags(){
    return this.http.get<any>('http://localhost:8080/tags/getAll')
  }
  getTagsQ(){
    return this.http.get<any>('http://localhost:8080/tagQ/getAll')
  }
  insertTag(tag: Tag) {
    return this.http.post<any>('http://localhost:8080/tags/insertTag', tag);
  }

  insertTagQ(tagQ: TagQ) {
    return this.http.post<any>('http://localhost:8080/tagQ/insertTagQ', tagQ);
  }

}
