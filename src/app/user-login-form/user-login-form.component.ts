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
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
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
