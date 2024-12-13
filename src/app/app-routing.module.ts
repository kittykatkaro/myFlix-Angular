import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from './profile-view/profile-view.component';
// import { HomeComponent } from './home/home.component';
// import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileViewComponent },
  // { path: 'movies', component: MoviesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
