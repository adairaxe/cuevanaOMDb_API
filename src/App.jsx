import './App.css'
import { Movie, WithoutMovie } from './components/Movie'
import { useSearch } from './hooks/useSearch'
import { useMovies } from './hooks/useMovies'
import { useCallback, useState } from 'react'
import debounce from 'just-debounce-it'

function App() {
  const { search, updateSearch } = useSearch()
  const [ sorted, setSort ] = useState(false)
  const { movies, getMovies, loading } = useMovies({search, sorted})

  function handleSubmit(event){
    event.preventDefault()
    getMovies({search})
  }

  const debouncedGetMovies = useCallback( 
    debounce(search => {
      getMovies({search})
    }, 2000), [getMovies]
  )

  function handleSort(){
    setSort(!sorted)
  }

  function handleChange(event){
    const newStateInput = event.target.value
    if(newStateInput === " ") return
    updateSearch(newStateInput)
    debouncedGetMovies(newStateInput)
  }

  return(
    <div className='page'>
      <header>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} name='queryMovie' value={search} placeholder='King Kong'></input>
          <input type='checkbox' onChange={handleSort} checked={sorted}></input>
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        {
          loading ? 
          
          <p>Cargando</p> :
           
          movies ? 
          (
           <Movie movies={movies}></Movie>
          ) : 
          (
            <WithoutMovie></WithoutMovie>
          )

        }
      </main>
    </div>
  )
}

export default App
