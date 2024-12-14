import { Component } from '@angular/core';
import {
  AddToFavoritesService,
  GetAllMoviesService,
  GetUserDataService,
  RemoveFromFavoritesService,
} from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies(); // Fetch favorites on initialization
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      // return this.movies;
    });
  }

  // Function to open the dialog when the movie image is clicked
  openDialog(type: string, data: any): void {
    console.log('Dialog Type:', type); // Debugging: Check the type
    console.log('Dialog Data:', data); // Debugging: Check the data being passed
    this.dialog.open(MovieDialogComponent, {
      data: { type, data },
      width: '400px',
    });
  }

  // Fetch the user's favorite movies
  getFavoriteMovies(): void {
    this.getUserDataService.getUserData().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies || [];
      console.log('Favorite Movies:', this.favoriteMovies);
    });
  }

  // Check if a movie is in the favorites list
  isFavorite(movie: any): boolean {
    return this.favoriteMovies.includes(movie._id);
  }

  // Add or remove a movie from favorites
  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie)) {
      this.removeFromFavoritesService
        .removeFromFavorites(movie._id)
        .subscribe(() => {
          console.log(`${movie.Title} removed from favorites.`);
          this.favoriteMovies = this.favoriteMovies.filter(
            (id) => id !== movie._id
          ); // Update UI
        });
    } else {
      this.addToFavoritesService.addToFavorites(movie._id).subscribe(() => {
        console.log(`${movie.Title} added to favorites.`);
        this.favoriteMovies.push(movie._id); // Update UI
      });
    }
  }
}
