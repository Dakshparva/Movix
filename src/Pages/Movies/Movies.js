import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination/CustomPagination';
import Genres from '../../components/Genres/Genres';
import useGenres from '../../hooks/useGenre';

const Movies = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const genreforURL = useGenres(selectedGenres);
     console.log(selectedGenres);


    const fetchMovies=async()=>{
        const {data} = await axios.get(`
        https://api.themoviedb.org/3/discover/movie?api_key=29c457724c59b2b03cdc7b2faeb09f27&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&with_genres=${genreforURL}`);
        console.log(data);

        setContent(data.results);
        setNumOfPages(data.total_pages);
    };
   


    useEffect(()=>{
        fetchMovies();
        // eslint-disable-next-line
    },[page, genreforURL])

  return (
    <div>
        <span className='pagetitle'>Movies</span>
    <Genres
    type='movie'
   selectedGenres={selectedGenres}
   genres={genres}
   setSelectedGenres={setSelectedGenres}
   setGenres={setGenres}
   setPage={setPage}

   />
    <div className='trending'>
     {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type="movie"
              vote_average={c.vote_average}
            />
          ))}
    </div>
    {numOfPages>1 &&
    <CustomPagination 
    setPage={setPage} 
    numOfPages={numOfPages}/>
}
    </div>
  );
}

export default Movies;
