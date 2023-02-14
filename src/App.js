import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import {QueryClientProvider, QueryClient} from "react-query";
import { HomePage } from './components/Home.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { ReactQueryDevtools} from "react-query/devtools";
import SuperHeroDetails from "./components/SuperHeroDetails.page";
import ParallelQueries from "./components/ParallelQueries.page";
import DynamicParallel from "./components/DynamicParallel.page";
import { DependentQueries } from './components/DependentQueries.page'
import PaginatedQueries from './components/PaginatedQueries.page'
import InfiniteQueries from './components/InfiniteQueries.page'

const queryClient = new QueryClient()

function App() {
  return (
      <QueryClientProvider client={queryClient}>
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
            </li>
            <li>
              <Link to='/dynamic-parallel'>Dynamic parallel</Link>
            </li>
            <li>
              <Link to='/rq-super-heroes'>Parallel</Link>
            </li>
            <li>
              <Link to='/dependent-queries'>Dependent queries</Link>
            </li>
            <li>
              <Link to='/paginated-queries'>Paginated queries</Link>
            </li>
            <li>
              <Link to='/infinite-queries'>Infinite queries</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path='/infinite-queries'>
            <InfiniteQueries />
          </Route>
          <Route path='/paginated-queries'>
            <PaginatedQueries />
          </Route>
          <Route path='/dependent-queries'>
            <DependentQueries email="vishwas@example.com"/>
          </Route>
          <Route path='/dynamic-parallel'>
            <DynamicParallel heroIds={[1,3]}/>
          </Route>
          <Route path='/parallel'>
            <ParallelQueries />
          </Route>
          <Route path='/super-hero/:heroId'>
            <SuperHeroDetails />
          </Route>
          <Route path='/super-heroes'>
            <SuperHeroesPage />
          </Route>
          <Route path='/rq-super-heroes'>
            <RQSuperHeroesPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
  )
}

export default App
