import mongoose from 'mongoose'



const courseSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    pdfUrl: {
        type: String,
        required: false,
        default: "",
    },
    name: {
        type: String,  
        required: true
    },
    start: {
        type:Date
    },
    end: {
        type:Date
    },
    

   

    description: {
        type: String,
        required: true 
    },

}, {
    timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

export default Course