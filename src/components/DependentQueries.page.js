import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserByEmail = async (email) => {
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = async (channelId) => {
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQueries =({email}) => {
    const {data: user} = useQuery(['user', email], () => fetchUserByEmail(email));
    const channelId = user?.data.channelId;

    const {data: courses} =useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
        enabled: !!channelId,
    })

    return (
     <>
         <h2>
             Dependent Queries
         </h2>
         {courses?.data.courses.map(course => {
             return <div key={course}>
                 {course}
             </div>
         })}

     </>

    )
}