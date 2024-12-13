import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  GetUserDataService,
  EditUserService,
  DeleteUserService,
} from '../fetch-api-data.service';

@Component({
  selector: 'app-profile-view',
  standalone: false,
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  userData: any = {};
  editForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private getUserDataService: GetUserDataService,
    private editUserService: EditUserService,
    private formBuilder: FormBuilder,
    private deleteUserService: DeleteUserService
  ) {
    this.editForm = this.formBuilder.group({
      Username: [''],
      Password: [''],
      Email: [''],
      Birthday: [''],
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.getUserDataService.getUserData().subscribe((resp: any) => {
      this.userData = resp;
      console.log(this.userData);
      this.editForm.patchValue({
        Username: this.userData.Username,
        Email: this.userData.Email,
        Birthday: this.userData.Birthday,
      });
    });
  }

  enableEdit(): void {
    this.isEditing = true;
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      this.editUserService
        .editUser(this.editForm.value)
        .subscribe((resp: any) => {
          console.log(resp);
          this.isEditing = false;
          this.getUserData();
        });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editForm.patchValue({
      Username: this.userData.Username,
      Email: this.userData.Email,
      Birthday: this.userData.Birthday,
    });
  }

  // Trigger confirmation for profile deletion
  confirmDelete(): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete your profile? This action is irreversible.'
    );
    if (confirmDelete) {
      this.deleteProfile();
    }
  }

  // Perform the actual deletion of the user profile
  deleteProfile(): void {
    this.deleteUserService.deleteUser().subscribe(
      () => {
        // On successful deletion, clear the user's session data and redirect
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Your profile has been deleted.');
        // Redirect to login or home page after deletion
        window.location.href = '/login'; // Or use your routing mechanism
      },
      (err) => console.error('Error deleting profile', err)
    );
  }
}
