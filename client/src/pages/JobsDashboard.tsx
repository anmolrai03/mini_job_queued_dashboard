import { useGetJobs } from "../hooks/useGetJobs"

function JobsDashboard() {
  
  const {loading , data, error} = useGetJobs();

  if(loading) return <h1>Loading......</h1>

  if( error ) return <h2>Error Occured:{error} </h2>

  return (
    <div>
      {
        data.map( ( job) => 
          <div key={job.id}>
            <h1>{job.title}</h1>
            <h2>{job.type}</h2>
            <h2>{job.status}</h2>
          </div>
        )
      }
    </div>
  )
}

export default JobsDashboard