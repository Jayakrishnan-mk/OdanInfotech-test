
const { isUserExist, createUser, userLogin, findUserByEmail } = require('../services/userServices');
const { createToken } = require('../utils/generateToken');
const { Auth, LoginCredentials } = require("two-step-auth");


module.exports.Register = async (req, res) => {
    try {
        console.log('hhhh', req.body);
        const { name, mobile, email, dob, password, isAdmin } = req.body;
        const exists = await isUserExist(email, mobile)
        console.log(exists, "==");
        if (exists) {
            res.status(400).json({
                message: "User already exists",

            })
        }
        else {
            const user = await createUser(
                name, mobile, email, dob, password, isAdmin
            )

            // user.save()
            console.log(user);
            res.status(201).json({ message: "User registered successfully." })
        }

    } catch (error) {
        res.status(500).json({message: error})
    }
}

module.exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userLogin(email, password);

        if (user) {
            console.log(user, "logged in");
            if (user.isAdmin) {
                const token = createToken(user._id, "admin");
                res.json({ message: "Admin Login successfully", user, token })
            } else {
                const token = createToken(user._id, "user");
                res.json({ message: "User Login successfully", user, token })
            }
        }
        else {
            res.json({ message: "Invalid credentials!" })
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await findUserByEmail(email);

        if (user) {
            const otp = await Auth(email, "Company Name");
            // console.log(otp);
            // console.log(otp.mail);
            // console.log(otp.OTP);
            // console.log(otp.success);
            res.status(200).json({
                message: "OTP sent to your mail successfully.",
                otp
            })
        }
        else {
            res.status(400).json({
                message: "Invalid Email"
            })
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
}

module.exports.forgotPasswordConfirm =  (req,res) => {
    try {
        const { otp, originalOTP } = req.body
        if ( otp === originalOTP) {
            
        }
    } catch (error) {
        res.status(500).json({message: error})
    }
}