import mongoose from 'mongoose'



const sessionSchema = mongoose.Schema({

    
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Course'
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    }],
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

const Session = mongoose.model('Session', sessionSchema)

export default Session