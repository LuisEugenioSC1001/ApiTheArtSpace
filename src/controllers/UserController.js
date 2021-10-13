import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';

const validationEmail = async function existEmail(emailFuntion) {
        const response = await User.exists({ email: emailFuntion })
        return response;
    }
const register = async (userData) => {

    const { name, email, country, city, password, role, shop } = userData;
    
    const emailExist = await existEmail(email);

    function checkPassword(password) {
        const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    }
    async function existEmail(emailFuntion) {
        const response = await User.exists({ email: emailFuntion.toLowerCase() })
        return response;
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    if (name == "") {
        return ({ "Status": "Failure", "Description": "The name cannot be empty" })
    } else if (!validateEmail(email)) {
        return ({ "Status": "Failure", "Description": "The email doesn't valid" })
    } else if (emailExist) {
        return ({ "Status": "Failure", "Description": "The email is already on use" })
    } else if (country == "" || city == "") {
        return ({ "Status": "Failure", "Description": "The country and the city are required" });
    } else if (role == "") {
        return ({ "Status": "Failure", "Description": "Please select a role" });
    } else if (!checkPassword(password)) {
        return ({ "Status": "Failure", "Description": "The password must contain at least one uppercase letter, at least one special character and its length must be greater than 8 characters" });
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
                        shop: ""
                    }
                )
                return ({ "Status": "Success", "Description": "User Create succesfully" })
            } catch (error) {
                return ({ "Status": "Failure", "Description": "The Query failure" })
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
                return ({ "Status": "Success", "Description": "User Create successfully" })
            } catch (error) {
                return ({ "Status": "Failure", "Description": "The Query failure" });
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
            const DBData = await User.findOne({ email: email });
            const comparePass = await bcrypt.compare(password, DBData.password);
            if (DBData.email == email && comparePass) {
                return ({ "Status": "Success", "Description": "Login successfully" });
            } else {
                return ({ "Status": "Failure", "Description": "The password doesn't concuerd" })
            }
        } else {
            return ({ "Status": "Failure", "Description": "The email doesn't exist" });
        }

    } else {
        return ({ "Status": "Failure", "Description": "The email doesn't valid" });
    }
}
const userController = { login, register, validationEmail };

export default userController;
