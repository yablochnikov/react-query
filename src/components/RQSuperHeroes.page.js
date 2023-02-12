import {useQuery} from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

export const RQSuperHeroesPage = () => {
  const { isLoading, isFetching, data, error, isError, refetch } = useQuery('super-heroes', fetchSuperHeroes,{
      enabled: false,
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
          {data && data.data.map(hero => {
              return <div key={hero.id}>{hero.name}</div>
          })}
      </>
  )
}
