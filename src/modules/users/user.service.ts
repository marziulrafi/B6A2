import { pool } from "../../config/db"
import bcrypt from "bcryptjs"


const createUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload

    const hashPass = await bcrypt.hash(password as string, 10)

    const result = await pool.query(
        `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`,
        [name, email, hashPass, phone, role]
    )
    return result
}




const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users`)
    return result
}



const getSingleUser = async (email: string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
        email,
    ])
    return result
}



const updateUser = async (
    paramsEmail: string,
    payload: Record<string, undefined | string>
) => {
    const { name, email, role, password, phone } = payload

    const hashPass = await bcrypt.hash(password as string, 10)

    const result = await pool.query(
        `UPDATE users SET name=$1, email=$2, role=$3, password=$4, phone=$5 WHERE email=$6 RETURNING *`,
        [name, email, role, hashPass, phone, paramsEmail]
    )
    return result
}



const deleteUser = async (id: string) => {
    const check = await pool.query(
        `SELECT 1 FROM bookings 
     WHERE customer_id = $1`,
        [id]
    )

    if (check.rowCount !== 0) {
        throw new Error("Cannot delete user with active bookings")
    }

    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id])
    return result
}
export const userServices = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser
}