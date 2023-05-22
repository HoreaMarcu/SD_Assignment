import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {questionDTO} from "./questionDTO";
import {Global} from "../global";
import {AuthService} from "../authService";

@Component({
  selector: 'app-user',
  templateUrl: './question-page.component.html',
  styleUrls:['./question-page.component.scss']
})
export class QuestionPageComponent implements AfterViewInit, OnInit{
  constructor(private http: HttpClient,private authService: AuthService) {
  }
  questions: questionDTO[] = []
  realQs : any[] = []
  users : any[] = []

  tagsQ : any[] = []

  tags : any[] = []
  ngOnInit() {
    Global.activeUser = this.authService.activeUser;
    this.getQuestions().subscribe((data:any) => {
      console.log(data)
      this.realQs = data

      this.getUsers().subscribe((data1:any) => {
        console.log("HERE: \n")
        console.log(data1)
        this.users = data1

        for(let i = 0; i < this.realQs.length; i++){
          for(let j = i+1; j < this.realQs.length; j++){
            if(this.realQs[i].creation_date_time <= this.realQs[j].creation_date_time){
              let aux = this.realQs[i]
              this.realQs[i] = this.realQs[j]
              this.realQs[j] = aux
            }
          }
        }

        for(let i = 0; i < this.realQs.length; i++){
          let authorString = this.users[this.realQs[i].author_cnp - 1].lastName + " " + this.users[this.realQs[i].author_cnp - 1].firstName;
          this.getTagsQ().subscribe(async (data2: any) => {
            console.log("TagsQ:")
            console.log(data2)
            this.tagsQ = data2
            let fullTags = ""
            const promises = [];

            for (let j = 0; j < this.tagsQ.length; j++) {
              if (this.tagsQ[j].question_id == this.realQs[i].content_id) {
                const promise = new Promise<void>((resolve) => {
                  this.getTags().subscribe((data3: any) => {
                    console.log(data3);
                    this.tags = data3;
                    fullTags += this.tags[this.tagsQ[j].tag_id - 1].tag_name + ' ';
                    console.log('full tags inside if:');
                    console.log(fullTags);
                    resolve();
                  });
                });

                promises.push(promise);
              }
            }
            await Promise.all(promises);
            console.log("full tags outside if:")
            console.log(fullTags)

            this.questions.push({
              id: this.realQs[i].content_id,
              title: this.realQs[i].title,
              text: this.realQs[i].text_content,
              image: this.realQs[i].picture,
              tag: fullTags,
              author: authorString,
              date: this.realQs[i].creation_date_time.substring(0, 10)
            })


          });


        }

        console.log("see active user:")
        // @ts-ignore
        console.log(Global.activeUser.firstName)

      })

    })
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const searchQuery = (event.target as HTMLInputElement).value;
      console.log('Search query:', searchQuery);
      (event.target as HTMLInputElement).value = '';

      this.questions = this.questions.filter(question =>
        question.title.includes(searchQuery) ||
        question.tag.includes(searchQuery) ||
        question.author.includes(searchQuery)
      );
    }
  }



  shouldShowUpdateButton(authorString: string): boolean {

    // @ts-ignore
    if(Global.activeUser.userId == 4) return true;
    // @ts-ignore
    return authorString === Global.activeUser.lastName + " " + Global.activeUser.firstName
  }

  getQuestions(){
    return this.http.get<any>('http://localhost:8080/questions/getAll')
  }
  getUsers(){
    return this.http.get<any>('http://localhost:8080/users/getAll')
  }
  getTags(){
    return this.http.get<any>('http://localhost:8080/tags/getAll')
  }
  getTagsQ(){
    return this.http.get<any>('http://localhost:8080/tagQ/getAll')
  }
  ngAfterViewInit(): void {

  }

}
