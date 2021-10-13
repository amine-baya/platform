import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {listSessions, updateSessions } from '../../actions/sessionActions'
import {listCourses,listCourseDetails } from '../../actions/courseActions'
import Message from '../../components/Message'
import "./affectation.css"



const AffectationScreen = ({history}) => {
    const [session, setSession] = useState('')
    const [course, setCourse] = useState([])

    const [courseName, setCourseName] = useState([])
    const [courseNameValue, setCourseNameValue] = useState([])
    const [message, setmessage] = useState(null)
    const [vl, setVl] = useState(false)  


    const dispatch = useDispatch()

    const updateSession = useSelector((state) => state.updateSession)
    const { 
      loading: loadingUpdate,
      error: errorUpdate,
      updateS } = updateSession   

    const sessionList = useSelector((state) => state.sessionList)
    const { loading, error, sessions} = sessionList

    const courseDetails = useSelector((state) => state.courseDetails)
    const { loading : loadingCourse, 
            error   : errorCourse,
            course : courseDet 

          } = courseDetails


    const courseList = useSelector((state) => state.courseList)
    const { loading : loadingCourses, 
            error   : errorCourses,
            courses : coursesList 

          } = courseList 


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin 

    useEffect(() => {
    
      dispatch(listCourses())  
       
      dispatch(listSessions()) 
      setVl(true)
    
    
      }, [dispatch])

  const courseNames = [...new Set(courseName)]

  const courseValue = [...new Set(course)]

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(updateSessions(session, courseValue)) 

    setCourseNameValue([...courseNames])
    
    setTimeout(() => {
      setmessage("bien")
      
    }, 1000);

     setTimeout(() => {
      setmessage(null)
      
    }, 4000);

    
  }


  const courseHandler = (e) => {
    
    setCourse([...course ,e.target.value])

    const names = coursesList.find(el => el._id === e.target.value)

    setCourseName([...courseName, names.name])

    
  }  

      

  

    return (
        <div>

          <div className="notice" >
            <h5>Bonjour Monsieur <span>Atef Bouhlel</span></h5>
            <p>
               Pour faire l'affectation entre une session et une/des formation/s : <br />
                + vous devez choisir la session dans la barre de sélection à gauche. <br />
                + vous devez choisir la/les formation/s dans la barre de sélection à droite. <br />
                + cliquez sur le bouton "update"
            </p>
            <p>
                <span>Note : </span>
                vous pouvez choisir plus qu'une formation.
            </p>
        </div>

              <form className='form_affectation ' onSubmit={submitHandler}>
                <h1 className='text-center affectation_title'>affectation</h1>
                <div className="affectation" >
                    <div className='form_input affectation_part_one'>
      
                        <select onChange={(e) => setSession(e.target.value)}>
                          <option  value="">select session .....</option> 
                          {sessions.map((session) => 
                          <option key={session._id} value={session._id} >{session.name}</option> 

                          )  
                          } 
                        </select>
                        <div className="show_affectation_part_one"> {session && sessions.find(el => el._id === session).name} </div>
                    </div>




                    <div className='form_input affectation_part_two'>
          
                        <select  onChange={(e) => courseHandler(e)}>

                          <option  value="">select formations .....</option> 

                            {coursesList.map((course) =>  
                              
                              <option key={course._id} value={course._id} >{course.name}</option> 
                              
                              )  
                            }
                            
                        </select>

                        <div className="show_affectation_part_two"> {courseNames.map(el => (<div>{el}</div>))}  </div>
                    </div>


                </div>
                <button type='submit'>update</button>
            </form>
            <div className="show_affectation_result">

              

                { errorUpdate ? <Message showw= {vl} variant='danger'>{errorUpdate}</Message> : message && <Message variant='success'>{message}</Message> }
              <h3> {updateS && updateS.name}</h3>
              <div>{updateS && courseNameValue.map(el => (<div>{el}</div>))}</div>
              
              
                  

            </div>
        </div>
    )
}

export default AffectationScreen






