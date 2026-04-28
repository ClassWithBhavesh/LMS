const mongoose = require("mongoose");
const bcrypt = require('bcrypt');



const visiterSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true
        }, 
        lastname: {
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
        }
    },
    {timestamps: true}
)


visiterSchema.pre('save', async function (){
    if (!this.isModified("password")) return;
    
    this.password = await bcrypt.hash(this.password, 10);
})

visiterSchema.methods.comparePassword = async function (enteredPass){
    return await bcrypt.compare(enteredPass, this.password);
};


module.exports = mongoose.model("Visiter", visiterSchema);