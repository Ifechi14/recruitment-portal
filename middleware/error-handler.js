import { StatusCodes } from 'http-status-codes'

const errorHandlerMiddleware = (err, req, res, next) => {
    // console.log(err);
    const defaultError = {
        statusCode: err.statusCode ||  StatusCodes.INTERNAL_SERVER_ERROR,
        //err.message= error message from controllers 
        message: err.message || 'Something went wrong, try again later'
    }
    //missing field error
    if(err.name === 'ValidationError') {
        defaultError.statusCode= StatusCodes.BAD_REQUEST,
        // defaultError.message= err.message
        defaultError.message= Object.values(err.errors).map((item)=> item.message).join(',')
    }
    //unique field error
    if(err.code && err.code === 11000) {
        defaultError.statusCode= StatusCodes.BAD_REQUEST,
        defaultError.message= `${Object.keys(err.keyValue)} field has to unique`
    }
    res.status(defaultError.statusCode).json({ message: defaultError.message});
}

export default errorHandlerMiddleware