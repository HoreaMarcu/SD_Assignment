import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Answer } from './answer';
import {Question} from "../question/question";
import {HttpClient} from "@angular/common/http";
import {questionDTO} from "../question/questionDTO";
import {AnswerDTO} from "./answerDTO";
import { ActivatedRoute } from '@angular/router';
import {Vote} from "./vote";
import {Global} from "../global";
import {AuthService} from "../authService";
import {User} from "../user/user";
@Component({
  selector: 'app-answer',
  templateUrl: './answer-page.component.html',
  styleUrls: ['./answer-page.component.scss']
})

export class AnswerPageComponent implements OnInit{

  constructor(private http: HttpClient, private route: ActivatedRoute,private authService: AuthService) {
  }

  @ViewChild('likeButton') likeButton: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('dislikeButton') dislikeButton: ElementRef<HTMLButtonElement> | undefined;

  @ViewChild('likeButton2') likeButton2: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('dislikeButton2') dislikeButton2: ElementRef<HTMLButtonElement> | undefined;
  //question: questionDTO = { id: 0, title: 'TESTT', text: '', author: '', date: '', tag: '', image: '' };
  answers : AnswerDTO[] = []

  allVotes: any[] = []
  realQs : any[] = []
  users : any[] = []
  realAs : any[] = []
  realAs2 : any[] = []
  questions: questionDTO[] = []
  actualQ : questionDTO  = new questionDTO(0,"","","","","","")

  likes = 0;
  dislikes = 0;

  userScore : number[] = Array(1000).fill(0);
  userScore1 : number = 0

