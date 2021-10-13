import axios from 'axios'
import {

    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_SIGNATURE,
    USER_PRESENCE_REQUEST,
    USER_PRESENCE_SUCCESS,
    USER_PRESENCE_FAIL,
    USER_SIGNATURE_SUCCESS,
    USER_SIGNATURE_FAIL,
    USER_SIGNATURE_REQUEST,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USERS_PRESENCE_REQUEST,
    USERS_PRESENCE_SUCCESS,
    USERS_PRESENCE_FAIL,
 
  
} from '../constants/userConstants'


export const  login = (email, password) => async (dispatch) =>{ 
    try{
        dispatch({ type: USER_LOGIN_REQUEST}) 

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const {data} = await axios.post('/api/users/login', { email, password}, config)

        dispatch({ 
            type: USER_LOGIN_SUCCESS,
            payload: data
        }) 
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error){
          dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}




export const  register = (firstName,lastName, email, type,session,presence,password) => async (dispatch,getState) =>{  
    try{
        dispatch({ type: USER_REGISTER_REQUEST})
        const {userLogin: {userInfo}} = getState()


        const config = {
            headers: { 
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${userInfo.token}` 
            },
        }

        const {data} = await axios.post('/api/users', {firstName,lastName ,email, type,session,presence,password }, config)  

        dispatch({ 
            type: USER_REGISTER_SUCCESS,
            payload: data 
        })

        

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error){
          dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}


export const listUsers = () => async (dispatch, getState) => { 
  try {
    dispatch({type: USER_LIST_REQUEST})

    const {
      userLogin: { userInfo },
    } = getState()  

    const config = { 
      headers: { 
        Authorization: `Bearer ${userInfo.token}`, 
      },
    }

    const { data } = await axios.get(`/api/users`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    })
  }
}






export const  getUserDetails = () => async (dispatch, getState) =>{
    try{
        dispatch({ type: USER_DETAILS_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`  
            },
        }

        const {data} = await axios.get(`/api/users/profile`, config)

        dispatch({ 
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error){
          dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const  UpdateUserProfile = (password) => async (dispatch, getState) =>{
    try{
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }, 
        }

        const {data} = await axios.put(`/api/users/profile`,{password}, config) 

        dispatch({ 
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error){
          dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}   

 export const  UpdateUserProfileSignature = (signature) => async (dispatch, getState) =>{
    try{
        dispatch({ type: USER_SIGNATURE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }, 
        }

        const {data} = await axios.put(`/api/users/profile/signature`,{signature}, config) 
 
        dispatch({ 
            type: USER_SIGNATURE_SUCCESS,
            payload: data
        }) 

        localStorage.setItem('userSignature', JSON.stringify(data))

 
    } catch (error){
          dispatch({
            type: USER_SIGNATURE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}  

 export const  UpdateUserPresence = (presence) => async (dispatch, getState) =>{
    try{
        dispatch({ type: USER_PRESENCE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }, 
        }

        const {data} = await axios.put(`/api/users/presence`, {presence}, config) 

        dispatch({ 
            type: USER_PRESENCE_SUCCESS,
            payload: data
        })

        localStorage.setItem('userPresence', JSON.stringify(data))

    } catch (error){
          dispatch({
            type: USER_PRESENCE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}  





export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo') 
    
    localStorage.removeItem('userPresence') 

    localStorage.removeItem('userSignature') 


    dispatch({ type: USER_LOGOUT})
     
 
} 



export const  UpdateUsersPresence = (_id,presence) => async (dispatch, getState) =>{
    try{
        dispatch({ type: USERS_PRESENCE_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }, 
        }

        const {data} = await axios.put(`/api/users/presenceAll`, {_id,presence}, config) 

        dispatch({ 
            type: USERS_PRESENCE_SUCCESS,
            payload: data
        })

        

    } catch (error){
          dispatch({
            type: USERS_PRESENCE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}  