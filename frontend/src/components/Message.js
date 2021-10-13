import React, {useState} from 'react'
import {Alert} from 'react-bootstrap'
const Message = ({variant, children,showw}) => {
    const [show, setShow] = useState(showw);
    

        return (
        <> <Alert show={show}  variant={variant} onClose={() => setShow(false)} dismissible>
            {children} 
        </Alert></>
    )

  
   
}

Message.defaultProps = {
    variant: 'info'
}

export default Message
