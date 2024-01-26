import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

export function useSearch() {
    const [search, updateSearch] = useState("")
    const isFirstInput = useRef(true)
  
    useEffect(() => {
      if(isFirstInput){
        isFirstInput.current = search === ""
        return
      }
  
      if(search === ""){
        return
      }
  
      if(search.match(/^\d+$/)){
        return
      }
  
    }, [search])
  
    return {search, updateSearch}
  }