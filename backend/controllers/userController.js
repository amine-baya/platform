import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js' 


const authUser = asyncHandler(async (req, res)=>{
  
    const {email, password} = req.body
    const user = await User.findOne({email}).populate('session') 
     
    if(user){ 
      if ((await user.matchPassword(password))) {
        res.json({  
            _id: user._id,  
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: user.type,
            session: user.session,
            signature: user.signature,
            presence: user.presence,
            isFirstTime: user.isFirstTime,
            token: generateToken(user._id)
        })
      } else {
        res.status(401) 
        throw new Error('Invalid  password')
      }
        
    }else{
        res.status(401) 
        throw new Error('Invalid email')
        
    }
    
})


const registerUser = asyncHandler(async (req, res)=>{ 
    const {firstName,lastName, email, type, session,presence,password} = req.body

    const userExists = await User.findOne({email}) 
     
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
         firstName,
         lastName,
         email,
         type,
         session,
         presence, 
         password
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: user.type,
            session:user.session,
            presence : user.presence,
            isFirstTime: user.isFirstTime,
            token: generateToken(user._id) 
        })
    } else {
        res.status(400)
        throw new Error('Invalid User data')
    }
    
})


// @desc    Fetch all users 
// @route   GET /api/users
// @access  Public 
const getUsers = asyncHandler(async (req, res) => { 

  const users = await User.find()

  res.json({ users })

})



const getUserProfile = asyncHandler(async (req, res)=>{
    
    const user = await User.findById(req.user._id)
      
    if(user){

          res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            type: user.type,
            presence : user.presence,
            isFirstTime: user.isFirstTime
        })
    }else {
        res.status(404)
        throw new Error('User not found ')
    }

})







const updateUserProfile = asyncHandler(async (req, res)=>{
    
    const user = await User.findById(req.user._id)
     
    if(user){
        user.password = req.body.password ||  user.password

        user.isFirstTime = false
    
        const updatedUser = await user.save()
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            signature: updatedUser.signature,
            
            token: generateToken(updatedUser._id) 
        })
    }else { 
        res.status(404)
        throw new Error('User not found ')
    }
})





const updateUserProfileSignature = asyncHandler(async (req, res)=>{
    
    const user = await User.findById(req.user._id)
     
    if(user){
        user.signature = req.body.signature
    
        const updatedUser = await user.save()
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            signature: updatedUser.signature,
            token: generateToken(updatedUser._id)
        })
    }else { 
        res.status(404)
        throw new Error('User not found ')
    }
})




 
 


const updatePresence = asyncHandler(async (req, res)=>{ 
    
    const user = await User.findById(req.user._id)
    
    if(user){
       
        user.presence = req.body.presence

        const updatedUser = await user.save()
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            presence: updatedUser.presence,
            token: generateToken(updatedUser._id)
        })
    }else { 
        res.status(404)
        throw new Error('User not found ')
    }
})


const updatePresenceById = asyncHandler(async (req, res)=>{ 
    
    const user = await User.findById(req.body._id)
    
    if(user){ 
       
        user.presence = req.body.presence 
       



        const updatedUser = await user.save()
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            presence: updatedUser.presence,
            token: generateToken(updatedUser._id)
        })
    }else { 
        res.status(404)
        throw new Error('User not found ')
    }
})








export {  registerUser,authUser, getUsers ,getUserProfile,updateUserProfile, updateUserProfileSignature, updatePresence,updatePresenceById  }