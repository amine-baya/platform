import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'



// @desc    Create a course
// @route   POST /api/courses 
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  const { 
    name,
    start,
    end, 
    description

  } = req.body  

  console.log(req.user)

  const course = new Course({
    name,
    user: req.user._id,
    start,
    end,  
    description, 
    
  })

  const createdCourse = await course.save()
  res.status(201).json(createdCourse)
})


// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {

  
  const course = await Course.findById(req.params.id)

  if (course) {
    await course.remove()
    res.json({ message: 'Course  removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


// @desc    Fetch all courses 
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => { 
 
  const courses = await Course.find({ }).select('-pdfUrl')

  res.json(courses)
})



// @desc    Fetch single course
// @route  GET /api/courses/:id 
// @access  Public
const getCourseById = asyncHandler(async (req, res)=>{
const course = await Course.findById(req.params.id)
    if (course) {
        res.json(course)
    } else {
        res.status(404)
        throw new Error('Course is not found')  
    }
 
   
})

// @desc    Fetch single course
// @route  put /api/courses/uploadPdf 
// @access  Public
const uploadPdf = asyncHandler(async (req, res)=>{
const course = await Course.findById(req.params.id)
    if (course) {
        course.pdfUrl = req.body.pdfUrl

        const updatedCourse = await course.save()

        res.json({
          name: updatedCourse.name,
          pdfUrl: updatedCourse.pdfUrl
        })
    } else {
        res.status(404)
        throw new Error('Course is not found')  
    }
 
   
})





export {
    createCourse,
    getCourses,
    getCourseById,
    deleteCourse,
    uploadPdf
}