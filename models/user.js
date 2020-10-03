const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail} = require('validator');

const userId = new mongoose.Schema({ 
    email: {
        require: [true,'Plese enter email Id'],
        unique: true,
        type: String,
        lowercase:true,
        validate: [ isEmail , 'Enter the valid Email Id']
    },
    password: {
        require: [true,'Plese enter Password'],
        minlength: [6,'Password length Insufficient , it should be above 6 charecter'],
        type: String,
    }
});
userId.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

const User = mongoose.model('user',userId);

// userIdSchema.post('save',function(doc,next){
//     console.log('new user is created',doc);
//     next();
// })
// userIdSchema.pre('save',function(next){
//     console.log('new user is created',this);
//     next();
// })

module.exports = User;