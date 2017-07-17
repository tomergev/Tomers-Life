// load environment variables
require('dotenv').config()

// grab our dependencies
const express = require('express')
const app = express()
const port = process.env.port || 3030
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const expressValidator = require('express-validator')

// configure our application
// set sessions and cookie parser
app.use(cookieParser())
app.use(session({
    secret: process.env.SECERT, 
    key: 'sid',
    // express-session requirments 
    cookie: {maxAge: 60000},
    resave: false, 
    saveUninitialized: false 
}))
app.use(flash())

// tell express where to look for static assets
app.use(express.static(__dirname + '/public'))

// set ejs as our template engine
app.set('view engine', 'ejs')
app.use(expressLayouts)

// connect to our database
mongoose.connect(process.env.DB_URI, { useMongoClient: true })

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({extended: true}))
// express validator must be placed right below body parser 
app.use(expressValidator())

// set the routes
app.use(require('./app/routes'))

// start our server
app.listen(port, () => {
    console.log(`Magic happening on http://localhost:${port}`)
})