import User from './../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from './../errors/index.js'


export const register = async (req,res) => {
    const { name , email, password } = req.body;

    if(!name || !email || !password){
        throw new BadRequestError('Please provide full information')
    }
    const userAlreadyExists = await User.findOne({ email });
    if(userAlreadyExists){
        throw new BadRequestError('Email already in use');
    }
        const user = await User.create({ name, email, password });
        const token = user.createJWT()
        res.status(StatusCodes.CREATED).json({ 
            status: 'success',
            message: 'User Registered',
            user: {
                email: user.email, 
                name: user.name, 
                lastName: user.lastName, 
                location: user.location
            },
            token
        });
}

export const login = async (req,res) => {
    const { email, password } = req.body;
    if(!email || !password){
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ email }).select('+password')
    if(!user){
        throw new UnAuthenticatedError('User not found');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new UnAuthenticatedError('Invalid Credentials');
    }
    const token = user.createJWT();
    user.password = undefined;
    res.status(StatusCodes.OK).json({
        user, 
        token, 
        location: user.location
    });

}

export const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body;
    if (!email || !name || !lastName || !location) {
      throw new BadRequestError('Please provide all values');
    }
  
    const user = await User.findOne({ _id: req.user.userId });
  
    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;
  
    await user.save();
  
    // various setups
    // in this case only id
    // if other properties included, must re-generate
  
    // const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      user,
      location: user.location,
    });
};
