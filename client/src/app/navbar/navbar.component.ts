import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public loggedIn = false;
  constructor(public router: Router, private auth: AngularFireAuth) {
    auth.authState.subscribe(user => (this.loggedIn = user !== null));
  }

  ngOnInit() {}
}
