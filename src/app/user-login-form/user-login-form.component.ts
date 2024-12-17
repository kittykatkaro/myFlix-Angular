import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
  standalone: false, // ensure the dialog is not standalone
})

/**
 * Component for the user login form.
 * It provides a form for the user to enter their username and password.
 */
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Logs in the user by calling the userLogin method from fetchApiData service.
   * On successful login, stores the user data and token in localStorage, closes the dialog,
   * shows a success message, and navigates to the movies page.
   * If login fails, shows an error message.
   *
   * @returns {void}
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Store the user data and token in localStorage
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);

        // Close the dialog
        this.dialogRef.close();

        // Show a success message
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000,
        });

        // Navigate to the movies page
        this.router.navigate(['movies']);
      },
      (error) => {
        // Show an error message if login fails
        this.snackBar.open('Login failed: ' + error.error.message, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
