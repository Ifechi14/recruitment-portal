import React, { useState } from 'react'
import { FormRow, Alert } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useAppContext } from '../../context/appContext'

const Profile = () => {
    const { user, showAlert, displayAlert, isLoading, updateUser } = useAppContext()

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [location, setLocation] = useState(user.location)
    const [lastName, setLastName] = useState(user.lastName)

    const handleSubmit = (e)=>{
        e.preventDefault()
        //remove while testing
        if(!name || !email || !lastName || !location){
            displayAlert()
            return
        }
        updateUser({name, email, lastName, location})
        console.log('update user');
    }
            //name: name of the state property, value: value of the state property
    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>Profile</h3>
                {showAlert && <Alert />}
                
                <div className="form-center">
                    <FormRow
                        type='text'
                        name='name'
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                    />
                    <FormRow
                        labelText='last name'
                        type='text'
                        name='lastName'
                        value={lastName}
                        handleChange={(e) => setLastName(e.target.value)}
                    />
                    <FormRow
                        type='text'
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

export default Profile