import { Component } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';
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
  constructor(
    public fetchApiData: GetAllMoviesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
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

  // dummy function to add movie to favorites (to be linked)
  toggleFavorite(movieId: string): void {
    console.log('Added to favorites');
  }
  //check if movie is in favorites (to be linked)#
  isFavorite(movieId: string): boolean {
    return false;
  }
}
