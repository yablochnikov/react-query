import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends')
}

const ParallelQueries = () => {
 const {data: superHeroes, isLoading: superHeroIsLoading, isError: superHeroIsError, error: superHeroError} = useQuery('super-heroes', fetchSuperHeroes)
  const {data: friends,isLoading: friendsIsLoading, isError: friendsIsError, error: friendsError} = useQuery('friends', fetchFriends)

  if(superHeroIsLoading || friendsIsLoading){
    return  <h2>Loading...</h2>
  };

  if(superHeroIsError || friendsIsError){
    return  <h2>{superHeroError.message} {friendsError.message}</h2>
  }

  return (
    <>
      <div>
        ParallelQueries
      </div>
      <div>
        <h2>Super Heroes</h2>
        <ul>
          {superHeroes && superHeroes.data.map(hero => {
            return <li key={hero.name}>{hero.name}</li>
          })}
        </ul>
        <h2>Friends</h2>
        <ul>
          {friends && friends.data.map(friend => {
            return <li key={friend.name}>{friend.name}</li>
          })}
        </ul>
      </div>
    </>
  );
};

export default ParallelQueries;
