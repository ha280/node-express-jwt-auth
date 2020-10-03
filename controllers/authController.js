const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleError = (err) => {
    console.log(err.message , err.code);
    let errors = {email: err.email.message , password: err.password.message};
    if(err.code = 11000){
        errors.email = 'That emai already exists';
    }
    return errors;
}

const maxAge = 3 *24*60*60;
const createToken = (id) => {
    return jwt.sign({ id }, 'secret' , {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req,res) =>{
    res.render('signup');
}
module.exports.signup_put =async (req,res) =>{
    const {emailId , password} = req.body;

    try{
        const user =await User.create({ emailId , password });
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge *1000});
        res.status(201).json({ user: user._id} );
    }
    catch(err){
        const errors = handleError(err);
        res.status(404).json({errors});
    }
}
module.exports.login_get = (req,res) =>{
    res.render('login');
}
module.exports.login_put =async (req,res) =>{
    const {emailId , password} = req.body;


}