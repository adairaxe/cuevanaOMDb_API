/* eslint-disable react/prop-types */
function Movie({movies}){
    return(
        <ul className="movies">
            {
                movies.map(movie =>
                  (
                    <li className="movie" key={movie.id}>
                        <div className="title-movie">
                            <h3>{movie.title}</h3>
                        </div>
                        <img src={movie.poster}></img>
                        <span>{movie.year}</span>
                    </li>
                  )
                )
            }
        </ul>
    )
}

function WithoutMovie(){
    return (
        <p>Without results</p>
    )
}

export { Movie, WithoutMovie }