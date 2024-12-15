import { Component } from '@angular/core';
import {
  AddToFavoritesService,
  GetAllMoviesService,
  GetUserDataService,
  RemoveFromFavoritesService,
} from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { MovieDialogComponent } from '../movie-dialog/movie-dialog.component';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: string[] = []; // Store IDs of favorited movies

  constructor(
    public fetchApiData: GetAllMoviesService,
    public getUserDataService: GetUserDataService,
    public addToFavoritesService: AddToFavoritesService,
    public removeFromFavoritesService: RemoveFromFavoritesService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies(); // Fetch favorites on initialization
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  openDialog(type: string, data: any): void {
    console.log('Dialog Type:', type);
    console.log('Dialog Data:', data);
    this.dialog.open(MovieDialogComponent, {
      data: { type, data },
      width: '400px',
    });
  }

  getFavoriteMovies(): void {
    this.getUserDataService.getUserData().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies || [];
      console.log('Favorite Movies:', this.favoriteMovies);
    });
  }

  isFavorite(movie: any): boolean {
    return this.favoriteMovies.includes(movie._id);
  }

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie)) {
      // Remove from favorites
      this.removeFromFavoritesService.removeFromFavorites(movie._id).subscribe(
        () => {
          console.log(`${movie.Title} removed from favorites.`);
          this.favoriteMovies = this.favoriteMovies.filter(
            (id) => id !== movie._id
          ); // Update UI
          // Show a snackbar notification
          this.snackBar.open(`${movie.Title} removed from favorites.`, 'OK', {
            duration: 3000,
          });
        },
        (error) => {
          console.error(`Error removing ${movie.Title} from favorites:`, error);
          this.snackBar.open(
            `Could not remove ${movie.Title} from favorites.`,
            'OK',
            {
              duration: 3000,
            }
          );
        }
      );
    } else {
      // Add to favorites
      this.addToFavoritesService.addToFavorites(movie._id).subscribe(
        () => {
          console.log(`${movie.Title} added to favorites.`);
          this.favoriteMovies.push(movie._id); // Update UI
          // Show a snackbar notification
          this.snackBar.open(`${movie.Title} added to favorites.`, 'OK', {
            duration: 3000,
          });
        },
        (error) => {
          console.error(`Error adding ${movie.Title} to favorites:`, error);
          this.snackBar.open(
            `Could not add ${movie.Title} to favorites.`,
            'OK',
            {
              duration: 3000,
            }
          );
        }
      );
    }
  }
}
