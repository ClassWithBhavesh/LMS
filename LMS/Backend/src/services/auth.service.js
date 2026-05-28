const Visiter = require("../models/Visiter.model.js");

const {
    generateAccessToken,
    generateRefreshToken
} = require("../utils/generateToken.js");

const registerVisiter = async (data) => {
    const visiterExists = await Visiter.findOne({ usermail: data.usermail });
    if (visiterExists) throw new Error("User already exists");

    const visiter = await Visiter.create(data);
    console.log(visiter);

    return {
        accessToken: generateAccessToken(visiter),
        refreshToken: generateRefreshToken(visiter),
        visiter 
    };
};

const loginVisiter = async ({ usermail, password }) => {
    const visiter = await Visiter.findOne({ usermail }).select("+password");
    console.log("user mail - ", usermail);
    if (!visiter) {
        return "User Not Found";
        // throw new Error("User not found");
    }

    const isMatch = await visiter.comparePassword(password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }       

    const visiterObj = visiter.toObject();
    delete visiterObj.password;

    return {
        accessToken: generateAccessToken(visiter),
        refreshToken: generateRefreshToken(visiter),
        visiter: visiterObj
    };
};

module.exports = {
    registerVisiter, loginVisiter
}