import axios from 'axios'
import {


    COURSE_REGISTER_REQUEST,
    COURSE_REGISTER_SUCCESS,
    COURSE_REGISTER_FAIL,
    COURSE_LOGIN_SUCCESS,
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL, 
    COURSE_PDF_FAIL,
    COURSE_PDF_SUCCESS,
    COURSE_PDF_REQUEST
    
    
    
 
} from '../constants/courseConstants'


export const  register = (name,start, end, description) => async (dispatch,getState) =>{  
    try{
        dispatch({ type: COURSE_REGISTER_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${userInfo.token}`  
            },
        }

        const {data} = await axios.post('/api/courses/create', {name,start ,end, description }, config)  

        dispatch({ 
            type: COURSE_REGISTER_SUCCESS,
            payload: data 
        })

        dispatch({ 
            type: COURSE_LOGIN_SUCCESS,
            payload: data
        })

       
    } catch (error){
          dispatch({
            type: COURSE_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}



export const  listCourses = () => async (dispatch) =>{  
    try{
        dispatch({ type: COURSE_LIST_REQUEST})
 
        const {data} = await axios.get(`/api/courses/`) 

        dispatch({  
            type: COURSE_LIST_SUCCESS,    
            payload: data
        })
    } catch (error){
          dispatch({
            type: COURSE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const  listCourseDetails = (id) => async (dispatch) =>{
    try{
        dispatch({ type: COURSE_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/courses/${id}`)

        dispatch({
            type: COURSE_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error){
          dispatch({
            type: COURSE_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const  uploadPdf = (id, pdfUrl) => async (dispatch) =>{  
    try{
        dispatch({ type: COURSE_PDF_REQUEST})

        const config = { 
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const {data} = await axios.put(`/api/courses/uploadPdf/${id}`, {pdfUrl}, config) 

        dispatch({  
            type: COURSE_PDF_SUCCESS,    
            payload: data
        })
    } catch (error){
          dispatch({
            type: COURSE_PDF_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}