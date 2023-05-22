import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Global} from "../global";
import {AuthService} from "../authService";

@Component({
  selector: 'app-user',
  templateUrl: './user-profilePage.html',
  styleUrls:['./user-profilePage.css']
})
export class UserPageComponent implements OnInit{


  constructor(private authService: AuthService) {
  }
  activeUser = Global.activeUser; // Retrieve the active user from Global

  // @ts-ignore
  name: string = ""
  // @ts-ignore
  email: string = ""
  ngOnInit(): void {
    // Retrieve the active user from localStorage
    const storedUser = localStorage.getItem('activeUser');
    Global.activeUser = this.authService.activeUser;

    if (storedUser) {
      this.activeUser = JSON.parse(storedUser);
      // @ts-ignore
      this.name = this.activeUser.firstName + ' ' + this.activeUser.lastName;
      // @ts-ignore
      this.email = this.activeUser.email;
    }
  }



}
