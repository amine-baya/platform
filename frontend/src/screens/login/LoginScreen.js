import React, { useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Message from '../../components/Message'


import {login} from '../../actions/userActions.js'  

import './login.css'
 
  

const LoginScreen = ({location, history}) => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('') 
    const [bool1, setbool1] = useState(false)
    const [bool2, setbool2] = useState(false) 
    const [message, setmessage] = useState(null)

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    
    let firstTime = false
    

    const input = useRef(null)

     

    useEffect(() => {
        if (userInfo ) {
            
           
           firstTime = userInfo.isFirstTime

            if (firstTime) {
            history.push('/update')
            
        }else { 

            if(userInfo.type=== "admin"){

                history.push('/register')
            }else{
               
                history.push('/signature')

            }

            
        }
        }

        
    }, [history, userInfo]) 

    const submitHandler = (e) => {
        e.preventDefault()
        let time = 3000

         if(email.trim()=== "") {
        setmessage("sorry you must enter your email")
         setTimeout(() => {
            setmessage(null)
                        }, time);

    } else {
    if( password.trim() === "") {
        setmessage("sorry you must enter your password")
        setTimeout(() => {
            setmessage(null)
                        }, time); 
    
                    }else{
                        
                        dispatch(login(email, password)) 
    }

}
    } 
    
     


    return (<>
       
        <section className='login_section'> 
            
           
                <form className='form' onSubmit={submitHandler}>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                <h1 className='text-center'>bonjour</h1>
               
                <div className='form_input'>
                    <label className={bool1 ? ' on' : 'label'}>Email Address</label>
                    <input
                    id='input'
                    type='email'
                    ref={input}
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    onFocus={() => setbool1(true)}
                    onBlur={(e) => e.target.value.trim() ? setbool1(true) : setbool1(false)}>
                    </input>
                </div>

                <div className='form_input'>
                    <label className={bool2 ? 'on' : 'label'}>Password </label> 
                    <input type='password'
                    value={password}
                    onChange={(e) =>setpassword(e.target.value)}
                    onFocus={() => setbool2(true)}
                    onBlur={(e) => e.target.value.trim() ? setbool2(true) : setbool2(false)}>  
                    </input>
                </div>

                <Button type='submit' variant='primary' className='mr-3 button'>{ loading ?'Chargement...' : 'continuer'  }</Button>
               
            </form>
            
            
            
       
        </section>
    </>)
}

export default LoginScreen
