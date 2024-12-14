import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  GetUserDataService,
  EditUserService,
  DeleteUserService,
  GetOneMovieService,
  GetAllMoviesService,
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
  favoriteMovies: any[] = []; // Store full movie details
  isLoading: boolean = true; // Track loading state

  constructor(
    private getUserDataService: GetUserDataService,
    private getAllMoviesService: GetAllMoviesService,
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
    // Fetch user data
    this.getUserDataService.getUserData().subscribe((resp: any) => {
      this.userData = resp;
      console.log('User data:', this.userData); // Debug user data
      // Once user data is loaded, fetch and filter favorite movies
      this.loadFavoriteMovies();
    });
  }

  getUserData(): void {
    this.getUserDataService.getUserData().subscribe((resp: any) => {
      this.userData = resp;
      console.log(this.userData);
      console.log('FavoriteMovies (IDs):', this.userData.FavoriteMovies);

      if (this.userData.FavoriteMovies?.length > 0) {
        this.loadFavoriteMovies();
      } else {
        this.isLoading = false; // Set loading to false if no favorite movies
      }

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

  confirmDelete(): void {
    const confirmDelete = confirm(
      'Are you sure you want to delete your profile? This action is irreversible.'
    );
    if (confirmDelete) {
      this.deleteProfile();
    }
  }

  deleteProfile(): void {
    this.deleteUserService.deleteUser().subscribe(
      () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Your profile has been deleted.');
        window.location.href = '/login'; // Redirect to login or home page
      },
      (err) => console.error('Error deleting profile', err)
    );
  }

  loadFavoriteMovies(): void {
    this.getAllMoviesService.getAllMovies().subscribe(
      (movies: any[]) => {
        console.log('All movies:', movies); // Debug all movies fetched
        this.favoriteMovies = movies.filter((movie) =>
          this.userData.FavoriteMovies.includes(movie._id)
        );
        console.log('Filtered favoriteMovies:', this.favoriteMovies); // Debug favorites
        this.isLoading = false; // Loading complete
      },
      (err: any) => {
        console.error('Error fetching all movies:', err);
        this.isLoading = false; // Ensure loading state is false on error
      }
    );
  }
}
