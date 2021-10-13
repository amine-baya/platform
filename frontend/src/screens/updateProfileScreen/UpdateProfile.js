import React, { useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Message from '../../components/Message'
import {UpdateUserProfile} from '../../actions/userActions'
import Steps from '../../components/steps/Steps' 

import './updateProfile.css'




const UpdateProfileScreen = ({location, history,match}) => {
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [message, setmessage] = useState('')
    const [message2, setmessage2] = useState('')

    const [bool1, setbool1] = useState(false)
    const [bool2, setbool2] = useState(false) 
   



    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin 

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { userUpdate } = userUpdateProfile






    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [history, userInfo ])


   
    

  

   
    
    const submitHandler = (e) => {
        e.preventDefault()
        
        if (confirmPassword === password) {
            dispatch(UpdateUserProfile(password))
            setmessage2('good')
            setTimeout(() => {
                
                history.push('/signature')

            }, 2000);

             setTimeout(() => {
                
                
            setmessage2('')

            }, 4000);


        } else {
            setmessage('password dont match')
            
        } 

        

    }

    return (
       <>
    <Steps props={match}/>

        <div className="notice" >
            <h5>Bonjour <span>{userInfo.firstName}</span> </h5>
            <p>
               Pour plus de sécurité, il est préférable de changer votre propre mot de passe. <br />
               
            </p>
            
        </div>
       
           <div className='profile_section'> 
         
               <form onSubmit={submitHandler} className='form'>
                    {message2 && <Message variant='success'>{message2}</Message>}
                   {message && <Message variant='danger'>{message}</Message>}
                   <div className='form_input'>
                       <label className={bool1 ? ' on' : 'label'}>password </label>
                       <input type='password'
                       value={password}
                       onChange={(e) =>setpassword(e.target.value)}
                       onFocus={() => setbool1(true)}
                       onBlur={(e) => e.target.value.trim() ? setbool1(true) : setbool1(false)}>
                       </input>
                    </div>

                <div className='form_input'>
                    <label  className={bool2 ? ' on' : 'label'}>Confirm password </label>
                    <input type='password'
                    value={confirmPassword}
                    onChange={(e) =>setconfirmPassword(e.target.value)}
                     onFocus={() => setbool2(true)}
                    onBlur={(e) => e.target.value.trim() ? setbool2(true) : setbool2(false)}>
                    </input>
                </div>
                <Button type='submit' variant='primary' className='mr-3 button'>{ loading ?'Chargement...' : 'continuer'  }</Button>
               </form>
           
       </div>
        
       </>
    )
}

export default UpdateProfileScreen
