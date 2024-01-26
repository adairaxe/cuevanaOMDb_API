/* eslint-disable no-unused-vars */
import { useMemo, useState, useRef } from "react";
import { searchMovies } from "../services/searchMovies";

export function useMovies({search, sorted}){
    const [loading, setLoading] = useState(false)
    const [movies, setMovies ] = useState([])
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)
    console.log(previousSearch)

    const getMovies = useMemo(() => {
         console.log("funcion creada")
        return async ({search}) => {
            if(search === previousSearch.current) return
            try{
                previousSearch.current = search
                setLoading(true)
                setError(null)
                const newMovies = await searchMovies({search})
                setMovies(newMovies)
            } catch (e) {
                setError(e.message)
            } finally {
                setLoading(false)
            }
        }
        
    } , [])

    const sortedMovies = useMemo(() => {
        console.log("sorting")
        return sorted ? [...movies].sort((a,b) => a.title.localeCompare(b.title)) : movies
    } , [sorted, movies])

    console.log(sortedMovies)
    return {movies: sortedMovies, getMovies, loading}
}