import 'express-async-errors';
import express from 'express';
import morgan from 'morgan'
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();

import dotenv from 'dotenv'
dotenv.config();

//db
import connectDB from './db/connect.js';

//route
import authRouter from './routes/authRoute.js'
import jobRouter from './routes/jobRoute.js'

//middleware 
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';
import authenticateUser from './middleware/auth.js'

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

app.use(express.json());
//security
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.get('/api/v1', (req, res) => {
    // throw new Error('error')
  res.send('Welcome to NCSC recruitment Portal!');
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//port number
const port = process.env.PORT || 5000;

//start server
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => 
            console.log(`Server is listening on port ${port}...`
        ));
    } catch (error) {
        console.log(error);
    }
}

start()

