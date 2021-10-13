import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {listCourses, uploadPdf } from '../../actions/courseActions'
import Message from '../../components/Message'

import './pdfupload.css'

// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

export const PdfUpload = () => {

    const [message, setmessage] = useState(null)
    const [vl, setVl] = useState(false)


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin   

    const courseList = useSelector((state) => state.courseList)
    const { loading : loadingCourses, 
            error   : errorCourses,
            courses: coursesList 

          } = courseList  


          const uploadPdfCourse = useSelector((state) => state.uploadPdfCourse)
          const { loading, error ,courses } = uploadPdfCourse 

          

    const [courseName, setCourseName] = useState('')

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // for onchange event
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');
 useEffect(() => {

      dispatch(listCourses())  
    setVl(true)
    
  }, [dispatch,error])
  // onchange event
  const fileType=['application/pdf'];
  const handlePdfFileChange=(e)=>{
    let selectedFile=e.target.files[0];
    if(selectedFile){
      if(selectedFile&&fileType.includes(selectedFile.type)){
        let reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = (e) =>{
              setPdfFile(e.target.result);
              console.log(e.target.result)
              setPdfFileError('');
            }
      }
      else{
        setPdfFile(null);
        setPdfFileError('Please select valid pdf file');
      }
    }
    else{
      console.log('select your file');
    }
  }

  // form submit
  const handlePdfFileSubmit=(e)=>{
    e.preventDefault();
    
    if(pdfFile!==null){
       dispatch(uploadPdf(courseName, pdfFile))
      
       setmessage("good")
     
    }
    
  }

  if (!loading && message) {
    setTimeout(() => {
      setmessage(null)
      
    }, 3000);
  }
   
  

  return (
    <div className='container'>

       <div className="notice" >
            <h5>Bonjour  <span>{userInfo.firstName}</span></h5>
            <p>
                Ici vous pouvez télécharger votre cours pdf : <br />
                - premièrement vous devez choisir la formation dans la barre de sélection.<br />
                - Deuxièmement vous devez choisir un fichier PDF depuis votre machine.

            </p>
            <p>
                <span>Note : </span>
                s'il vous plaît ne pas insérer de pdf avec une grande taille.
            </p>
        </div>

    <br></br>
    
      <form className='form-group' onSubmit={handlePdfFileSubmit}>
         <div className='form_input pdf_upload_select'> 
          


                        <select  onChange={(e) => setCourseName(e.target.value)} required>
                            <option  value="" >choose a course .....</option> 
                            {coursesList.map((course) =>  
                              
                              <option key={course._id} value={course._id} >{course.name}</option> 
                              
                              )  
                            }
                            
                        </select>

                    </div>
        <input type="file" className='form-control'
          required onChange={handlePdfFileChange} 
        />
        {pdfFileError&&<div className='error-msg'>{pdfFileError}</div>}
        <br></br>
        <button type="submit" className='btn btn-success btn-lg'>
         {loading ? 'Chargement...' : 'Upload'}
        </button>
      </form>
      <br></br>
      {loading ? null : error ? <Message showw= {vl} variant='danger'>{error}</Message> : message &&  <Message  variant='success'>{message}</Message>} 
      <br></br>

      <h4>View PDF</h4>
      <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        {pdfFile&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfFile}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!pdfFile&&<>No pdf file selected</>}
      </div>

    </div>
  )
}

export default PdfUpload