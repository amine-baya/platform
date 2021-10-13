import React from 'react'

import { useDispatch, useSelector } from "react-redux";


import { Link } from "react-router-dom";
import { logout } from '../../actions/userActions';   

import './dashboard.css' 


const AdminDashboard = ({location, history}) => { 

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const dispatch = useDispatch()
   

    const logoutHandler = () => {
        dispatch(logout())
            
    }

    


   
    return (<>
        {!userInfo ? null : 
        <div className="dashboard">
            <div className="dashboard1"></div>
            <div className="dashboard2">
                    
                   {userInfo.type === 'admin' && (<><h3 className="dashboard_title" >admin</h3>

                     <ul>
                         <li><Link className='link' to='/profile'>profile</Link></li>
                         <li><Link to="/register"> enregistrer </Link>  </li>
                         <li><Link to="/createSession"> créer une session </Link> </li>
                         <li><Link to="/createCourse"> créer une formation </Link></li>
                         <li><Link to="/affectation"> affectation </Link></li>
                         <li><Link to="/update"> modifier le mot de passe </Link></li> 
                         <li><Link to="/signature"> signature </Link></li>
                         <li><Link to="/pdf"> upload PDF </Link></li>
                         <li><Link to="/userPresence"> voir la présence </Link></li>
                         <li onClick={logoutHandler}> <Link to="/login"> déconnexion </Link> </li>

                     </ul></>)}

                     {userInfo.type === 'formateur' && (<><h3 className="dashboard_title" >{userInfo.firstName}</h3>

                     <ul>
                         
                        <li><Link className='link' to='/profile'>profil</Link></li>
                         <li><Link to="/update"> modifier le mot de passe </Link></li> 
                         <li><Link to="/signature"> signature </Link></li>
                         <li><Link to="/presence"> présence </Link></li>
                         <li><Link to="/absence"> Marquer les absents</Link></li>
                         <li><Link to="/pdf"> upload PDF </Link></li>
                         <li><Link to="/showCourses"> Mes formations </Link></li>
                         <li onClick={logoutHandler}> <Link to="/login"> déconnexion </Link> </li>

                     </ul></>)}

                     {userInfo.type === 'stagiaire' && (<><h3 className="dashboard_title" >{userInfo.firstName}</h3>

                     <ul>
                         <li><Link className='link' to='/profile'>profil</Link></li>
                         <li><Link to="/update"> modifier le mot de passe </Link></li> 
                         <li><Link to="/signature"> signature </Link></li>
                         <li><Link to="/presence"> présence </Link></li>
                         <li><Link to="/showCourses"> Mes formations </Link></li>
                         <li onClick={logoutHandler}> <Link to="/login"> déconnexion </Link> </li>

                     </ul></>)}
                    
                
            
            </div>
            <div className="dashboard3"></div>

        </div>}
    </>)
}

export default AdminDashboard

