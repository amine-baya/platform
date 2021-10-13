import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {listCourses} from '../../actions/courseActions'
import { Link } from "react-router-dom";
import { listCourseDetails } from '../../actions/courseActions';
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library

// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library


const ShowCourses = ({match}) => {

    const courseDetails = useSelector(state => state.courseDetails)
    const {  course} = courseDetails  

  const defaultLayoutPluginInstance = defaultLayoutPlugin();


    const dispatch = useDispatch()


    useEffect(() => {
       console.log(course, 'hello')

       dispatch(listCourseDetails(match.params.pdf))
       
    }, [match])
    


    return (
        <div>
            <div><h4>View PDF</h4>
      <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        {course.pdfUrl&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={course.pdfUrl}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!course.pdfUrl&&<>No pdf file selected</>}
      </div></div>
        </div> 
    )
}

export default ShowCourses 
