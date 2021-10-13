import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button, Col,  Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from '../../components/Message'

import {register} from '../../actions/userActions'
import {listSessions } from '../../actions/sessionActions'

import './register.css'

const RegisterScreen = ({location, history}) => { 
    const [bool1, setbool1] = useState(false)
    const [bool10, setbool10] = useState(false)
    const [bool11, setbool11] = useState(false)
    const [bool12, setbool12] = useState(false)
    const [bool2, setbool2] = useState(false)
    const [bool3, setbool3] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setemail] = useState('')
    const [type, setType] = useState('')
    const [session, setSession] = useState('')
    const [startSession, setSatrtSession] = useState('')
    const [endSession, setEndSession] = useState('')
    const [name, setName] = useState('')
    const [password, setpassword] = useState('')
    const [message, setmessage] = useState(null)
    const [message2, setmessage2] = useState(null)
   
    const [vl, setVl] = useState(false) 
    


    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    const sessionList = useSelector((state) => state.sessionList)
    const {  sessions} = sessionList

    

     useEffect(() => {
    
      dispatch(listSessions())  

    setVl(true)
    
  }, [dispatch,error])

    let presence = []

     let startDate = new Date(startSession) 
    let endDate = new Date(endSession)
    let Difference_In_Time =  endDate.getTime() - startDate.getTime()
    let Difference_In_Days =  Difference_In_Time / (1000 * 3600 * 24)

       for (let i = 0; i < (Difference_In_Days + 1) * 2 ; i++  ){
        
        presence.push(false)
        
        
    }

    console.log(presence)
    

    const generatePassword = () => {
        const chars ="0123456789abcdefghijklmonpqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ"
        const passwordLength = 9
        let password = ""

        for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber,randomNumber+1)

        }
        setpassword(password)
        setbool3(true)
    }

    const sessionHandler = (e) => {
    
    setSession(e.target.value)

    const names = sessions.find(el => el._id === e.target.value)

    setName(names.name)
    setSatrtSession(names.start)
    setEndSession(names.end)


    
  }
    
        
    const submitHandler = (e) => {
        e.preventDefault()
        let time = 5000
    if(firstName.trim()=== "") {
        setmessage("sorry you must put the firstName")
         setTimeout(() => {
            setmessage(null)
                        }, time);

    } else {
    if( lastName.trim() === "") {
        setmessage("sorry you must put the lastName")
        setTimeout(() => {
            setmessage(null)
                        }, time);
    } else {
        if( email.trim() === "") {
        setmessage("sorry you must put the email")
        setTimeout(() => {
            setmessage(null)
                        }, time);
    } else {
          if( type.trim() === "") {
        setmessage("sorry you must select the type")
        setTimeout(() => {
            setmessage(null)
                        }, time);
    } else {
          if( session.trim() === "") {
        setmessage("sorry you must select the session")
        setTimeout(() => {
            setmessage(null)
                        }, time);
    } else {

        if(password.trim() === ""){
            setmessage("soory you must put the password")
            setTimeout(() => {
            setmessage(null)
                        }, time);
        }else{
            if(password.length < 4 ) {
            setmessage("your password must be between 4 and 10")
            setTimeout(() => {
            setmessage(null)
                        }, time);
        }else{
            if(password.length > 10) {
                setmessage("your password must be between 4 and 10")
                setTimeout(() => {
                    setmessage(null)
                        }, time);
            } 
                  else{
                        dispatch(register(firstName,lastName ,email, type,session,presence,password))  
                            

                            setTimeout(() => {
                            setmessage(null)
                            setFirstName('')
                            setLastName('')
                            setemail('')
                            setType('')
                            setSession('')
                            setName('') 
                            setpassword('')
                            setbool1(false)
                            setbool10(false)
                            setbool11(false)
                            setbool12(false)
                            setbool2(false)
                            setbool3(false)
                            setmessage2("good")
                        }, 2000);
                        
                        setTimeout(() => {
                            
                            setmessage2(null)
                        }, 4000);
                        
                    
                  }
                }     
          }
        } 
       }
      }
    }
}
    }
    


    return (
        <section className='register_section'>

            


            <form className='form' onSubmit={submitHandler}>
                <h1 className='text-center'>créer un compte</h1>
                
                {message && <Message variant='danger'>{message}</Message>} 
                {error ? <Message showw= {vl} variant='danger'>{error}</Message> : message2 && <Message variant='success'>{message2}</Message>}
                <div className='form_input'>
                    <label className={bool1 ? ' on' : 'label'}>Nom</label>
                    <input type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onFocus={() => setbool1(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool1(true) : setbool1(false)}>
                    </input>
                </div>
                  <div className='form_input'>
                    <label className={bool10 ? ' on' : 'label'}>Prénom</label>
                    <input type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onFocus={() => setbool10(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool10(true) : setbool10(false)}>
                    </input>
                </div>

                <div className='form_input'>
                    <label className={bool2 ? ' on' : 'label'}>email Address</label>
                    <input type='email'
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        onFocus={() => setbool2(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool2(true) : setbool2(false)}>
                    </input>
                </div>

                 <div className='form_input'>
                    <label className={bool11 ? ' on' : 'label'}>Type</label>
                    <input type='text'
                        value={type}
                        
                        onFocus={() => setbool11(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool11(true) : setbool11(false)}>
                    </input>

                     <div className='form_input_type'>
                   
                    <select onChange={(e) => setType(e.target.value) }
                     onFocus={() => setbool11(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool11(true) : setbool11(false)}>
                        <option value="stagiaire" >choose.....</option>
                        <option value="stagiaire" >stagiaire</option>
                        <option value="formateur" >formateur</option>
                       

                    </select>
                </div>
                </div>

                 <div className='form_input'>
                    <label className={bool12 ? ' on' : 'label'}>session</label>
                    <input type='text'
                        value={name}
                        
                        onFocus={() => setbool12(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool12(true) : setbool12(false)}>
                    </input>

                     <div className='form_input_type'>
                   
                    <select onChange={(e) => sessionHandler(e) }
                        onFocus={() => setbool12(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool12(true) : setbool12(false)}>
                        <option value="" >choose.....</option>

                       {sessions.map((session) => 
                           
                          <option key={session._id} value={session._id} >{session.name}</option> 
 
                          )  
                          } 
                        
                        

                    </select>
                </div>
                </div>

                 

                 

                <div className='form_input'>
                    <label className={bool3 ? ' on' : 'label'}>password</label>
                    <input type='text'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        onFocus={() => setbool3(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool3(true) : setbool3(false)}>
                    </input>
        <button className="generate_password_button" type="button" onClick={generatePassword} >generate</button>
                </div>
                
             

                <Button type='submit' className='button' variant='primary'>{loading ? 'Chargement...' : 'Sing In'}</Button>

            </form>
            

            
        </section>    
        
    )
}

export default RegisterScreen
