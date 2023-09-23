
const {validateEmail }= require('../validator/validate')
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');



exports.createUser = async (req, res) => {
    try {
        const data = req.body
        let { name, email, password } = data;

        if (!name) {
            return res.status(400).send({ status: false, msg: 'plese provide name' })
        }
        if (!email) {
            return res.status(400).send({ status: false, msg: 'plese provide email' })
        }
//   console.log(validateEmail);
        if (!validateEmail(email)) {
            return res
                .status(400)
                .send({ status: false, message: `${email} is not valid email Id` });
        }

        //checking is there same Email Id present inside database or not
        let isAllreadyExistEmail = await userModel.findOne({ email: email });
        if (isAllreadyExistEmail) {
            return res.status(400).send({
                status: false,
                message: `this email id ${email} already exist`,
            });
        }
        if (!password) {
            return res.status(400).send({ status: false, msg: 'plese provide password ' })
        }

        const userCreated = await userModel.create(data)
        return res.status(201).send({ status: true, msg: "successfully created", data: userCreated });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

};

// Login User

exports.loginUser = async (req, res) => {
    try {
        const data = req.body;
        let { email, password } = data;
        if (!email || !password) {
            return res.status(404).send({ status: false, msg: "invalid email or password" })
        }
        let findUser = await userModel.findOne({ email })
        if (!findUser) {
            return res.status(404).send({ status: false, msg: "Email is not registered" });
        }
        const findPassword = await userModel.findOne({ password })
        if (!findPassword) {
            return res.status(404).send({ status: false, msg: 'password is incoorect' })
        }
        const token = jwt.sign({ _id: findUser._id }, "huuuvfjbjuirhhf", { expiresIn: '7d' })
        return res.status(200).send({ status: true, msg: "Login SuccessFully", token: token })
    } catch (error) {
        console.log(error);
        return res.send({ status: false, msg: 'error in login', error })
    }
}



