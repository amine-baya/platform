import React, { useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";

import './profile.css'



const ProfileScreen = ({location, history}) => {
   
 


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin 

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { userUpdate } = userUpdateProfile

    useEffect(() => { 
        if (!userInfo) {
            history.push('/login')
        }

        

    }, [history, userInfo, dispatch, userUpdate])
    
    

    return (
       <>
        <div className="profile"> 


       
            <div className="profile_lastName"> <span>Nom :  </span>  { userInfo && userInfo.lastName   }</div>
            <div className="profile_firstName"> <span>Prénom :  </span>  { userInfo && userInfo.firstName   }</div>
            <div className="profile_email">  <span>Email : </span>   { userInfo && userInfo.email   }</div>
            <div className="profile_type"> <span>Type : </span> { userInfo && userInfo.type   }</div>

       
           
            


         

         
           

           
 

       </div>
       </>
    )
}

export default ProfileScreen
