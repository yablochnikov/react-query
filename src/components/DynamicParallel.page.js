import axios from "axios";
import { useQueries } from 'react-query'

const fetchSuperHeroes = async (heroId) => {
    return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

const DynamicParallel = ({ heroIds }) => {
    const queryResults = useQueries(
        heroIds.map(heroId => {
            return {
                queryKey: ['super-hero', heroId],
                queryFn: () => fetchSuperHeroes(heroId)
            }
        })
    )

    console.log({ queryResults })

  return (
    <h2>
      Dynamic Parallel
    </h2>
  );
};

export default DynamicParallel;