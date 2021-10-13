import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {Form} from "react-bootstrap"
import {listUsers,UpdateUsersPresence } from '../../actions/userActions' 
import {listSessions,sessionDetail } from '../../actions/sessionActions' 
import Loader from '../../components/Loader' 


import './adminShowAbsence.css'

const AdminShowAbsenceScreen = ({location, history}) => {


  const [presences, setPresence] = useState([])

    
    const [sessionchoice, setSessionchoice] = useState('')
    const [sessionName, setSessionName] = useState('')


    


    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin   

    const sessionList = useSelector(state => state.sessionList)
    const { sessions} = sessionList  
    
    const sessionDetails = useSelector(state => state.sessionDetails)
    const { session} = sessionDetails  

     const userList = useSelector(state => state.userList)
    const { users} = userList  

     const userPresence = useSelector(state => state.userPresence)
    const {Presence} = userPresence


    let startDate = new Date(  session.start ) 
    let endDate = new Date( session.end)
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
            
            dispatch(listSessions())     
            dispatch(listUsers())
            
            
        }, [history, userInfo] ) 

        
        
      
    
    let names = users !== undefined && users.filter(el => el.session ===  sessionchoice)
    let nameso = names && names.filter(el => el.type === 'stagiaire' ) 
    let namesf = names && names.filter(el => el.type === 'formateur' ) 

    
    console.log( users,names, nameso,namesf)

    const submitHandler = (e) => {

        setTimeout(() => {
            setSessionchoice(e.target.value)
            
        }, 500);

             dispatch(sessionDetail(e.target.value))  

    
  }


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

        <div className="notice" >
            <h5>Bonjour Monsieur <span>Atef Bouhlel</span></h5>
            <p>
                Ici vous pouvez voir toutes les présences des stagiaires et des formateurs. <br />
                vous devez choisir la session dans la barre de sélection.
            </p>
            <p>
                <span>Note : </span>
                vous avez tous les droits de marquer chaque stagiaire ou formateur comme absent.
            </p>
        </div>
            <div>
                <form className='form'>
                    <div className=' pdf_upload_select'>
                        <select onChange={(e) => submitHandler(e)}>

                            <option  value="" >choose .....</option> 
                            {sessions.map((session) => 
                            
                            <option key={session._id} value={session._id} >{session.name}</option> 
                            )   
                            } 
                </select> 
                    </div>

                            
                </form>
            </div>   

    
            <div className="table_absence"> 

                
                        
                   {sessionchoice && <h3>stagiaires :</h3>}
                <div className="tr_absence"> 

                       {sessionchoice && <div className="td_name_list">
                            <div className="td_name_list_title" >names list </div>
                            
                            { 
                                nameso && nameso.map((el)=>(

                            <div className="td_name_list_body" >{el.firstName} </div>

                                ))
                            }
                            


                            


                        </div>}
                    
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




















                {sessionchoice && <h3>formateurs :</h3>}
                <div className="tr_absence"> 

                      {sessionchoice &&  <div className="td_name_list">
                            <div className="td_name_list_title" >names list </div>
                            
                            {
                                namesf && namesf.map((el)=>(

                            <div className="td_name_list_body" >{el.firstName} </div>

                                ))
                            }
                            



                        </div>}
                        
                    
                    
                 { 
 
                  arr.map((el,ind) => (
                    <div className="table_row_absence" >
                        <div className="td_date_absence">{el[0]+ " " + el[1]+ " " + el[2]+ " " +el[3]}</div>
                        <div className="td_time_absence">
                            <div className="td_one_absence" >9h00-12h-30</div>
                            <div className="td_two_absence" >13h30-17h30</div>
                        </div>


                            {
                                namesf && namesf.map((ell) => (
                                    <div className="td_body_signature_absence">
                                                    
                                                    
                                        <div className="td_three_absence">
                                                
                                            {ell.presence[ind + ind] === true ? 
                                                        
                                            <>
                                            <img src={ell.signature} className="signature_table_absence" /> 
                                                <div>
                                                    <span>absent:<Form.Check aria-label="option 1"  onClick={() => signatureHandlerOne(ind,ell._id,ell.presence)} /> </span>
                                                    
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
                                                    <span>absent:<Form.Check aria-label="option 1" onClick={() => signatureHandlerTwo(ind,ell._id,ell.presence)}  /> </span>
                                                    
                                                </div>
                                                     
                                            </>
                                                             
                                                : <>
                                                  <div>
                                                    <span>absent:<Form.Check aria-label="option 1" /> </span>
                                                    
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

export default AdminShowAbsenceScreen
