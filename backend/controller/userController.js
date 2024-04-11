const User = require("../models/User");
const bcrypt = require('bcrypt');

const userRegistration = async (req, res) => {
    try {
        console.log("reg");
        const { password, email, ...data } = req.body;

        const checkuser = await User.findOne({ email });
        console.log(req.body)

        if (checkuser) {
            return res.status(404).json({ message: 'User already present ' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            password: hashedPassword,
            email, ...data
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        // console.log(error)
        res.status(400).json({ message: error.message });
    }
};
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const createSales = async (req, res) => {
    try {
        const userId = req.params.id;

        const sales = Number(req.body.sales);
        let userdata = await User.findById(userId);

        const salesdata = userdata.sales
        let finalsales = salesdata + Number(sales);

        if (finalsales >= 10000 && finalsales <= 20000) {
            userdata.incentives = "1.5";
            userdata.isHoliday = false
        }
        if (finalsales >= 20000 && finalsales <= 30000) {
            userdata.incentives = "3";
            userdata.isHoliday = false
        }
        if (finalsales >= 30000 && finalsales <= 50000) {
            userdata.incentives = "3.5";
            userdata.bonus.isBonus = true
            userdata.isHoliday = false
            userdata.bonus.bonusValue = 1000
        }
        if (finalsales >= 50000) {
            userdata.incentives = "5";
            userdata.isHoliday = true
            userdata.bonus.isBonus = false
            userdata.bonus.bonusValue = 0
        }
        userdata.sales = Number(userdata.sales) + sales;
        await userdata.save();

        res.status(200).json({ message: 'Sale updated successfully', userdata });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUserDetails = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId)
        let userData = await User.findById(userId).populate('holiday');
        if (userData) {

            res.status(200).json({ message: 'details got successfully', userData });
        } else {
            res.status(204).json({ message: 'user not find' });

        }

    } catch (error) {
        res.status(500).json({ message: error.message }); // Respond with an error if updating sales fails
    }
};
const getalleligibleuser = async (req, res) => {

    try {

        const eligibleUsers = await User.find({ isHoliday: true }).populate('holiday');

        res.status(200).json(eligibleUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }



}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        console.log(id, updates)
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createSales, userLogin, userRegistration, getUserDetails, getalleligibleuser, updateUser
}
