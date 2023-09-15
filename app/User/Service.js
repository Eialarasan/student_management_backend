import Entity from '../../Entity/index'
import jwt from 'jsonwebtoken'
import { encryptPass } from '../../util'

class UserService {
    async UserRegister(data, res) {
        try {
            const { user_name, phone_number, email, password } = data
            const RegisterUser = await Entity.User.findOne({
                where: {
                    email: email
                }
            })
            if (RegisterUser) {
                return res.send({ status: "failed", message: "email id is already entered", response_code: 1 })
            } else {
                const payload = {
                    userName: user_name,
                    phoneNumber: phone_number,
                    email: email,
                    password: encryptPass(password),
                    createdDate:new Date(),
                }
                 await Entity.User.create(Object.assign({}, payload))
                return res.send({ status: "success", message: "User created successfully", response_code: 0 })
            }
        } catch (error) {
            console.error("USER_REGISTER",error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async UserLogin(data, res) {
        const { email, password } = data
        try {
            const user = {
                email,
                password
            }
            const findUser = await Entity.User.findOne({
                where: {
                    email: email
                }
            })
            if (!findUser || findUser.password != encryptPass(password)){
                return res.send({ status: "failed", response_message: "Invalid credentials", response_code: 1 })
             }
                user.userId=findUser.id
                let access_token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1h" })
                res.send({ status: "success", response_message: "You have login succesfully",userDetails:findUser, access_token: access_token, response_code: 0 })
        } catch (error) {
            console.error("USER_LOGIN",error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }

    async RefreshToken( res,userId) {
        try {
            const findUser = await Entity.User.findOne({
                where: {
                    id: userId
                }
            })
            const user={
                email:findUser.email,
                password:findUser.password,
                userId
            }
            let access_token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: "1h" })
            res.send({ status: "success", message: "Token created succesfully", access_token: access_token, response_code: 0 })
        } catch (error) {
            console.error("REFRESH_TOKEN",error)
            return res.status(500).send({ response_code: 2, response_message: "Sorry something went wrong" });
        }
    }
}
export default new UserService();