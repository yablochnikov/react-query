import {useQuery} from "react-query";
import axios from "axios";
import {useState} from "react";

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const addHero = async () => {
    await axios.post('http://localhost:4000/superheroes', { id: 4, name: 'Iron Man', alterEgo: 'Tony Stark'})
}

export const RQSuperHeroesPage = () => {
    const [fetchInterval, setFetchInterval] = useState(3000)
    const onSuccessfulFetch = (data) => {
        console.log('Perform side effect on successful fetch', data);
        data?.data.length === 4 && setFetchInterval(false);
    }

    const onFailedFetch = (error) => {
        console.log('Perform side effect on failed fetch', error)
    }


    const { isLoading, isFetching, data, error, isError, refetch } = useQuery('super-heroes', fetchSuperHeroes,{
        onSuccess: onSuccessfulFetch,
        onError: onFailedFetch,
        refetchInterval: data =>  data?.data.length > 3 ? false : 2000,
  })

  if( isLoading || isFetching ) {
    return  <h2>Loading...</h2>
  }

  if( isError ) {
      return <h2>{error.message}</h2>
  }

  return (
      <>
        <h2>React Query Super Heroes Page</h2>
          <button onClick={refetch}>Fetch heroes</button>
          <button onClick={addHero}>Add hero</button>
          {data && data.data.map(hero => {
              return <div key={hero.id}>{hero.name}</div>
          })}
      </>
  )
}
