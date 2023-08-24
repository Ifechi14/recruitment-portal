import jwt from 'jsonwebtoken'
import { NotFoundError, UnAuthenticatedError } from './../errors/index.js'
// const { promisify } = require('util');

import { promisify } from 'util';


const authenticateUser = async (req, res, next) =>{
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnAuthenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId }
        next()
        
    } catch (error) {
        throw new UnAuthenticatedError('Auth Invalid')
    }
};






export default authenticateUser