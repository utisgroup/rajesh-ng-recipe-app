import { OnInit, Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements OnInit{

  token: string;

  constructor(private router: Router){}

  ngOnInit(){}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(
      error => console.log(error)
    );
  }  //End of signupUser

  signinUser(email: string, password: string) {

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      response =>  {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
        .then(
          (token: string) => this.token = token
        );
      }
    )
    .catch(
      error => console.log(error)
    );
  } //End of signinUser

  getToken() {
     firebase.auth().currentUser.getIdToken()
     .then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  signout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
