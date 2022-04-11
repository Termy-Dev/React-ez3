import React, { useEffect, useState } from 'react';
import './App.css';

import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';
import MyCard from './components/MyCard';

import { Characters, RootObject } from './models/Character';



function App() {

  const [characters, setCharacters] = useState([] as Characters[]);
  const [favorites, setFavorites] = useState([] as Characters[] )
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const fakeItem = Array.from(new Array(10))

  const loadData = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    const {results} = await response.json() as RootObject;
    setCharacters(results)
    setLoading(true)
  }

  useEffect(() => {
    setLoading(false);
    setTimeout(loadData, 1000);
  },[page] )

  const nextPage = () => {
    setPage(page + 1);
  }

  const previousPage = () => {
    if(page > 1 ){
      setPage(page - 1 );
    }
  }


  const toggleFavorite = (char: Characters) => {
    const index = favorites.indexOf(char);
    index === -1 ? favorites.push(char) : favorites.splice(index,1);
    setFavorites([...favorites])
  }

 
  return (
    <>
    <h1>You Selected: {favorites.length}  
        {favorites.length <= 1 ? " Favorite" : " Favorites" }
    </h1>

    <div className='btn' >
          <button onClick={previousPage}>Indietro </button>
          <button onClick={nextPage}> Avanti</button>
    </div>

      <Grid container spacing={2}>

        {isLoading ? 
          (characters.map((item) => 
              <Grid item xs={4}>
                <MyCard 
                  key={item.id} 
                  name={item.name} 
                  image={item.image}
                  character={item}
                  toggleFavorite={toggleFavorite}
                  isFavorite={favorites.includes(item)}
                />
              </Grid> 

          )):
          fakeItem.map(item => 
            <Grid item xs={4}>
              <Skeleton variant="rectangular" width={336} height={400} />
              <Skeleton variant="text" />
              <Skeleton variant="circular" width={40} height={40} />
            </Grid>
          )
        }
    </Grid> 
    </>
  );
}

export default App;
