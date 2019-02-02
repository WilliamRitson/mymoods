import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public printUser(user: any) {
    console.log(user);
  }

  public printError(error: any) {
    console.error(error);
  }
}
