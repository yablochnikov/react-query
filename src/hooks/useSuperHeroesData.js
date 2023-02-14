import React from 'react';
import {useQuery, useMutation, useQueryClient} from "react-query";
import { request } from '../utils/axios-utils'

const fetchSuperHeroes = () => {
    return request({ url: '/superheroes' })
}

const addSuperHero = (hero) => {
    return request({url: '/superheroes', method: 'post', data: hero})
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