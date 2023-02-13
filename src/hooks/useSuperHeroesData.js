import React from 'react';
import {useQuery} from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const useSuperHeroesData = ({onSuccessfulFetch, onFailedFetch, isEnabled}) => {
    console.log(isEnabled)
    return useQuery('super-heroes', fetchSuperHeroes,{
        onSuccess: onSuccessfulFetch,
        onError: onFailedFetch,
        enabled: isEnabled ? isEnabled : false,
        select: (data) => {
            return data.data.map(hero => hero.name)
        }
    })
};

export default useSuperHeroesData;
