import {Component,OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "../authService";
import {User} from "../user/user";
import {BannedUser} from "../home/bannedUser";

@Component({
  selector: 'app-user',
  templateUrl: './showUsers.html',
  styleUrls: ['./showUsers.css']
})
export class ShowUsersComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  users: any[] = [];

  allUsers: any[] = []

  ngOnInit(): void {

    this.getUsers().subscribe((data1: any) => {
      console.log("HERE: \n")
      console.log(data1)
      this.allUsers = data1;

      for(let i = 0; i < this.allUsers.length; i++){
        let name = this.allUsers[i].firstName + " " + this.allUsers[i].lastName;
        let id = this.allUsers[i].userId
        this.users.push({ id,name})
      }


    })
  }

  banUser(idToBan:number){
    this.getBanned().subscribe((data2: any) => {

      console.log("Banned users:", data2)
      const allBanned = data2;
      let canBeBanned = true;
      for(let i = 0; i < allBanned.length;i++){
        if(allBanned[i].user_id == idToBan) canBeBanned =false;
      }
      let actualId = allBanned[allBanned.length - 1].id + 1;
      if(canBeBanned){
        let newBanned = new BannedUser(actualId,idToBan);
        this.insertBanned(newBanned).subscribe(
          (response) => {
            console.log("User banned successfully", response);
          },
          (error) => {
            console.log("Error banning user", error);
          }
        );
      }
    })
  }

  unbanUser(idToBan:number){
    this.getBanned().subscribe((data2: any) => {

      console.log("Banned users:", data2)
      const allBanned = data2;
      let canBeUnBanned = false;
      let idToUnban = 0;
      for(let i = 0; i < allBanned.length;i++){
        if(allBanned[i].user_id == idToBan) {
          canBeUnBanned =true;
          idToUnban = i + 1;
        }
      }
      if(canBeUnBanned){
        console.log(idToUnban)
        this.deleteBannedByID(idToUnban).subscribe(result => {
          // handle success
          //console.log('Question deleted from database');
        }, error => {
          // handle error
          //console.error('Failed to delete question from database');
        });
      }
    })
  }
  getUsers() {
    return this.http.get<any>('http://localhost:8080/users/getAll');
  }
  getBanned() {
    return this.http.get<any>('http://localhost:8080/banned/getAll');
  }
  insertBanned(banned: BannedUser) {
    return this.http.post<any>('http://localhost:8080/banned/insertBanned', banned);
  }
  deleteBannedByID(id : number){
    return this.http.delete<any>('http://localhost:8080/banned/deleteById/' + id)
  }


}
