const path = require('path');
const http = require('http');

const passport = require('passport');
const express = require('express'),app = express();
const { Server } = require('socket.io');
const flash = require('connect-flash');
require('dotenv').config()
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mainproject1');

//* set bodyParser
app.use(bodyParser.urlencoded({extended:false}))


const server = http.createServer(app);


//*passport configuration
require('./config/passport');
//* set template engine
app.set('view engine', 'ejs')
app.set('views','views')

app.use(session({
    secret:'secret',
    cookie:{maxAge:300000},
    resave:false,
    saveUninitialized:false

}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session())

//*set statics
app.use("/public",express.static(path.join(__dirname,'public')))

//*routes
app.use('/products',require('./routes/products'))
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))
app.use('/facktors',require('./routes/facktors'))
app.use('/api',require('./routes/api/1.0.0'))


const io = new Server(server)


server.listen(process.env.PORT,()=>{console.log(`app runing on ${process.env.PORT}`);})

io.on('connection', socket =>{

    //console.log(`${socket.id} connected`);
    socket.on("user-fullname", data =>{
        socket.emit("chat-data", data)
    })
})

