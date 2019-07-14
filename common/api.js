export const clientId = '6';
export const clientSecret = 'pVJ4Nbc8G4gnKLKLAHqG4FKo5GriZV1qTzI7juRz';

export const site = 'http://localhost:8000';

export const base = site + '/api/v1/';

export const urls = {
  // AUTH
  token: site + '/oauth/token',
  register: base + 'auth/register',
  checkUsername: base + 'auth/check/username',
  checkEmail: base + 'auth/check/email',
  login: base + 'auth/login',

  // USER
  getUser: base + 'user',

  // USER PROFILE
  profile: base + 'profile',
  myFilms: base + 'profile/myFilms/',
  profileEdit: base + 'profile/update',
  subscribeMyFilms: base + 'profile/subscribe/',
  unsubscribeMyFilms: base + 'profile/unsubscribe/',

  // LIKES
  likeFilm: base + 'like/1/film/',
  dislikeFilm: base + 'like/0/film/',
  likeComment: base + 'like/1/comment/',
  dislikeComment: base + 'like/0/comment/',

  // TOP
  top: base + 'top/',

  // COMMENTS
  comments: base + 'comments/',
  getFilmComments: base + 'comments/film_id/',
  getParentComments: base + 'comments/parent_id/',
  getUserComments: base + 'comments/userComments/',

  // PLAYLISTS
  getPlaylistsByUser: base + 'playlists/user/',
  getPlaylistsById: base + 'playlists/playlist/',

  // CONTENT
  getMain: base + 'main',
  getCategories: base + 'categories',

  // FILMS
  getFilms: base + 'films',
  getFilmsById: base + 'films/id/',
  getFilmsByCategory: base + 'films/category_id/',
  getFilmsByTag: base + 'films/tag_id/',
  getFilmsByHover: base + 'films/hover_id/',
  getFilmsRecommend: base + 'films/recommend/',

  // SEARCH
  search: base + 'search/',


  getNews: base + 'news',
  getComments: base + 'comments',
  getTags: base + 'tags',
  getTop: base + 'top',
}
