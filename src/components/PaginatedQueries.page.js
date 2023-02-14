import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchColors = async (page) => {
    return axios.get(`http://localhost:4000/colors?_page=${page}&_limit=5`)
}

const PaginatedQueries = () => {
    const [page, setPage] = useState(1)
    const {data, isLoading, isError, error} = useQuery(['colors', page], () => fetchColors(page), {
        keepPreviousData: true,
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
               Paginated Queries
           </h2>
           <div>
               <button disabled={page <= 1} onClick={() => setPage(page => page - 1)}>Previous page</button>
               <button disabled={page >= 5} onClick={() => setPage(page => page + 1)}>Next page</button>
           </div>
            <ul>
                {data?.data.map(color => {
                    return <li key={color.id}>{color.id + 1}. {color.name}</li>
                })}
            </ul>
       </>
    )
}

export default PaginatedQueries
