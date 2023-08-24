import React, { useState } from 'react';
import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';



const AddJob = () => {
    const {
        user,
        showAlert,
        isApplying,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        clearValues,
        handleChange,
        createJob,
        applyJob
    } = useAppContext();

    const [resume, setResume] = useState(user.resume)

    const handleJobInput = (e) =>{
        const name = e.target.name
        const value= e.target.value
        handleChange({ name, value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(isApplying){
            applyJob()
            return;
        }
        createJob()
    }

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isApplying ? 'apply for job' : 'add job'}</h3>
                {showAlert && <Alert />}
                <div className="form-center">
                    {/* position */}
                    <FormRow 
                        type='text' 
                        name='position' 
                        value={position}
                        handleChange={handleJobInput}
                    />

                    {/* company */}
                    <FormRow 
                        type='text' 
                        name='company' 
                        value={company}
                        handleChange={handleJobInput}
                    />

                    {/* resume */}
                    <FormRow
                        type='file'
                        name='resume'
                        value={resume}
                        id='resume'
                        accept='.pdf, .doc, .docx'
                        handleChange={(e) => setResume(e.target.value)}
                    />

                    {/* location */}
                    <FormRow 
                        type='text' 
                        labelText= 'job location'
                        name='jobLocation' 
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />

                    {/* job type */}
                    <FormRowSelect
                        name='status'
                        value={status}
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />

                    {/* job status */}
                    <FormRowSelect
                        name='jobType'
                        labelText='job type'
                        value={jobType}
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />
                    
                    {/* btn container */}
                    <div className='btn-container'>
                        <button 
                            className='btn btn-block submit-btn'
                            type='submit'
                            onClick={handleSubmit}
                        >
                            submit
                        </button>
                        <button 
                            className='btn btn-block clear-btn'
                            onClick={(e)=>{
                                e.preventDefault()
                                clearValues()
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}


export default AddJob