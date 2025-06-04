const MovieInputNode = document.querySelector('.input_moviename-js');
const searchMovieBtnNode = document.querySelector('.input_btn-js');
const resultSearchNode = document.querySelector('.section__movielist-js');

let movies = [];
let searchResults = [];

const MOVIE_NOT_FOUND = '❌ Фильм не найден';
const APIKEY = '1155ceb7';


// Поиск фильма при нажатии кнопки
searchMovieBtnNode.addEventListener('click', searchMovies);

// Поиск фильма при нажатии Enter
MovieInputNode.addEventListener('keyup', async function(event) {
    if (event.key === 'Enter') 
        searchMovies();
    
});

// Получаем все фильмы с веденным пользователем названием
async function searchMovies() {
    clearResultSearch();
    checkInputMovie();
    const movie = getMovieNameFromUser()
    isCyrillic(movie);

    if (isCyrillic(movie) === true) {
        alert('Введите название фильма на английском языке!')
    } else {
        try {
    const response = await fetch (`https://www.omdbapi.com/?s=${movie}&apikey=${APIKEY}`)
    if (!response.ok) throw new Error("Ошибка при выполнении запроса");
       
    const MovieData = await response.json()
    console.log(MovieData);
    let movieNotFoundHtml = ''
    if (MovieData.Response === "False") {
        movieNotFoundHtml += `
        <p class = "movienotfound_txt">
            ${MOVIE_NOT_FOUND}
        </p>
        `
        resultSearchNode.innerHTML = movieNotFoundHtml;
    } else {
        searchResults = MovieData.Search; // сохранение результата поиска
        resultSearch(MovieData.Search);
    }
    
    } catch(error) {
        console.error("Ошибка:", error.message);
    }}   
}

// функция добавления результата поиска на страницу
function resultSearch(movies) {
    resultSearchNode.innerHTML = '';
    let listMoviesHtml = '';
    movies.forEach((movie, index) => {
        listMoviesHtml += `
        <div class="result-js result" data-index="${index}">
            <div class ="movie_poster">
                <img class="poster" src="${movie.Poster}" alt="">
            </div>
            <div class="movie_info">
                <p class="movie_title">${movie.Title}</p>
                <p class="movie_year">${movie.Year}</p>
                <p class="movie_type">${movie.Type}</p>
            </div>
        </div>
        `
        resultSearchNode.innerHTML = listMoviesHtml;
    });
}

// Получаем название фильма от пользователя
function getMovieNameFromUser() {
    const movieName = MovieInputNode.value.trim(); // trim() - удаление лишних пробелов в строке
    return movieName;
}

function checkInputMovie() {
    if (!MovieInputNode.value) return alert('Введите название фильма!');
}

function clearResultSearch() {
    resultSearchNode.innerHTML = '';
}

// Проверка на каком языке введено название фильма

function isCyrillic(str) {
    return /^[а-яё\s]+$/i.test(str);
}

resultSearchNode.addEventListener('click', function(event) {
    const clickedElement = event.target.closest('.result');
    if (clickedElement) {
        const index = parseInt(clickedElement.dataset.index, 10); // Преобразование строки индекса в целое число
        const selectedMovie = searchResults[index]; // Обратите внимание, мы берем фильм из searchResults
        console.log(selectedMovie);
        window.open(`movie%20description/MovieDescription.html?id=${selectedMovie.imdbID}`, '_blank');
    }
});
