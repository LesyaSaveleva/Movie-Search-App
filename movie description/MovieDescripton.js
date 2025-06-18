const MovieDescriptionSectionNode = document.querySelector('.section-js');

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

const MOVIE_NOT_FOUND = '❌ Фильм не найден';
const MOVIE_YEAR = 'Год';
const MOVIE_RATING = 'Рейтинг';
const MOVIE_RELEASE_DATE = 'Дата выхода';
const MOVIE_DURATION = 'Продолжительность';
const MOVIE_GENRE = 'Жанр';
const MOVIE_DIRECTOR = 'Режиссер';
const MOVIE_SCENARIO = 'Сценарий';
const MOVIE_ACTORS = 'Актеры';
const MOVIE_DESCRIPTION = 'Описание фильма';

const APIKEY = '1155ceb7';

descriptionMovie();

async function descriptionMovie() {

    if (!movieId) {
    alert('Фильм не найден!');
    window.location.href = 'index.html' // Перенаправляем на главную
    return;
}

try {
    const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${APIKEY}`)
    if (!response.ok) throw new Error("Ошибка при выполнении запроса");

    const MovieData = await response.json();
    console.log(MovieData);

    displayMovieData(MovieData);
}
    catch (error) {
        console.error("Ошибка:", error);
    } 
}

function displayMovieData(movie) {
    MovieDescriptionSectionNode.innerHTML = `
        <div class="section__img">
            <img class="poster" src="${movie.Poster}" alt="Постер фильма">
        </div>
        <div class="section__description">
            <h2>${movie.Title}</h2>
            <p class="movie-param"><b>${MOVIE_YEAR}</b>: ${movie.Year}</p>
            <p class="movie-param"><b>${MOVIE_RATING}</b>: ${movie.Rated}</p>
            <p class="movie-param"><b>${MOVIE_RELEASE_DATE}</b>: ${movie.Released}</p>
            <p class="movie-param"><b>${MOVIE_DURATION}</b>: ${movie.Runtime}</p>
            <p class="movie-param"><b>${MOVIE_GENRE}</b>: ${movie.Genre}</p>
            <p class="movie-param"><b>${MOVIE_DIRECTOR}</b>: ${movie.Director}</p>
            <p class="movie-param"><b>${MOVIE_SCENARIO}</b>: ${movie.Writer}</p>
            <p class="movie-param"><b>${MOVIE_ACTORS}</b>: ${movie.Actors}</p>
            <p class="movie-param"><b>${MOVIE_DESCRIPTION}</b>: ${movie.Plot}</p>
        </div>
    `
}

