import jwt from"jsonwebtoken"
import { User } from "../../db/models/user.model.js"


export const authenticate = async (req, res, next) => {
    const token = req.headers.token
    

    if (!token) {return res.status(401).json({ message: "Unauthorized"})}
    if (!token.startsWith("Task-Management-App")) {return res.status(401).json({ message: "Invalid token"})}

    const originalToken = token.split(" ")[1]
    const decoded = jwt.verify(originalToken,"taskk")

    if (!decoded) {return res.status(401).json({ message: "Invalid token"})}
    const user = await User.findById(decoded.id)
    console.log(decoded);
    if(!user) {return res.status(401).json({ message: "User not found"})}

    req.user = user
    next()

}