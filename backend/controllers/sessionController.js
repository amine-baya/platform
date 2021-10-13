import asyncHandler from 'express-async-handler'
import Session from '../models/sessionModel.js'



// @desc    Create a session
// @route   POST /api/sessions 
// @access  Private/Admin
const createSession = asyncHandler(async (req, res) => {
  const {
    name,
    start,
    end, 
    description
    
     
  } = req.body 

  console.log(req.user)

  const session = new Session({
    name, 
    start,
    end,  
    description, 
    
  })

  const createdSession = await session.save()
  res.status(201).json(createdSession)
})


// @desc    Delete a session
// @route   DELETE /api/sessions/:id
// @access  Private/Admin
const deleteSession = asyncHandler(async (req, res) => {

  
  const session = await Session.findById(req.params.id)

  if (session) { 
    await session.remove()
    res.json({ message: 'Session  removed' })
  } else {
    res.status(404)
    throw new Error('Session not found')
  }
}) 


// @desc    Fetch all sessions 
// @route   GET /api/sessions 
// @access  Public
const getSessions = asyncHandler(async (req, res) => {  

    
  const sessions = await Session.find({ })    

  res.json(sessions) 
})


// @desc    Fetch single session
// @route  GET /api/sessions/:id 
// @access  Public
const getSessionById = asyncHandler(async (req, res)=>{
const session = await Session.findById(req.params.id)
    if (session) {
        res.json(session)
    } else {
        res.status(404)
        throw new Error('Session is not found')  
    }
 
   
})



// @desc    Fetch single session
// @route  GET /api/sessions/:id 
// @access  Public
const updateAndGetSessionById = asyncHandler(async (req, res)=>{
const session = await Session.findById(req.params.id)

    if (session) {
        session.courses = req.body.course

        const updatedSession = await session.save()   

        res.json(updatedSession)
    } else {
        res.status(404)
        throw new Error('Session is not found')  
    }
 
   
})








export {
    createSession,
    getSessions,
    updateAndGetSessionById,
    getSessionById,
    deleteSession,
  
}