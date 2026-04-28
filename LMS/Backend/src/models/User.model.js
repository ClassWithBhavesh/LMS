const mongoose = require("mongoose");
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        }, 
        usermail: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true
        }, 
        password: {
            type: String,
            required: true,
            minlength: 5,
            select: false
        },
        role: {
            type: String,
            enum: ['student', 'instructor', 'admin'],
            default: 'student'
        },
        userphone: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        collegename: {
            type: String,
            required: true
        },
        edulevel: {
            type: String,
            enum: ['UG', 'PG'],
            required: true
        },
        graduationcourse: {
            type: String,
            required: true
        },
        city: {
            type: String, 
            required: true
        },
        coursestatus:{
            type: String,
            enum: ['active', 'pending', 'blocked'],
            default: 'pending'
        }
    },
    {timestamps: true}
)


userSchema.pre('save', async function (){
    if (!this.isModified("password")) return;
    
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (enteredPass){
    return await bcrypt.compare(enteredPass, this.password);
};


module.exports = mongoose.model("User", userSchema);