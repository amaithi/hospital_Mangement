const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const contactus = require('./routes/api/contactus');
const member = require('./routes/api/member');
const rider = require('./routes/api/rider');
const ridesignup = require('./routes/api/ridesignup');
const doctors = require('./routes/api/doctors');
const patients = require('./routes/api/patients');
const doctorInfo = require('./routes/api/doctorInfo');
const appointments = require('./routes/api/appointments');
var http            = require("http");
var https            = require("http");
// require('../config/passport')(passport);
const app = express();
const cors = require('cors');
const helmet = require('helmet')
const frameguard = require('frameguard')
const ip = require('ip')
const fs = require('fs')


app.use(cors());
app.use(helmet())
app.use(frameguard({ action: 'deny' }))

// var socket = require('socket.io');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());



const db = require('../config/keys').mongoURI;

mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() =>
        console.log('MongoDB successfully connected.')
    ).catch(err => console.log(err));

app.use(passport.initialize());
app.use(express.static('public'));
app.use('/api', doctors);
app.use('/api', doctorInfo);
app.use('/api', patients);

app.use('/api', appointments);
// app.use('/api', contactus);
// app.use('/api', member);
// app.use('/api', rider);
// app.use('/api', ridesignup);


//frontend
//app.use('/cryptoapi', frontusers);



var myip = ip.address();


const port = process.env.PORT || 5001;
// console.log(myip);
if (myip == '172.104.166.247') {
  var privateKey = fs.readFileSync('/etc/letsencrypt/live/genesisonetoken.com/privkey.pem').toString();
  var certificate = fs.readFileSync('/etc/letsencrypt/live/genesisonetoken.com/cert.pem').toString();
  var credentials = {
    key: privateKey,
    cert: certificate
  };
  const https = require('https');
  var server = https.createServer(credentials, app);
} else {
  const http = require('http');
  var server = http.createServer(app);
}

//  var server = http.createServer(app);


server = server.listen(port, function () {
    console.log('server is running on port 5001')
});

// io = socket(server);
var io = require('socket.io')(server);


io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('CREATEROOM', function(userid){
        socket.join(userid);
    });

    socket.on('SEND_MESSAGE', function (data) {
        console.log("Server");
        console.log(data);
        io.emit('RECEIVE_MESSAGE', data);
    })
});
