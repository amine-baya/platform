import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Form} from "react-bootstrap"
import {listUsers,UpdateUsersPresence } from '../../actions/userActions'
import Steps from '../../components/steps/Steps' 

 

import './absence.css'

const AbsenceScreen = ({location, history, match}) => {


    
  const [presences, setPresence] = useState([])

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin  

     const userList = useSelector(state => state.userList)
    const { users} = userList  

     const userPresence = useSelector(state => state.userPresence)
    const {Presence} = userPresence 


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

     useEffect(() => { 

         
         if (!userInfo  ) { 
             history.push('/login')
            }

        dispatch(listUsers())   
        
        
    }, [history, userInfo] ) 
    
    let names = users !== undefined && users.filter(el => el.session === userInfo.session._id)
    let nameso = names && names.filter(el => el.type === 'stagiaire' ) 
    
    
    
     const signatureHandlerOne = (ind,_id ,el) =>{
    
         setPresence([...el])
        el[(ind + ind) ] = false 

        setPresence([...el])

        dispatch(UpdateUsersPresence(_id,el))
        
        console.log(el) 
    }

    const signatureHandlerTwo = (ind,_id ,el) =>{

        setPresence([...el])
        el[(ind*2) + 1 ]= false
        setPresence([...el])  

        dispatch(UpdateUsersPresence(_id,el)) 
        console.log(el)
    }
 
 

    return (  
 
<> 
<Steps props={match}/>
                <div className="notice" >
                    <h5>Bonjour  <span>{userInfo.firstName}</span></h5>
                    <p>
                        Vous pouvez voir ici toutes les présences des stagiaires correspondant à la session : <strong>{userInfo.session.name}</strong>. <br />
                            + chaque signature correspondant à une présence <br />
                         + Pour marquer un stagiaire comme absent, vous devez cliquer sur la case à cocher  
                    </p>
                    <p>
                        <span>Note : </span>
                        ceci est  la dernière étape de la vérification 
                    </p>
                </div>
            <div className="table_absence"> 
                            <h3 className="table_absence_title" >{userInfo.session.name}</h3>
                <div className="tr_absence"> 

                        <div className="td_name_list">
                            <div className="td_name_list_title" >names list </div>
                            
                            {
                                nameso && nameso.map((el)=>(

                            <div className="td_name_list_body" >{el.firstName} </div>

                                ))
                            }
                            


                            


                        </div>
                        
                    
                    
                { 

                
                arr.map((el,ind) => (
                    <div className="table_row_absence" >
                        <div className="td_date_absence">{el[0]+ " " + el[1]+ " " + el[2]+ " " +el[3]}</div>
                        <div className="td_time_absence">
                            <div className="td_one_absence" >9h00-12h-30</div>
                            <div className="td_two_absence" >13h30-17h30</div>
                        </div>


                            {
                                nameso && nameso.map((ell) => (
                                    <div className="td_body_signature_absence">
                                                    
                                                    
                                        <div className="td_three_absence">
                                                
                                            {ell.presence[ind + ind] === true ? 
                                                        
                                            <>
                                            <img src={ell.signature} className="signature_table_absence" /> 
                                                <div>
                                                <span>absent:<Form.Check aria-label="option 1" onClick={() => signatureHandlerOne(ind,ell._id,ell.presence)} /> </span>
                                                    
                                                </div>
                                                     
                                            </>
                                                             
                                                : <>
                                                   <div>
                                                    <span>absent:<Form.Check aria-label="option 1" /> </span>
                                                    
                                                </div>
                                                      
                                                </>
                                            } 
                                        </div>

                                        <div className="td_four_absence" > 
                                            {ell.presence[(ind + ind) + 1] === true ? 
                                                        
                                             <>
                                                <img src={ell.signature} className="signature_table_absence" /> 
                                                <div>
                                                     <span>absent:<Form.Check aria-label="option 1" onClick={() => signatureHandlerTwo(ind,ell._id,ell.presence)} /> </span>
                                                    
                                                </div>
                                                     
                                            </>
                                                             
                                                : <>
                                                   <div>
                                                    <span>absent:<Form.Check aria-label="option 1"  /> </span>
                                                    
                                                </div>
                                                      
                                                </>
                                                 }
                                                            
                                        </div> 

                                    </div> 

                                ))
                            }

                      
                       
                    </div>
                    
                
                
                ))}
                </div>
                    
        </div>

       </> 
    )
}

export default AbsenceScreen
