import { createStore, combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools} from 'redux-devtools-extension'


import { userLoginReducer, userRegisterReducer,userListReducer,userDetailReducer ,userUpdateProfileReducer,userSignatureReducer, userPresenceReducer,usersPresenceReducer } from "./reducers/userReducers";
import { sessionRegisterReducer, sessionListReducer, updateSessionReducer,sessionDetailsReducer } from "./reducers/sessionReducers";
import { courseRegisterReducer, courseListReducer,courseDetailsReducer, uploadPdfReducer } from "./reducers/courseReducers";



 
const reducer = combineReducers({
   
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer, 
    userDetail: userDetailReducer, 
    userUpdateProfile: userUpdateProfileReducer,
    sessionRegister: sessionRegisterReducer,
    courseRegister: courseRegisterReducer,
    sessionList: sessionListReducer,
    courseList: courseListReducer,
    updateSession: updateSessionReducer,
    courseDetails: courseDetailsReducer ,
    userSignature: userSignatureReducer,
    uploadPdfCourse: uploadPdfReducer,
    userPresence: userPresenceReducer,
    usersPresence: usersPresenceReducer,
    sessionDetails: sessionDetailsReducer
   
}) 


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const userSignatureFromStorage = localStorage.getItem('userSignature') ? JSON.parse(localStorage.getItem('userSignature')) : null


const userPresenceFromStorage = localStorage.getItem('userPresence') ? JSON.parse(localStorage.getItem('userPresence')) : null



const initialState = {
    
    userLogin: {userInfo: userInfoFromStorage},
    userPresence: {Presence: userPresenceFromStorage},
    userSignature: {signature: userSignatureFromStorage}

} 

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))) 


export default  store 