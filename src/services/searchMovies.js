export async function searchMovies({search}){
    try{
        const responseMovies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=b517c4e1&s=${search}`)
        const responseJSON = await responseMovies.json()

        const movies = responseJSON.Search
        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster,
            year: movie.Year
        }))
    } catch (e) {
        throw new Error("Error searching for movies")
    }
        
}