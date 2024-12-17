import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  UserRegistrationService,
  UserLoginService,
  GetAllMoviesService,
  GetOneMovieService,
  GetDirectorService,
  GetGenreService,
  GetUserDataService,
  EditUserService,
  AddToFavoritesService,
  RemoveFromFavoritesService,
  DeleteUserService,
} from './fetch-api-data.service';

describe('FetchApiData Services', () => {
  let httpMock: HttpTestingController;

  let userRegistrationService: UserRegistrationService;
  let userLoginService: UserLoginService;
  let getAllMoviesService: GetAllMoviesService;
  let getOneMovieService: GetOneMovieService;
  let getDirectorService: GetDirectorService;
  let getGenreService: GetGenreService;
  let getUserDataService: GetUserDataService;
  let editUserService: EditUserService;
  let addToFavoritesService: AddToFavoritesService;
  let removeFromFavoritesService: RemoveFromFavoritesService;
  let deleteUserService: DeleteUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserRegistrationService,
        UserLoginService,
        GetAllMoviesService,
        GetOneMovieService,
        GetDirectorService,
        GetGenreService,
        GetUserDataService,
        EditUserService,
        AddToFavoritesService,
        RemoveFromFavoritesService,
        DeleteUserService,
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);

    userRegistrationService = TestBed.inject(UserRegistrationService);
    userLoginService = TestBed.inject(UserLoginService);
    getAllMoviesService = TestBed.inject(GetAllMoviesService);
    getOneMovieService = TestBed.inject(GetOneMovieService);
    getDirectorService = TestBed.inject(GetDirectorService);
    getGenreService = TestBed.inject(GetGenreService);
    getUserDataService = TestBed.inject(GetUserDataService);
    editUserService = TestBed.inject(EditUserService);
    addToFavoritesService = TestBed.inject(AddToFavoritesService);
    removeFromFavoritesService = TestBed.inject(RemoveFromFavoritesService);
    deleteUserService = TestBed.inject(DeleteUserService);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  // User Registration Service
  describe('UserRegistrationService', () => {
    it('should register a user', () => {
      const dummyResponse = { message: 'User registered successfully' };
      const userDetails = { username: 'testUser', password: 'testPass' };

      userRegistrationService
        .userRegistration(userDetails)
        .subscribe((response) => {
          expect(response).toEqual(dummyResponse);
        });

      const req = httpMock.expectOne(
        'https://myflix-movie-api.herokuapp.com/users'
      );
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });

  // User Login Service
  describe('UserLoginService', () => {
    it('should log in a user', () => {
      const dummyResponse = { token: 'testToken' };
      const userDetails = { username: 'testUser', password: 'testPass' };

      userLoginService.userLogin(userDetails).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(
        'https://myflix-movie-api.herokuapp.com/login'
      );
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });

  // Get All Movies Service
  describe('GetAllMoviesService', () => {
    it('should fetch all movies', () => {
      const dummyMovies = [{ title: 'Movie1' }, { title: 'Movie2' }];

      getAllMoviesService.getAllMovies().subscribe((movies) => {
        expect(movies).toEqual(dummyMovies);
      });

      const req = httpMock.expectOne(
        'https://myflix-movie-api.herokuapp.com/movies'
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyMovies);
    });
  });

  // Add to Favorites Service
  describe('AddToFavoritesService', () => {
    it('should add a movie to favorites', () => {
      const dummyResponse = { message: 'Movie added to favorites' };
      const movieId = '12345';

      addToFavoritesService.addToFavorites(movieId).subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne(
        `https://myflix-movie-api.herokuapp.com/users/null/movies/12345`
      );
      expect(req.request.method).toBe('POST');
      req.flush(dummyResponse);
    });
  });

  // Remove From Favorites Service
  describe('RemoveFromFavoritesService', () => {
    it('should remove a movie from favorites', () => {
      const dummyResponse = { message: 'Movie removed from favorites' };
      const movieId = '12345';

      removeFromFavoritesService
        .removeFromFavorites(movieId)
        .subscribe((response) => {
          expect(response).toEqual(dummyResponse);
        });

      const req = httpMock.expectOne(
        `https://myflix-movie-api.herokuapp.com/users/null/movies/12345`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(dummyResponse);
    });
  });
});
