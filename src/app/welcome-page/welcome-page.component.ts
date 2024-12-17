import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';

/**
 * Component representing the welcome page of the application.
 * It provides methods to open dialogs for user registration and login.
 * The user registration dialog is opened when the signup button is clicked.
 * The user login dialog is opened when the login button is clicked.
 */
@Component({
  selector: 'app-welcome-page',
  standalone: false,

  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * Opens the user registration dialog.
   * This function is triggered when the signup button is clicked.
   * The dialog is opened with a width of 280px.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Opens the user login dialog.
   * This function is triggered when the login button is clicked.
   * The dialog is opened with a width of 280px.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
