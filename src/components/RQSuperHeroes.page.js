import axios from "axios";
import {useState} from "react";
import SuperHeroesList from "./SuperHeroesList";

export const RQSuperHeroesPage = () => {
    const [isEnabled, setIsEnabled] = useState(false)

  return (
      <>
        <h2>React Query Super Heroes Page</h2>
          <button onClick={() => setIsEnabled(true)}>Fetch</button>
          <SuperHeroesList isEnabled={isEnabled}/>
      </>
  )
}
