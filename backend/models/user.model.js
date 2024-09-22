import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,

    },
    fullname:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:"",
    }
},{timestamps:true})

const User = mongoose.model('User',UserSchema)

export default User;