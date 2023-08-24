import mongoose from "mongoose";

const JobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxlength: 60,
    },
    position: {
        type: String,
        required: [true, 'Please provide email'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending',
      },
    jobType: {
        type: String,
        required: true,
        enum: ['full-time', 'part-time', 'remote', 'internship'],
        default: 'full-time'
    },
    jobLocation: {
        type: String,
        required: true,
        default: 'my city'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
},{
    timestamps: true
});

export default mongoose.model('Job', JobSchema);