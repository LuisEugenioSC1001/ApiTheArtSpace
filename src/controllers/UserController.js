import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';

const register = async (userData) => {

    const { name, email, country, city, password, role, shop } = userData;

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

    const emailExist = await existEmail(email);

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
                        shop: "",
                        status: true

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
                        password: bcrypt.hashSync(password, 8),
                        role: role,
                        shop: shop,
                        status: true
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
            const emailInhabilitado = DBData.status == true;
            if (emailInhabilitado) {
                if (DBData.email == email && comparePass) {
                    return ({
                        "Status": "Success", "Description": "Login successfully", "Data": {
                            "name": DBData.name,
                            "role": DBData.role,
                            "shop": DBData.shop
                        }
                    });
                } else {
                    return ({ "Status": "Failure", "Description": "The password doesn't concuerd" })
                }
            } else {
                return ({ "Status": "Failure", "Description": "The user has been disabled by the admin" })
            }

        } else {
            return ({ "Status": "Failure", "Description": "The email doesn't exist" });
        }

    } else {
        return ({ "Status": "Failure", "Description": "The email doesn't valid" });
    }
}


const editUser = async (userData) => {
    const { _id, name, country, city, password, role, shop } = userData;
    if (name == "" || country == "" || city == "" || password == "") {
        return ({ "Status": "Failure", "Description": "All data is required" });
    } else {
        try {
            await User.updateOne({ _id: _id },
                {
                    $set: {
                        name: name,
                        country: country,
                        city: city,
                        password: password,
                        role: role,
                        shop: shop
                    }

                }
            )
            return { "Status": "Success", "Description": "The user has been successfully updated" };

        } catch (error) {

            return ({ "Status": "Failure", "Description": `The query failure with the error ${error}` });

        }
    }
}

const deleteUser = async (userData) => {
    const { _id, name, country, city, password, role, shop } = userData;
    try {
        await User.updateOne({ _id: _id },
            {
                $set: {
                    name: name,
                    country: country,
                    city: city,
                    password: password,
                    role: role,
                    shop: shop,
                    status: false
                }

            }
        )
        return { "Status": "Success", "Description": "The user has been successfully disabled" };

    } catch (error) {

        return ({ "Status": "Failure", "Description": `The query failure with the error ${error}` });

    }
}
const getUsers = async () => {
    const dataDb = await User.find();
    return { "Status": "Success", "Description": "Currents Users on the database", "Data": dataDb };
}

const userController = { login, register, editUser, deleteUser, getUsers };

export default userController;
