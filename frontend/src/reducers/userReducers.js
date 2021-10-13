import {
  
 
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS, 
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS, 
  USER_LIST_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_SIGNATURE,
  USER_PRESENCE_REQUEST,
  USER_PRESENCE_SUCCESS,
  USER_PRESENCE_FAIL,
  USER_SIGNATURE_SUCCESS,
  USER_SIGNATURE_FAIL,
  USER_SIGNATURE_REQUEST,
  USERS_PRESENCE_REQUEST,
  USERS_PRESENCE_SUCCESS,
  USERS_PRESENCE_FAIL,
} from '../constants/userConstants'

export const userLoginReducer = (state = {}, action) =>{  

    switch (action.type){

        case USER_LOGIN_REQUEST : return { loading: true}

        case USER_LOGIN_SUCCESS : return { loading: false, userInfo: action.payload}

        case USER_LOGIN_FAIL : return { loading: false, error: action.payload}

        case USER_LOGOUT : return {}
 
        default: return state

    } 
}  

export const userRegisterReducer = (state = {}, action) =>{

    switch (action.type){

        case USER_REGISTER_REQUEST : return { loading: true} 

        case USER_REGISTER_SUCCESS : return { loading: false, userInfo: action.payload} 

        case USER_REGISTER_FAIL : return { loading: false, error: action.payload}

        default: return state 

    } 
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {

    case USER_LIST_REQUEST:  return { loading: true }

    case USER_LIST_SUCCESS: return { loading: false, users: action.payload.users }

    case USER_LIST_FAIL:  return { loading: false, error: action.payload }

    

    default:  return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) =>{ 

    switch (action.type){

        case USER_UPDATE_PROFILE_REQUEST : return { loading: true}

        case USER_UPDATE_PROFILE_SUCCESS : return { loading: false, success: true, userUpdate: action.payload}

        case USER_UPDATE_PROFILE_FAIL : return { loading: false, error: action.payload}

        case USER_UPDATE_PROFILE_RESET: return {}

        default: return state

    } 
} 

export const userDetailReducer = (state = {user: {}}, action) =>{

    switch (action.type){

        case USER_DETAILS_REQUEST : return {  loading: true,...state}

        case USER_DETAILS_SUCCESS : return { loading: false, user: action.payload}

        case USER_DETAILS_FAIL : return { loading: false, error: action.payload}

        case USER_DETAILS_RESET: return { user: {} }

        default: return state

    } 
}


export const userSignatureReducer = (state = {}, action) =>{  

    switch (action.type){ 

        case USER_SIGNATURE_REQUEST : return { loading: true} 

        case USER_SIGNATURE_SUCCESS : return {  signature: action.payload}

        case USER_SIGNATURE_FAIL : return { loading: false, error: action.payload}

        case USER_LOGOUT : return {} 


        default: return state

    } 
}

export const userPresenceReducer = (state = {}, action) =>{

    switch (action.type){

        case USER_PRESENCE_REQUEST : return { loading: true} 

        case USER_PRESENCE_SUCCESS : return { loading: false, Presence: action.payload} 

        case USER_PRESENCE_FAIL : return { loading: false, error: action.payload}

        case USER_LOGOUT : return {} 

        default: return state 

    } 
}



export const usersPresenceReducer = (state = {}, action) =>{

    switch (action.type){

        case USERS_PRESENCE_REQUEST : return { loading: true} 

        case USERS_PRESENCE_SUCCESS : return { loading: false, Presence: action.payload} 

        case USERS_PRESENCE_FAIL : return { loading: false, error: action.payload}

        default: return state 

    } 
}