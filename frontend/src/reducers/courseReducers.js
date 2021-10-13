import {
  
 
 
  COURSE_REGISTER_FAIL,
  COURSE_REGISTER_REQUEST,
  COURSE_REGISTER_SUCCESS,
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL, 
  COURSE_PDF_REQUEST,
  COURSE_PDF_SUCCESS,
  COURSE_PDF_FAIL

 
} from '../constants/courseConstants'



export const courseRegisterReducer = (state = {}, action) =>{

    switch (action.type){

        case COURSE_REGISTER_REQUEST : return { loading: true}

        case COURSE_REGISTER_SUCCESS : return { loading: false, userInfo: action.payload} 

        case COURSE_REGISTER_FAIL : return { loading: false, error: action.payload}

        default: return state 

    } 
}

export const courseListReducer = (state = { courses:[]}, action) =>{ 

    switch (action.type){ 
 
        case COURSE_LIST_REQUEST : return { loading: true, courses: []}  

        case COURSE_LIST_SUCCESS : return { loading: false, courses: action.payload}

        case COURSE_LIST_FAIL : return { loading: false, error: action.payload} 
 
        default: return state

    }   
}

export const courseDetailsReducer = (state = { course:{}}, action) =>{

    switch (action.type){

        case COURSE_DETAILS_REQUEST : return { loading: true, ...state} 

        case COURSE_DETAILS_SUCCESS : return { loading: false, course: action.payload}

        case COURSE_DETAILS_FAIL : return { loading: false, error: action.payload}

        default: return state

    }
}



export const uploadPdfReducer = (state = { course:{}}, action) =>{

    switch (action.type){

        case COURSE_PDF_REQUEST : return { loading: true}  

        case COURSE_PDF_SUCCESS : return { loading: false, course: action.payload}

        case COURSE_PDF_FAIL : return { loading: false, error: action.payload}

        default: return state

    }
}
