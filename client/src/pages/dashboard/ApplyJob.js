import React, { useState } from 'react'
import { FormRow, Alert } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/appContext'


const ApplyJob = () => {
    const { user, showAlert, displayAlert, isLoading, applyJob } = useAppContext()

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [location, setLocation] = useState(user.location)
    const [resume, setResume] = useState(user.lastName)

    const handleSubmit = (e)=>{
        e.preventDefault()
        //remove while testing
        if(!name || !email || !location || !resume){
            displayAlert()
            return
        }
        applyJob({name, email, location, resume})
        console.log('Application Successful!!!');
    }
            //name: name of the state property, value: value of the state property
    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>Profile</h3>
                {showAlert && <Alert />}
                
                <div className="form-center">
                    <FormRow
                        type='file'
                        name='resume'
                        value={resume}
                        id='resume'
                        accept='.pdf, .doc, .docx'
                        handleChange={(e) => setResume(e.target.value)}
                    />
                    <FormRow
                        type='text'
                        name='name'
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                    />
                    <FormRow
                        type='email'
                        name='email'
                        value={email}
                        handleChange={(e) => setEmail(e.target.value)}
                    />
                    <FormRow
                        type='text'
                        name='location'
                        value={location}
                        handleChange={(e) => setLocation(e.target.value)}
                    />
                    <button className='btn btn-block' type='submit' disabled={isLoading}>
                        {isLoading ? 'Please wait...' : 'Save changes' }
                    </button>
                </div>
            </form>
        </Wrapper>
    )
   
}

export default ApplyJob