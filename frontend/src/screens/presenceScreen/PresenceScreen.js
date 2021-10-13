import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

import './presence.css'

import {UpdateUserPresence} from '../../actions/userActions.js'
import Steps from '../../components/steps/Steps' 



const PresenceScreen = ({location, history, match}) => {

    const [presences, setPresence] = useState([])

 
     const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin  

    const userPresence = useSelector(state => state.userPresence)
    const {Presence} = userPresence    

    const userSignature = useSelector(state => state.userSignature)
    const { signature} = userSignature 


     useEffect(() => { 

         
         if (!userInfo  ) { 
             history.push('/login')
            }
        
            setPresence([...userInfo.presence])

        if(Presence) {
            
            setPresence(Presence.presence )  
        }else {
            setPresence( userInfo.presence)  
            
        }
    }, [history, userInfo] )

    console.log(history);

    
    let startDate = new Date(userInfo.session.start) 
    let endDate = new Date(userInfo.session.end)
    let Difference_In_Time =  endDate.getTime() - startDate.getTime()
    let Difference_In_Days =  Difference_In_Time / (1000 * 3600 * 24)
     
    let day = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday']
    let month = ['January','February', 'Marsh', 'April', 'Mai','June','July','August','September','October','November','December']

    let arr  = []
   console.log()
    
    for (let i = 0; i < Difference_In_Days + 1 ; i++  ){
        
        arr.push(
            [day[new Date(startDate.getTime() + 24 * i * 60 * 60 * 1000).getDay()], new Date(startDate.getTime() + 24 * i * 60 * 60 * 1000).getDate(), month[new Date(startDate.getTime() + 24 * i * 60 * 60 * 1000).getMonth()], new Date(startDate.getTime() + 24 * i * 60 * 60 * 1000).getFullYear()] 
            )
    }
 

    

  

    

   
  
            


    const signatureHandlerOne = (ind) =>{
    
        presences[(ind + ind) ] = true

        setPresence([...presences])

        dispatch(UpdateUserPresence(presences))
        
    }
     

  

     const signatureHandlerTwo = (ind) =>{
    
        presences[(ind*2) + 1 ]= true
        setPresence([...presences])  

        dispatch(UpdateUserPresence(presences)) 
        
    }

   
   

    return ( 
        
         <>
         <Steps props={match}/>
         <div className="notice" >
                    <h5>Bonjour Monsieur <span>{userInfo.firstName}</span></h5>
                    <p>
                          Pour marquer votre présence, vous devez cliquer sur le bouton "modifier"  
                    </p> 
        </div>
            <div className="table">  
                <div className="tr">
                    
                {arr.map((el,ind) => (
                    <div className="table_row" >
                        <div className="td_date">{el[0]+ " " + el[1]+ " " + el[2]+ " " +el[3]}</div>
                        <div className="td_time">
                            <div className="td_one" >9h00-12h-30</div>
                            <div className="td_two" >13h30-17h30</div>
                        </div>
                        <div className="td_body_signature">
                           
                         <div className="td_three">
                            {presences && presences[ind+ind] ? <img src={signature ? signature.signature : userInfo.signature} className="signature_table" /> :<button  onClick={() => signatureHandlerOne(ind)}> modifier </button> }
                         </div>
                            <div className="td_four" >
                                { presences && presences[ind+ind+1] ? <img src={signature ? signature.signature : userInfo.signature} /> : <button onClick={() => signatureHandlerTwo(ind)}> modifier</button> }
                                 
                            </div>

                        </div>
                    </div>
                    
                
                
                ))}
                </div>
                    
        </div>
        </>
    )

}
export default PresenceScreen
