import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {User} from "./user";

@Component({
  selector: 'app-user',
  // templateUrl: './user-page.component.html',
  // styleUrls:['./user-page.component.scss']
  templateUrl: './user-profilePage.html',
  styleUrls:['./user-profilePage.css']
})
export class UserPageComponent implements AfterViewInit{

  @Input() _title: string = "Insert user"
  @Input() public _user: User = new User(0,"ln","fn","e","p","pn","pp");
  //@Input() private _email: string = this._user.email;


  // constructor(user: User) {
  //   this._user = user;
  // }

  ngAfterViewInit(): void {

    const email: HTMLElement | null = <HTMLElement>document.getElementById("email");
    const phoneNr: HTMLElement | null = <HTMLElement>document.getElementById("phone");
    const name: HTMLElement | null = <HTMLElement>document.getElementById("name");
    email.innerHTML = this._user.email;
    phoneNr.innerHTML = this._user.phoneNr;
    name.innerHTML = this._user.firstname + " " +this._user.lastName;
  }
}
