const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    adress:{
        type:String,
        default:''
    },
    phone: {
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
})

usersSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

usersSchema.set('toJSON', {
    virtuals:true
})

exports.User = mongoose.model('Users', usersSchema)
