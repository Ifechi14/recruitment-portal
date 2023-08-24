import mongoose from 'mongoose'


const connectDB = (url)=>{
    console.log('Connected to Database');
    return mongoose.connect(url)
}

export default connectDB