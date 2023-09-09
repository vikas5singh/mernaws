const { check, validationResult } = require('express-validator');
const data = require('../models/users');
exports.signup =  [
    check('email', 'Email length should be 10 to 30 characters').custom(async (email) => {
            const existingUser =
                await data.findOne({ email })    
            if (existingUser) {
                throw new Error('Email already in Exist')
            }
        }).isEmail().isLength({ min: 2, max: 30 }),
    check('name', 'Name length should be 10 to 20 characters')
                    .isLength({ min: 2, max: 20 }),
    check('password', 'Password length should be 8 to 10 characters')
                    .isLength({ min: 8, max: 10 }),
 (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json(errors)
    }
    else {
        const registerData = new data(req.body);
console.log(registerData);
registerData.save((err, data)=>{
try{
res.send({'message': 'Registration is successfull comleted'});
}catch{
res.send({'error': 'Some things wrong'});
}

});
    }
	}
];