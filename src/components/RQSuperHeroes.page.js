import axios from "axios";
import {useState} from "react";
import SuperHeroesList from "./SuperHeroesList";

export const RQSuperHeroesPage = () => {

  return (
      <>
        <h2>React Query Super Heroes Page</h2>
          <SuperHeroesList />
      </>
  )
}
