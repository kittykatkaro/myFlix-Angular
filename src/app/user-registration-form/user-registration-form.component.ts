import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Import Router for redirection

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.scss',
  standalone: false,
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {}

  // This function is responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result: any) => {
        // Close the dialog
        this.dialogRef.close();

        // Show a success message
        this.snackBar.open('User registration successful!', 'OK', {
          duration: 2000,
        });

        // Navigate to the movies page
        this.router.navigate(['movies']);
      },
      (error: any) => {
        // Show an error message if registration fails
        this.snackBar.open(
          'User registration failed: ' + error.error.message,
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
