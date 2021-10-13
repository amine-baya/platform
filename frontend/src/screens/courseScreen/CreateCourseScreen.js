import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button, Col,  Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from '../../components/Message'

import {register} from '../../actions/courseActions'  
import './createCourse.css' 

const CreateCourseScreen = ({location, history}) => {
    const [bool1, setbool1] = useState(false)
    const [bool10, setbool10] = useState(false)
    const [bool2, setbool2] = useState(false)
    const [bool3, setbool3] = useState(false)
    const [name, setName] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [description, setDescription] = useState('')
   
    const [message, setmessage] = useState(null)
    const [message2, setmessage2] = useState(null)

    const [vl, setVl] = useState(false) 



    


    const dispatch = useDispatch()
    const courseRegister = useSelector(state => state.courseRegister)
    const {loading, error, userInfo} = courseRegister

    

     

    useEffect(() => { 
         setVl(true)
       
    }, [dispatch,error])

   
    
        
    const submitHandler = (e) => {
        e.preventDefault()
        const time = 3000

    if(name.trim()=== "") {
        setmessage("sorry you must put the Name")
         setTimeout(() => {
            setmessage(null)
                        }, time);

    } else {
    if( start.trim() === "") {
        setmessage("sorry you must put the start date")
         setTimeout(() => {
            setmessage(null)
                        }, time);
    } else {
            if( end.trim() === "") {
        setmessage("sorry you must put the end date")
         setTimeout(() => {
            setmessage(null)
                        }, time);
    } else {
        if( description.trim() === "") {
        setmessage("sorry you must describe")
         setTimeout(() => {
            setmessage(null)
                        }, time); 
    } else{
                     dispatch(register(name,start ,end, description))
                         

                        
                     setTimeout(() => {
                         setmessage(null)
                         setmessage2(null)
                         setName('')
                         setStart('')
                         setEnd('')
                         setDescription('')
                         setmessage2("good") 
                         
                            
                            
                        }, 2000);

                        
                        
                    }
            
             
        }
        } 
    }
}
    
 

        


    


    return (
        <section className='register_section'>
            <form className='form' onSubmit={submitHandler}>
                <h1 className='text-center'>créer une formation</h1>
               
                {message && <Message variant='danger'>{message}</Message>}
                { error ? <Message showw= {vl} variant='danger'>{error}</Message> : message2 && <Message variant='success'>{message2}</Message> }
                <div className='form_input'>
                    <label className={bool1 ? ' on' : 'label'}>Nom</label>
                    <input type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setbool1(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool1(true) : setbool1(false)}>
                    </input>
                </div>
                  <div className='form_input'>
                    <label className= 'on'>Start</label>
                    <input type='date'
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        onFocus={() => setbool10(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool10(true) : setbool10(false)}>
                    </input>
                </div>

                <div className='form_input'>
                    <label className=  'on'>end</label>
                    <input type='date'
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        onFocus={() => setbool2(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool2(true) : setbool2(false)}>
                    </input>
        
                </div>

                <div className='form_input description_div'>
                    <label className={bool3 ? ' on' : 'label'}>description</label>
                    <textarea
                         type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onFocus={() => setbool3(true)}
                        onBlur={(e) => e.target.value.trim() ? setbool3(true) : setbool3(false)}
                        className="description_create"
                        rows="7"
                    >
                    </textarea>
        
                </div>
                
             

                <Button type='submit' className='button' variant='primary'>{loading ? 'Chargement...' : 'Sing In'}</Button>

                
                
            </form>
            

            
        </section>    
        
    )
}

export default CreateCourseScreen
