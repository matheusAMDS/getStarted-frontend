import React from "react"
import { Link } from "react-router-dom"

export default function JobCard({ job, children }) {
  return (
    <div className="shadow-md w-full bg-white my-4 p-4 rounded">
      <Link to={`/jobs/job/${job._id}`}>
        <h1 className="text-2xl font-semibold">{job.title}</h1>
      </Link>
      
      <Link to={`/company/profile/${job.by_company._id}`} className="text-gray-700 font-semibold">
        por {job.by_company.name}
      </Link>
      
      <div className="flex justify-between">
        { !job.is_remote
          ? <p className="font-semibold">
              {job.by_company.address}, {job.by_company.city} - {job.by_company.uf}
            </p>
          : <p className="font-semibold">Remoto</p>
        }
        
        <p className="font-semibold">
          {job.salary.toLocaleString("en", { 
            style: "currency", currency: "BRL"
          })}
        </p>
      </div>
      
      <p className="mt-2 flex flex-wrap">
        {job.requirements.map(req => (
          <Link to={`/jobs?tech=${req}`} key={req}>
            <span 
              className="px-1 mr-1 border-solid border-green-400 border-2 rounded text-green-400 font-semibold hover:bg-green-400 hover:text-white cursor-pointer"
            >
              {req}
            </span>
          </Link>
        ))}
      </p>

      {children}
    </div>
  )
}