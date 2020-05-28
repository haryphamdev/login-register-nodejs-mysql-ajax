import connection from "../config/connectDB";
import bcrypt from "bcryptjs";

let findUserByEmail = (email)=>{
 return new Promise((resolve, reject) => {
     try{
         connection.query("SELECT * from users where email = ?", email, function(error, rows) {
            if(error) reject(error);
            let user = rows[0];
            resolve(user);
         });
     }catch (e) {
         reject(e);
     }
 })
};

let compareUserPassword =  (user, password)=>{
    return new Promise(async (resolve, reject) => {
        try{
            let match = await bcrypt.compare(password, user.password);
            if(match) resolve(true);
            else resolve("The password that you've entered is incorrect")
        }catch (e) {
            reject(e);
        }
    })
};

let findUserById = (id) => {
    return new Promise((resolve, reject) => {
        try{
            connection.query("SELECT * from users where id = ?", id, function(error, rows) {
                if(error) reject(error);
                let user = rows[0];
                resolve(user);
            });
        }catch (e) {
            reject(e);
        }
    })
};

module.exports = {
    compareUserPassword: compareUserPassword,
    findUserByEmail: findUserByEmail,
    findUserById: findUserById
};