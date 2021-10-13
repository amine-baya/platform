import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {listCourses} from '../../actions/courseActions'
import { Link } from "react-router-dom";
import './ShowCourse.css'


const ShowCourses = () => {
    
    const [cour, setCour] = useState([]) 

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin 

    const courseList = useSelector(state => state.courseList)
    const {  courses} = courseList  

    useEffect(() => {
        
        dispatch(listCourses())
       
    }, [userInfo,dispatch])
    
    let names = []
   courses.map((ell)=>{
       for( let i=0;i<userInfo.session.courses.length;i++){

           if (ell._id === userInfo.session.courses[i]  ){
            names.push(ell)
           }
       }
   }) 
           
       const startDate = userInfo.session.start.substr(0,10)

       const endDate = userInfo.session.end.substr(0,10)

       
    

    return ( 
        <div className='show_course'>
            <h1 className='show_course_h1'>Mes formations</h1>
            <p>Bonjour {userInfo.firstName} {userInfo.lastName},</p>
            <p>Vous avez {userInfo.session.courses.length} {userInfo.session.courses.length > 1 ? "formations" : "formation"} associée </p>
            <div className="my_courses">
                <h6>
                    <span className="my_courseName"> {userInfo.session.name}</span> 
                    <span className="my_courseDate">du {startDate} au {endDate}</span>
                </h6>
                {names.map((el)=> <div >
                     <h4><Link to={`/showCourses/Pdf/${el._id}`}>{el.name}</Link></h4>
                    
                 </div> )}
            </div>
        </div> 
    )
}

export default ShowCourses 
