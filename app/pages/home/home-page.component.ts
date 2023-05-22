import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {AuthService} from "../authService";
import {Global} from "../global";
import {md5} from "../../md5";



@Component({
  selector: 'app-user',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.username;
      const password = md5(this.loginForm.value.password);

      this.getUsers().subscribe((data1: any) => {
        console.log("HERE: \n")
        console.log(data1)
        const allUsers = data1;

        for (let i = 0; i < allUsers.length; i++) {
          if (allUsers[i].password === password && email === allUsers[i].email) {

            this.getBanned().subscribe((data2: any) => {

              console.log("Banned users:", data2)
              const allBanned = data2;

              for(let j = 0; j < allBanned.length; j++){
                if(allBanned[j].user_id == allUsers[i].userId){
                  this.router.navigate(['/banned']);
                  return;
                }
              }
              console.log("Logged:")
              console.log(allUsers[i])
              Global.activeUser = allUsers[i];
              this.authService.activeUser = allUsers[i];
              this.router.navigate(['/questions']); // Route to the desired page
              return;
            })



          }
        }
      });
    }
  }

  getUsers() {
    return this.http.get<any>('http://localhost:8080/users/getAll');
  }
  getBanned() {
    return this.http.get<any>('http://localhost:8080/banned/getAll');
  }
}
