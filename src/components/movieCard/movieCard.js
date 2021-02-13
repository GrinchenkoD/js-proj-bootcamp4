import movieCard from '../../templates/movieCard.hbs';
const mainRef = document.querySelector('main');
let id = [];
export function apiMovieCard(movieId) {
  id = movieId;
  console.log(id);
  const keyApi = '65999cd4dc4e9b42ad69f2cfa64d7f94';
  const baseUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${keyApi}&language=en-US`;
  return fetch(baseUrl)
  .then(res => res.json())
  .then(movieCardMurkup)
  .catch(err => console.log(err));
}

function movieCardMurkup(data) {
  mainRef.innerHTML = movieCard(data);
  const watched = document.querySelector('.js-watched');
  const queue = document.querySelector('.js-queue');
  watched.addEventListener('click', addIntoWatched);
  queue.addEventListener('click', addIntoQueue);
  const index = id;
  const movieWatched = getWatched();
  const movieQueue = getQueue();
  for (let item of movieWatched) {
    if (index === item) {
      watched.innerHTML = 'Added to Watched';
      watched.classList.add('js-clicked');
    }
  }
  for (let item of movieQueue) {
    if (index === item) {
      queue.innerHTML = 'Added to Queue';
      queue.classList.add('js-clicked');
    }
  }
}

function addIntoWatched(e) {
  let getWatchedMovie = putWatched();
  const btn = e.target;
  btn.innerHTML = (btn.innerHTML === 'Added to Watched') ? btn.innerHTML = 'Add to Watched' : btn.innerHTML = 'Added to Watched';
  (btn.classList.contains('js-clicked')) ? btn.classList.remove('js-clicked') : btn.classList.add('js-clicked');
  localStorage.setItem('WatchedId', JSON.stringify(getWatchedMovie.movie));
}
function addIntoQueue(e) {
  let getQueueMovie = putQueue();
  const btn = e.target;
  btn.innerHTML = (btn.innerHTML === 'Added to Queue') ? btn.innerHTML = 'Add to Queue' : btn.innerHTML = 'Added to Queue';
  (btn.classList.contains('js-clicked')) ? btn.classList.remove('js-clicked') : btn.classList.add('js-clicked');
  localStorage.setItem('QueueId', JSON.stringify(getQueueMovie.movie));
}
function getQueue() {
  const movieStorage = localStorage.getItem('QueueId');
  if (movieStorage !== null) {
    return JSON.parse(movieStorage);
  }
  return [];
}
function getWatched() {
  const movieStorage = localStorage.getItem('WatchedId');
  if (movieStorage !== null) {
    return JSON.parse(movieStorage);
  }
  return [];
}
function putWatched() {
  let movie = getWatched();
  let pushMovie = false;
  const index = movie.indexOf(id);
  if(index === -1) {
    movie.push(id);
    pushMovie = true;
  }else{
    movie.splice(index, 1);
  }
  return {movie, pushMovie }
}
function putQueue() {
  let movie = getQueue();
  let pushMovie = false;
  const index = movie.indexOf(id);
  if(index === -1) {
    movie.push(id);
    pushMovie = true;
  }else{
    movie.splice(index, 1);
  }
  return {movie, pushMovie }
}