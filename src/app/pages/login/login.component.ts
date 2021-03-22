/**
 * Title: login.component.ts
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: main component for login
 */


import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
   //passes these prebuilt library objects to be initialized with the component and used for login features
  constructor(private fb: FormBuilder, private router: Router, private cookieService: CookieService, private http: HttpClient, private snackBar: MatSnackBar ) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({  //enforces only numerical entries
        empId: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])]
    });
  }

  login() {  //login function to be called when submitting on the login page and defines the get HTTP to be used when calling the server
      const empId = this.loginForm.controls["empId"].value;

      this.http.get("/api/employees/" + empId).subscribe(res => {
        if (res["data"]) {
           this.cookieService.set("session_user", empId, 1);
           this.router.navigate(["/"]);
        }
        else if (!(res['data']) && (res['httpCode'] === '200'))
        {
          this.openSnackBar('Invalid employeeId, please try again', 'WARNING');
        }
        else
        {
          this.openSnackBar(res['message'], 'ERROR');
        }

    })
  }

  openSnackBar(message: string, notificationType: string) : void
  {
    this.snackBar.open(message, notificationType, {
      duration: 3000,
      verticalPosition: 'top'
    })
  }
  }
