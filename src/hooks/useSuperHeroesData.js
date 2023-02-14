import React from 'react';
import {useQuery, useMutation, useQueryClient} from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
    return axios.get('http://localhost:4000/superheroes')
}

const addSuperHero = (hero) => {
    return axios.post('http://localhost:4000/superheroes1', hero)
}

export const useSuperHeroesData = (onSuccess, onError) => {
    return useQuery('super-heroes', fetchSuperHeroes,{
        onSuccess,
        onError,
    })
};

export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient()

    return useMutation(addSuperHero, {
        onMutate: async (newHero) => {
            await queryClient.cancelQueries('super-heroes')

            const previousHeroes = queryClient.getQueryData('super-heroes')

            queryClient.setQueryData('super-heroes', (oldData) => {
                return {
                    ...oldData,
                    data: [...oldData.data, { id: oldData.length + 1, ...newHero}]
                }
            })

           return { previousHeroes }
        },
        onError: (_error, _newHero, rollback) => {
            queryClient.setQueryData('super-heroes', rollback.previousHeroes)
        },
        onSettled: () => {
            queryClient.invalidateQueries('super-heroes')
        },
    })
}