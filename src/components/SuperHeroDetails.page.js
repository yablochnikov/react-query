import useSuperHeroData from "../hooks/useSuperHeroData";
import {useParams} from "react-router-dom";

const SuperHeroDetails = () => {
    const {heroId} = useParams()
    const {data, isError, isLoading, error} = useSuperHeroData(heroId)

    if(isLoading) {
        return <h2>Loading...</h2>
    }

    if (isError) {
        return <h2>{error.message}</h2>
    }

    return (
            <div>
                <h2>Super Hero Details</h2>
                <div>{data?.data.name} - {data?.data.alterEgo}</div>
            </div>
    );
};

export default SuperHeroDetails;
