require('./database/database');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const path = require('path');
const multer = require('multer');

const User = require('./models/Users');
const Car = require('./models/Cars');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static("./images"));

app.post('/registerUser', (req, res) => {
    console.log(req.body);
    var ufname = req.body.first_name;
    var ulname = req.body.last_name;
    var uemail = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var pnum = req.body.phone_number;
    var userData = new User({
        'first_name': ufname,
        'last_name': ulname,
        'email': uemail,
        'username': username,
        'password': password,
        'phone_number': pnum

    });
    User.find({ 'username': username }).countDocuments(function (err, number) {
        if (number != 0) {
            res.send('username already exists');
            console.log('Username already exists');
        }
        else {
            userData.save().then(function () {
                res.json(mydata);

            }).catch(function (e) {
                res.json(e);
            })
        }
    })
})

app.post('/login', function (req, res) {

    console.log(req.body);

    var uname = req.body.username;
    var pass = req.body.password;

    User.find({ 'username': uname, 'password': pass }).countDocuments(function (err, number) {
        if (number != 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json('Login successful');
            console.log("Login Successful.")
        }
        else {
            res.send('Invalid username or password.');
            console.log('Invalid username or password');
        }
    })
})

app.post('/addCar', (req, res) => {
    console.log("Inside API");
    var response = "Nothing";
    var carData = new Car(req.body);
    console.log("REQUEST-->" + carData);
    carData.save().then(function () {
        response = "Car added successfully"
        console.log(response);
        res.send(response);
    }).catch(function (e) {
        response = "Error"
        console.log(response);
        res.send(e);
    })
})

var storage = multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, "Ashim" + Date.now() + ext);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb("Only image files accepted!!"), false;
    }
    cb(null, true);
};

var upload = multer({ storage: storage, fileFilter: imageFileFilter, limits: { fileSize: 1000000 } });

app.post('/uploadImage', upload.single('carImage'), (req, res) => {
    res.json(req.file.filename);
})

app.get('/getCars', function (req, res) {
    Car.find().then(function (allCarsData) {
        var carsData = JSON.stringify(allCarsData);
        console.log(carsData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(carsData);
    }).catch(function (error) {
        console.log(error);
    })
})

app.listen(6969);
