const UserDB = require('../model/userModel');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

module.exports.isUserExist = async (email, mobile) => {
    try {
        const user = await UserDB.findOne({ $or: [{email}, {mobile}] })
        if (user) {
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.createUser = async ( name, mobile, email, dob, password, isAdmin ) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const user = await UserDB.create({
            userId: uuidv4(),
            name,
            mobile,
            email,
            dob, 
            password: hashPassword,
            isAdmin
        })
        return user;

    } catch (error) {
        console.log(error);
    }
}

module.exports.userLogin = async (email, password) => {
    try {
        const user = await UserDB.findOne({email}).select("-password");
        const data = await UserDB.findOne({email});

        if(user) {
            const isMatch = await bcrypt.compare(password, data.password);
            if(isMatch) {
                return user;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }

    } catch (error) {
        console.log(error);
    }

}

module.exports.findUserByEmail = async (email) => {
    try {
        const user = await UserDB.findOne({email});
        return user;
    } catch (error) {
        console.log(error);
    }
}