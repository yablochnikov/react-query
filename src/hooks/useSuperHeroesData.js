import React from 'react';
import {useQuery, useMutation} from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const addSuperHero = (hero) => {
    return axios.post('http://localhost:4000/superheroes', hero)
}

export const useSuperHeroesData = ({onSuccessfulFetch, onFailedFetch, isEnabled}) => {
    console.log(isEnabled)
    return useQuery('super-heroes', fetchSuperHeroes,{
        onSuccess: onSuccessfulFetch,
        onError: onFailedFetch,
        enabled: isEnabled ? isEnabled : false,
        // select: (data) => {
        //     return data.data.map(hero => hero.name)
        // }
    })
};

export const useAddSuperHeroData = () => {
    return useMutation(addSuperHero)
}