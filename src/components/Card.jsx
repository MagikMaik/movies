import React from "react";
import './Stylesheets/Card.css'
import axios from 'axios'
import { useState, useEffect } from "react";

export default function Movies() {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const imgUrl='https://image.tmdb.org/t/p/w500/'

  const apiKey = process.env.REACT_APP_API_KEY
  const searchEndpoint =`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}`
  const discoverEndpoint =`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`



  const url = searchQuery ? searchEndpoint : discoverEndpoint

  const getMovie= () => {

      axios.get(url,{
        params: {
          query: searchQuery
        }
      }).then((response) => {
        setMovies(response.data.results)
      } )

  };

  useEffect(() => {
    getMovie();
  })


  return (
    <>
    <div className="search">
      <input type="text"
      value={searchQuery}
      placeholder="Search Movie"
      onChange={event =>setSearchQuery(event.target.value)&& console.log(event.target.value)}

      />
    </div>
    {movies.map((movie) =>{
      return (
        <div className="Card">
          <img src={imgUrl+movie.poster_path} alt={movie.name} />
        </div>
      )
    })}
    </>
  )
}
