import axios from 'axios'
import {

   
    SESSION_REGISTER_REQUEST,
    SESSION_REGISTER_SUCCESS,
    SESSION_REGISTER_FAIL,
    SESSION_LOGIN_SUCCESS,
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







export const  register = (name,start, end, description) => async (dispatch,getState) =>{  
    try{
        dispatch({ type: SESSION_REGISTER_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = { 
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${userInfo.token}`   
            },
        }

        const {data} = await axios.post('/api/sessions/create', {name,start ,end, description }, config)  

        dispatch({ 
            type: SESSION_REGISTER_SUCCESS,
            payload: data 
        })

        dispatch({ 
            type: SESSION_LOGIN_SUCCESS,
            payload: data
        })

       
    } catch (error){
          dispatch({
            type: SESSION_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        }) 
    }
}


export const  listSessions = () => async (dispatch) =>{  
    try{
        dispatch({ type: SESSION_LIST_REQUEST})

        const {data} = await axios.get(`/api/sessions/`) 

        dispatch({  
            type: SESSION_LIST_SUCCESS,    
            payload: data
        })
    } catch (error){
          dispatch({
            type: SESSION_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const  updateSessions = (id, course) => async (dispatch,getState) =>{  
    try{
        dispatch({ type: SESSION_UPDATE_LIST_REQUEST})

        const {userLogin: {userInfo}} = getState()

        const config = { 
             headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${userInfo.token}`   
            },  
        }

        const {data} = await axios.put(`/api/sessions/${id}`, {course}, config)  

        dispatch({  
            type: SESSION_UPDATE_LIST_SUCCESS,    
            payload: data
        })
    } catch (error){
          dispatch({
            type: SESSION_UPDATE_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const  sessionDetail = (id) => async (dispatch) =>{
    try{
        dispatch({ type: SESSION_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/sessions/${id}`) 

        dispatch({
            type: SESSION_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error){
          dispatch({
            type: SESSION_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}