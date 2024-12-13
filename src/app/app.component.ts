// src/app/app.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false, // ensure that the component is not treated as a standalone component
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public router: Router) {}

  logout(): void {
    // clear local storage
    localStorage.clear();

    //redirect to welcome page
    this.router.navigate(['welcome']);
  }
}
