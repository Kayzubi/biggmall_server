import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import { dbConnect } from './config/dbConect'
import router from './routes'
import dotenv from 'dotenv' 
import ErrorHandler from './middlewares/errorHandler'
import successHandler from './middlewares/successHandler'

dotenv.config()

const app = express()

app.use(cors({
    credentials: true
}))


app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

dbConnect();

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
})

app.use(successHandler);

app.use('/api', router())

app.use(ErrorHandler)
