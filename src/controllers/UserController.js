import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';


const register = async (userData) => {
    const { name, email, country, city, password, role, shop } = userData;
    function checkPassword(password) {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    if (name == "") {
        console.log("The name cannot be empty")
        return false
    } else if (!validateEmail(email)) {
        console.log("The email doesn't valid")
        return false
    } else if (country == "" && city == "") {
        console.log("The country and the city are required");
        return false;
    } else if (role == "") {
        console.log("Please select a role");
        return false;
    } else if (!checkPassword(password)) {
        console.log("The password must contain at least one uppercase letter, at least one special character and its length must be greater than 8 characters")
        return false;
    } else {
        if (role.toLowerCase() == "user") {
            try {
                await User.create(
                    {
                        name: name,
                        email: email,
                        country: country,
                        city: city,
                        password: bcrypt.hashSync(password, 8),
                        role: role,
                        shop: "false"
                    }
                )
                return true
            } catch (error) {
                console.log("The Query failure");
                return false
            }

        } else {
            try {
                await User.create(
                    {
                        name: name,
                        email: email,
                        country: country,
                        city: city,
                        password: password,
                        role: role,
                        shop: shop
                    }
                )
                return true
            } catch (error) {
                console.log("The Query failure")
            }

        }
    }
}
const login = async (userData) => {
    const { email, password } = userData;
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    if (validateEmail(email)) {
        const response = await User.exists({ email: email })
        if (response) {
            const DBData = await User.findOne({ email: email })
            const comparePass = await bcrypt.compare(password, DBData.password)
            console.log(comparePass)
            if (DBData.email == email && comparePass) {
                console.log("All ok");
                return true;
            }else{
                console.log("The password doesn't concuerd");
                return false
            }
        } else {
            console.log("The email doesn't exist");
            return false;
        }

    } else {
        console.log("The email doesn't valid");
        return false;
    }
}
const userController = { login, register };

export default userController;
