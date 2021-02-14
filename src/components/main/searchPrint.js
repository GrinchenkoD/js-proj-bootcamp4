import debounce from "lodash/debounce";
import search from './searchByName.js';
import { insertItems } from '../popularMovies/fetch.js';

const refs = {
  galleryCont: document.querySelector('.film-list'),
  searchForm: document.querySelector('#search-form'),
  input: document.querySelector('.search-form-input'),
};

// function insertItems(film) {
//   const markup = film.results.map(item => filmTpl(item)).join('');
//   refs.galleryCont.innerHTML = markup;
// }

function searchPrint(event) {
  event.preventDefault();
  search.searchFilms(refs.input.value).then(data => insertItems(data));
}

refs.searchForm.addEventListener('submit', searchPrint);
refs.input.addEventListener('input', debounce(searchPrint, 500));