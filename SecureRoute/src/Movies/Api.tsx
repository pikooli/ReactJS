const API_token = "5d6b9f1e3bb7fc0e14239002ac6f8d75"

export function getFilmsFromApiWithSearchedText (text : string, page : string){
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_token + '&language=fr&query=' + text + "&page=" + page

    return fetch(url)
    .then((res) => res.json())
    .catch((error) => console.error(error))
}

export function getFilmDetailFromApi(id : string){
    const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_token + '&language=fr'
    return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error(err))
}