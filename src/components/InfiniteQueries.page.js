import { Fragment } from 'react'
import { useQuery, useInfiniteQuery } from 'react-query'
import axios from 'axios'

const fetchColors = async ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:4000/colors?_limit=5&_page=${pageParam}`)
}

const InfiniteQueries = () => {
    const {data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage} = useInfiniteQuery('colors', fetchColors, {
        getNextPageParam: (_lastPage, pages) => {
            if(pages.length < 5) {
                return pages.length+1;
            } else {
                return undefined;
            }
        }
    })

    if(isLoading) {
        return <h2>Loading...</h2>
    }

    if(isError) {
        return  <h2>{error.message}</h2>
    }

    return (
        <>
            <h2>
                Infinite Queries
            </h2>
            <div>
                {data?.pages.map((group, index) => {
                    return(
                        <Fragment key={index}>
                            {group.data.map(color => {
                                return <div key={color.id}>{color.id + 1}. {color.name}</div>
                            })}
                        </Fragment>
                    )
                })}
            </div>
            <button disabled={!hasNextPage} onClick={fetchNextPage}>Load more</button>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
    )
}

export default InfiniteQueries
