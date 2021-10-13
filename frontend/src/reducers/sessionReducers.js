import {
  
 
 
  SESSION_REGISTER_FAIL,
  SESSION_REGISTER_REQUEST,
  SESSION_REGISTER_SUCCESS,
  SESSION_LIST_REQUEST,
  SESSION_LIST_SUCCESS,
  SESSION_LIST_FAIL,
  SESSION_UPDATE_LIST_FAIL,
  SESSION_UPDATE_LIST_SUCCESS,
  SESSION_UPDATE_LIST_REQUEST,
  SESSION_DETAILS_REQUEST,
  SESSION_DETAILS_SUCCESS,
  SESSION_DETAILS_FAIL


 
} from '../constants/sessionConstants'



export const sessionRegisterReducer = (state = {}, action) =>{

    switch (action.type){

        case SESSION_REGISTER_REQUEST : return { loading: true}

        case SESSION_REGISTER_SUCCESS : return { loading: false, userInfo: action.payload} 

        case SESSION_REGISTER_FAIL : return { loading: false, error: action.payload}

        default: return state 
 
    } 
}

export const sessionListReducer = (state = { sessions:[]}, action) =>{ 

    switch (action.type){ 
 
        case SESSION_LIST_REQUEST : return { loading: true, sessions: []}  

        case SESSION_LIST_SUCCESS : return { loading: false, sessions: action.payload}

        case SESSION_LIST_FAIL : return { loading: false, error: action.payload} 
 
        default: return state

    }    
}

export const updateSessionReducer = (state = { updateSession:[]}, action) =>{ 

    switch (action.type){ 
 
        case SESSION_UPDATE_LIST_REQUEST : return { loading: true, updateSession: []}  

        case SESSION_UPDATE_LIST_SUCCESS : return { loading: false, updateS: action.payload}

        case SESSION_UPDATE_LIST_FAIL : return { loading: false, error: action.payload} 
 
        default: return state 

    }    
} 


export const sessionDetailsReducer = (state = { session:{}}, action) =>{

    switch (action.type){

        case SESSION_DETAILS_REQUEST : return { loading: true, ...state} 
        case SESSION_DETAILS_SUCCESS : return { loading: false, session: action.payload}
        case SESSION_DETAILS_FAIL : return { loading: false, error: action.payload}

        default: return state

    }
}