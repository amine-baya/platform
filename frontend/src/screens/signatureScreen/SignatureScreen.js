import React , {useRef, useState, useEffect} from 'react'
import { useDispatch, useSelector,  } from "react-redux";
import { Modal,Button } from "react-bootstrap";
import SignaturePad from 'react-signature-canvas'
import './signature.css'
import {UpdateUserProfileSignature} from '../../actions/userActions'
import Steps from '../../components/steps/Steps' 

const SignatureScreen = ({match}) => {
      const dispatch = useDispatch()

      const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin 

    const userSignature = useSelector(state => state.userSignature)
    const { signature} = userSignature 
      useEffect(() => {
        if (signature) {
          setImage(signature.signature)  
        
        } else {
          

          setImage(userInfo.signature)  
        }
      }, [userInfo.signature])


      const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { userUpdate } = userUpdateProfile
    
    const [image, setImage] = useState('')
  const [modalShow, setModalShow] = useState(false);

    let sigPad = useRef({})
    let data = ''

    const clear = () =>{
        sigPad.current.clear()
    }

     const save = () =>{
      data =  sigPad.current.toDataURL()
      dispatch(UpdateUserProfileSignature(data))
      setModalShow(false)
      setImage(data) 

      
      
    }
    console.log(userInfo.signature)

     const show = () =>{
        sigPad.current.fromDataURL(data)
        
    }



  return (
    <>
     <Steps props={match}/>
    <div className="notice" >
            <h5>Bonjour  <span>{userInfo.firstName + " " + userInfo.lastName }</span></h5>
            
            <h6>
               faites votre signature s'il vous plait
            </h6>
        </div>
     

      <Modal
      show={modalShow} 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header  >
        <Modal.Title id="contained-modal-title-vcenter">
          Signature
        </Modal.Title>
       <span className="close_modal_times" ><i class="fas fa-times" onClick={() => setModalShow(false)}></i></span>
      </Modal.Header>
      <Modal.Body>
           <div className="signature_model"> 

                <SignaturePad 
                ref={sigPad}
                penColor= "black"
                canvasProps={{width: 600, height: 200, className: 'sigCanvas'}}
                />

               
           </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => clear()}>Clear</Button>
        <Button onClick={() => save()}>Save</Button>
      </Modal.Footer>
    </Modal>

      <div className="show_signature">
        <img src={image} alt=''/>
      </div>

       <button className="show_modal" variant="primary" onClick={() => setModalShow(true)}>
        { signature ? "refaire" : "faire"}
      </button>
    </>
  );
}

export default SignatureScreen
