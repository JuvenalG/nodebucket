/**
 * Title: base-layout.component.ts
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: main component for base-layout with import class export
 */


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();

  text: string = "About Us";


  constructor( private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {

  }

  logOut(): void { //logs out user and navigates back to login component
    this.cookieService.set("session_user", "0", 0);
    this.router.navigate(['/session/login']);
  }

  navChange(): void { //navigates user to the page they click on while simultaneously changing the displayed text in the navigation bar
       if( this.text == "About Us")
       {
           this.router.navigate(["about-us"]);
           this.text = 'Tasks';
       }
      else
      {
        this.text = 'About Us';
        this.router.navigate(["/"]);
      }
    }

  }
