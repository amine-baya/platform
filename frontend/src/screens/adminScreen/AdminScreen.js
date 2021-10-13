import React, { useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from '../../components/Message'

const AdminScreen = () => {
    return (
        <div>

        <button>  <Link to="session">create formation</Link>  </button>
        <button> <Link to="course" >create session</Link>  </button>

            
        </div>
    )
}

export default AdminScreen
