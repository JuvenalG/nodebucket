/**
 * Title: not-found.component.ts
 * Author: Professor Krasso
 * Date: 4 April 2021
 * Modified By: Juvenal Gonzalez
 * Description: main component for not-found
 */


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logIn(): void {  //called in html event to navigate end user back to login component
    this.router.navigate(['/session/login']);
  }

}
