import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { User } from "../user/user";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../authService";
import { Router } from "@angular/router";
import {md5} from "../../md5";

@Component({
  selector: 'app-user',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    // @ts-ignore
    document.getElementById('signupForm').addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the default form submission

      const firstName = (<HTMLInputElement>document.getElementById('name')).value;
      const lastName = (<HTMLInputElement>document.getElementById('lname')).value;
      const email = (<HTMLInputElement>document.getElementById('email')).value;
      const password = (<HTMLInputElement>document.getElementById('password')).value;
      const password1 = md5(password);


      this.getUsers().subscribe((data1: any) =>{

        const allUsers = data1
        const newId = data1.length + 1;
        const newUser: User = new User(newId,lastName,firstName,email,password1,"","")

        // Call the insertUser function to add the new user
        this.insertUser(newUser).subscribe(
          (response) => {
            console.log("User added successfully", response);
          },
          (error) => {
            console.log("Error adding user", error);
          }
        );



      })

    });
  }

  getUsers() {
    return this.http.get<any>('http://localhost:8080/users/getAll');
  }

  insertUser(user: User) {
    return this.http.post<any>('http://localhost:8080/users/insertUser', user);
  }
}
