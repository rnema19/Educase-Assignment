const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "school_app",
}).promise()

const show_list = async () => {
    try {
        const [result] = await pool.query("SELECT * FROM school")
        return result
    } catch (error) {
        console.log(error)
    }
}

const show_list_sorted = async (latitude,longitude) => {
    try {
        const [result] = await pool.query("SELECT * FROM school ORDER BY ABS(latitude - ?) + ABS(longitude - ?)",[latitude,longitude])
        return result
    } catch (error) {
        console.log(error)
    }
}

const showby_id = async (id) => {
    try {
        const result = await pool.query(`SELECT * FROM school
         WHERE id = ?`,[id])
        return result
    } catch (error) {
        console.log(error)
    }
}

const add_school = async (name,address,latitude,longitude) => {
    try {
        const new_addition = await pool.query(
            "INSERT INTO school(name,address,latitude,longitude) VALUES(?,?,?,?)",
            [name,address,latitude,longitude]
        ).then((message) =>{
            console.log("Row inserted")
        })
        // console.log(new_addition)
        const id = new_addition._id
        return getby_id(id)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {show_list,show_list_sorted,showby_id,add_school};
