const express = require('express');
const router = express.Router();

const multer = require('multer');
/*const { v4: uuidv4 } = require('uuid');
let path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage, fileFilter });

*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images")
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname)
  }
})


const upload = multer({storage: storage});


const jwt = require("jsonwebtoken");
require('dotenv').config({path:'../config/.env'});

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};


const usercontroller = require('../controller/usercontroller');
const { body} = require('express-validator');
router.get('/', usercontroller.basicroute);
router.post('/register', upload.single('photo'), usercontroller.registerRoute);

router.post('/login', body('email').isEmail().normalizeEmail(),
    body('password').isLength({
        min: 6
    }), usercontroller.loginRoute);

router.post("/welcome", verifyToken, (req, res) => {
  res.status(200).send("Welcome ðŸ™Œ ");
});	
console.log(usercontroller.getUserRoutes);
router.get('/allusers', usercontroller.getUserRoutes);
router.put('/update/:id' ,upload.single('photo'), usercontroller.updateRoute);
router.get('/read/:id', usercontroller.readRoute);
router.delete('/delete/:id', usercontroller.deleteRoute);

// Employees Routes 
router.post('/createemployees', upload.single('imgupload'), usercontroller.employeescreateRoute);
router.get('/getallemployee', usercontroller.getEmployeeallRoutes);
router.put('/employeeupdate/:id' ,upload.single('imgupload'), usercontroller.updateemployeesRoute);
router.get('/reademployee/:id', usercontroller.employeereadRoute);
router.delete('/empoyeedelete/:id', usercontroller.employeedeleteRoute);

module.exports = router;