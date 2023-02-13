import useSuperHeroesData from "../hooks/useSuperHeroesData";

const onSuccessfulFetch = (data) => {
    console.log('Perform side effect on successful fetch', data);
}

const onFailedFetch = (error) => {
    console.log('Perform side effect on failed fetch', error)
}

const SuperHeroesList = ({isEnabled}) => {

    const { isLoading, isError, error, data, isFetching } = useSuperHeroesData({
        onSuccessfulFetch,
        onFailedFetch,
        isEnabled: isEnabled,
    });

    if( isLoading || isFetching ) {
        return  <h2>Loading...</h2>
    }

    if( isError ) {
        return <h2>{error.message}</h2>
    }

    return (
        <>
            {data && data.map(hero => {
                return <div key={hero}>{hero}</div>
            })}
        </>
    )
};

export default SuperHeroesList;