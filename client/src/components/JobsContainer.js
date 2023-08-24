import React from 'react'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Job from './Job'
import PageBtnContainer from './PageBtnContainer';
import Wrapper from '../assets/wrappers/JobsContainer'

const JobsContainer = () => {
  const {
    getJobs,
    jobs,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getJobs()
  }, [ page, search, searchStatus, searchType, sort])

    return (
        <Wrapper>
          <h5>
            {totalJobs} job{jobs.length > 1 && 's'} found
          </h5>
          <div className='jobs'>
            {jobs.map((job) => {
              return <Job key={job._id} {...job} />;
            })}
          </div>
          {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
  )
}


export default JobsContainer
