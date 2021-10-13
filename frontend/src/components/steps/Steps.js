import React  from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './steps.css'

const Steps = (props) => {

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    console.log(props.props.path);
    
    return (
        <>
        { (!userInfo || userInfo.type === "admin") ? null :
        
        <>
            { userInfo.type === "formateur" &&
            <div className="steps"> 
         
                <div className={props.props.path === "/signature" && "active"} >  <span>1 </span>  <Link to="/signature"> Créer ma signature  </Link></div>
                
                <div className={props.props.path === "/presence" && "active"}>  <span>2 </span>  <Link to="/presence">Signer ma feuille de présence</Link></div>
                <div className={props.props.path === "/absence" && "active"}> <span>3 </span> <Link to="/absence"> Marquer les absents</Link></div>
                 
            </div>
            
            }

            { userInfo.type === "stagiaire" &&
            <div className="steps"> 
        
                <div className={props.props.path === "/signature" && "active"} >  <span>1 </span>  <Link to="/signature"> Créer ma signature  </Link></div>
                
                <div className={props.props.path === "/presence" && "active"}>  <span>2 </span>  <Link to="/presence">Signer ma feuille de présence</Link></div>
                
                 
            </div>
            
            }

         </>


        }
        </>
       
    )
}


export default Steps