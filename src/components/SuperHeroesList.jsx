import { useSuperHeroesData, useAddSuperHeroData } from "../hooks/useSuperHeroesData";
import {Link} from "react-router-dom";
import { useState } from 'react'

const onSuccess = (data) => {
    console.log('Perform side effect on successful fetch', data)
}

const onError = (error) => {
    console.log('Perform side effect on failed fetch', error)
}



const SuperHeroesList = () => {
    const [name, setName] = useState('')
    const [alterEgo, setAlterEgo] = useState('')

    const { isLoading, isError, error, data, isFetching, refetch } = useSuperHeroesData({
        onSuccess,
        onError,
    });

    const {mutate: addHero, isError: newHeroIsError, error: newHeroError, isLoading: newHeroIsLoading} = useAddSuperHeroData()

    const handleAddHeroClick = () => {
       const hero = {name, alterEgo}
        addHero(hero)
    }

    if( isLoading || isFetching ) {
        return  <h2>Loading...</h2>
    }

    if( isError ) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            <div>
                <input disabled={newHeroIsLoading} type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <input disabled={newHeroIsLoading} type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
                <button disabled={newHeroIsLoading} onClick={handleAddHeroClick}>Add hero</button>
                {newHeroIsLoading ? <h2>Adding...</h2> : null}
                {newHeroIsError ? <h2>{newHeroError.message}</h2> : null}
            </div>
            <button onClick={refetch}>Fetch heroes</button>
            {data && data.data.map(hero => {
                return <div key={hero.id}>
                    <Link to={`/super-hero/${hero.id}`}>
                        {hero.name}
                    </Link>
                </div>})
            }
        </>
    )
};

export default SuperHeroesList;