  getScore(stringUser: string | undefined, content_id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getUsers().subscribe((data1: any) => {
        this.users = data1;

        let user: User | undefined;

        for (let i = 0; i < this.users.length; i++) {
          if (stringUser === this.users[i].lastName + " " + this.users[i].firstName) {
            console.log("User generated");
            user = this.users[i];
          }
        }

        this.userScore1 = 0;
        this.getQuestions().subscribe((data: any) => {
          this.realQs = data;
          let userQ: any[] = [];
          for (let i = 0; i < this.realQs.length; i++) {
            // @ts-ignore
            if (this.realQs[i].author_cnp == user.userId) {
              userQ.push(this.realQs[i]);
            }
          }

          this.getVotes().subscribe((data1: any) => {
            this.allVotes = data1;
            for (let i = 0; i < userQ.length; i++) {
              for (let j = 0; j < this.allVotes.length; j++) {
                if (this.allVotes[j].content_id == userQ[i].content_id) {
                  if (this.allVotes[j].vote_type == 1) this.userScore1 += 2.5;
                  else this.userScore1 -= 1.5;
                }
              }
            }
            let userA: any[] = [];
            this.getAnswers().subscribe((data2: any) => {
              this.realAs = data2;
              for (let i = 0; i < this.realAs.length; i++) {
                // @ts-ignore
                if (this.realAs[i].author_cnp == user.userId) {
                  userA.push(this.realAs[i]);
                }
              }
              for (let i = 0; i < userA.length; i++) {
                for (let j = 0; j < this.allVotes.length; j++) {
                  if (this.allVotes[j].content_id == userA[i].content_id) {
                    if (this.allVotes[j].vote_type == 1) this.userScore1 += 5;
                    else this.userScore1 -= 2.5;
                  }
                }
              }

              for (let i = 0; i < this.allVotes.length; i++) {
                // @ts-ignore
                if (this.allVotes[i].user_id == user.userId && this.allVotes[i].vote_type == 0) this.userScore1 -= 1.5;
              }
              this.userScore[content_id] = this.userScore1
              resolve(); // Resolve the promise once the function completes
            });
          });
        });
      });
    });
  }

  likeQuestion() {
      this.route.paramMap.subscribe(params => {
        // @ts-ignore
        const id = +params.get('id');
        let canVote = true;
        let newId = 0;
        this.getVotes().subscribe(data =>{
          this.allVotes = data;
          console.log(this.allVotes)
          newId = this.allVotes[this.allVotes.length - 1].id + 1;
          for(let i = 0; i < this.allVotes.length; i++){
            // @ts-ignore
            if(this.allVotes[i].user_id == Global.activeUser.userId && this.allVotes[i].content_id == this.realQs[id - 1].content_id)
                canVote = false;

              }
          if(canVote) {
            console.log(canVote)
            // @ts-ignore
            const vote = new Vote(newId,Global.activeUser.userId,this.realQs[id - 1].content_id,1)
            console.log(vote)
            this.insertVote(vote).subscribe(result => {
              // handle success
              console.log('Vote added to database');
            }, error => {
              // handle error
              console.error('Failed to add vote to database');
            });

            this.likes++;
            this.realQs[id - 1].likes++;
            this.updateQuestion(this.realQs[id - 1]).subscribe(result => {
              // handle success
              console.log('Likes updated to database');
              //this.disableButtonsL();
            }, error => {
              // handle error
              console.error('Failed to update likes to database');
            });
          }
        })
      });
  }

  dislikeQuestion() {
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      const id = +params.get('id');
      let canVote = true;
      let newId = 0;
      this.getVotes().subscribe(data =>{
        this.allVotes = data;
        console.log(this.allVotes)
        newId = this.allVotes[this.allVotes.length - 1].id + 1;
        for(let i = 0; i < this.allVotes.length; i++){
          // @ts-ignore
          if(this.allVotes[i].user_id == Global.activeUser.userId && this.allVotes[i].content_id == this.realQs[id - 1].content_id)
            canVote = false;

        }
        if(canVote) {
          console.log(canVote)
          // @ts-ignore
          const vote = new Vote(newId,Global.activeUser.userId,this.realQs[id - 1].content_id,0)
          console.log(vote)
          this.insertVote(vote).subscribe(result => {
            // handle success
            console.log('Vote added to database');
          }, error => {
            // handle error
            console.error('Failed to add vote to database');
          });

          this.dislikes++;
          this.realQs[id - 1].dislikes++;
          this.updateQuestion(this.realQs[id - 1]).subscribe(result => {
            // handle success
            console.log('Dislikes updated to database');
            //this.disableButtonsL();
          }, error => {
            // handle error
            console.error('Failed to update dislikes to database');
          });
        }
      })
    });
  }

  likeAns(idA : number) {
    for(let i = 0; i < this.realAs2.length; i++){
      if(this.realAs2[i].content_id == idA) {
        // console.log("the current answer:")
        // console.log(this.realAs2[i])
        let canVote = true;
        let newId = 0;
        this.getVotes().subscribe(data =>{
          this.allVotes = data;
          console.log(this.allVotes)
          newId = this.allVotes[this.allVotes.length - 1].id + 1;
          for(let j = 0; j < this.allVotes.length; j++){
            // @ts-ignore
            if(this.allVotes[j].user_id == Global.activeUser.userId && this.allVotes[j].content_id == this.realAs2[i].content_id)
              canVote = false;

          }
          if(canVote) {
            // @ts-ignore
            const vote = new Vote(newId,Global.activeUser.userId,this.realAs2[i].content_id,1)
            console.log(vote)
            this.insertVote(vote).subscribe(result => {
              // handle success
              console.log('Vote added to database');
            }, error => {
              // handle error
              console.error('Failed to add vote to database');
            });

            this.realAs2[i].likes++;
            this.answers[i].likes++;
            this.updateAnswer(this.realAs2[i]).subscribe(result => {
              // handle success
              console.log('LikesA updated to database');
              //this.disableButtonsD();
            }, error => {
              // handle error
              console.error('Failed to update LikesA to database');
            });
          }
        })


      }
    }



  }

  dislikeAns(idA: number) {
    for(let i = 0; i < this.realAs2.length; i++){
      if(this.realAs2[i].content_id == idA) {
         console.log("the current answer:")
         console.log(this.realAs2[i])
        let canVote = true;
        let newId = 0;
        this.getVotes().subscribe(data =>{
          this.allVotes = data;
          console.log(this.allVotes)
          newId = this.allVotes[this.allVotes.length - 1].id + 1;
          for(let j = 0; j < this.allVotes.length; j++){
            // @ts-ignore
            if(this.allVotes[j].user_id == Global.activeUser.userId && this.allVotes[j].content_id == this.realAs2[i].content_id)
              canVote = false;

          }
          if(canVote) {
            // @ts-ignore
            const vote = new Vote(newId,Global.activeUser.userId,this.realAs2[i].content_id,0)
            console.log(vote)
            this.insertVote(vote).subscribe(result => {
              // handle success
              console.log('Vote added to database');
            }, error => {
              // handle error
              console.error('Failed to add vote to database');
            });

            this.realAs2[i].dislikes++;
            this.answers[i].dislikes++;
            this.updateAnswer(this.realAs2[i]).subscribe(result => {
              // handle success
              console.log('DislikesA updated to database');
              //this.disableButtonsD();
            }, error => {
              // handle error
              console.error('Failed to update dislikesA to database');
            });
          }
        })


      }
    }
  }


  async ngOnInit() {
    Global.activeUser = this.authService.activeUser;
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      const id = +params.get('id');


    this.getQuestions().subscribe((data:any) => {

      console.log("real Q is ANS: \n")
      console.log(data)
      this.realQs = data





      this.getUsers().subscribe(async (data1: any) => {


        console.log(data1)
        this.users = data1

        let authorString = this.users[this.realQs[id - 1].author_cnp - 1].lastName + " " + this.users[this.realQs[id - 1].author_cnp - 1].firstName;
        await this.getScore(authorString, this.realQs[id - 1].content_id)
        this.actualQ = {
          id: this.realQs[id - 1].content_id,
          title: this.realQs[id - 1].title,
          text: this.realQs[id - 1].text_content,
          image: this.realQs[id - 1].picture,
          tag: this.realQs[id - 1].tag,
          author: authorString,
          date: this.realQs[id - 1].creation_date_time.substring(0, 10)
        }

        this.likes = this.realQs[id - 1].likes;
        this.dislikes = this.realQs[id - 1].dislikes;

        this.getAnswers().subscribe(async (data2: any) => {
          console.log("REAL AS : \n")
          this.realAs = data2
          console.log(this.realAs)

          for (let i = 0; i < this.realAs.length; i++) {
            let authorString = this.users[this.realAs[i].author_cnp - 1].lastName + " " + this.users[this.realAs[i].author_cnp - 1].firstName;
            await this.getScore(authorString, this.realAs[i].content_id)
            console.log(this.realAs[i])
            if (this.realAs[i].question_id == this.realQs[id - 1].content_id) {
              this.answers.push({
                content_id: this.realAs[i].content_id,
                text: this.realAs[i].text_content,
                image: this.realAs[i].picture,
                author: authorString,
                date: this.realAs[i].creation_date_time.substring(0, 10),
                likes: this.realAs[i].likes,
                dislikes: this.realAs[i].dislikes
              })
              this.realAs2.push(this.realAs[i])
            }
          }
          console.log("see active user ans:")
          // @ts-ignore
          console.log(Global.activeUser.firstName)
        })

      })

    })



    });

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
  getAnswers(){
    return this.http.get<any>('http://localhost:8080/answers/getAll')
  }
  updateQuestion(question:Question){
    return this.http.put<any>('http://localhost:8080/questions/updateQuestion', question)
  }
  updateAnswer(answer:Answer){
    return this.http.put<any>('http://localhost:8080/answers/updateAnswer', answer)
  }

  getVotes(){
    return this.http.get<any>('http://localhost:8080/votes/getAll')
  }
  insertVote(vote:Vote){
    return this.http.post<any>('http://localhost:8080/votes/insertVote', vote)
  }

}
