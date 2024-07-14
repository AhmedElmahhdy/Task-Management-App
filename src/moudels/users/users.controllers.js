import  {User}  from "../../../db/models/user.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


export const addUser = async (req,res,next)=>{
    const {name , email , password} = req.body
    const isUserExist = await User.findOne({email})
    if(isUserExist) return next(new ErrorClass("User already exist", 400))
        // hash password
    const hashedPassword = bcryptjs.hashSync(password, 10)
    // perpare user object
    const newUser = new User({
        name ,
        email ,
        password: hashedPassword
    })
    await newUser.save()
    res.status(200).json({message : "User created successfully"})
}



export const signIn = async(req,res,next)=>{
    const {email , password} = req.body
    // check if user exist
    const user = await User.findOne({email})
    if(!user) return next(new ErrorClass("Invalid credentials", 400))
    // check if password is correct
    const isPasswordCorrect = bcryptjs.compareSync(password , user.password)
    if(!isPasswordCorrect) return next(new ErrorClass("Invalid credentials", 400))
    // generate token
    const token = jwt.sign({id : user._id} , "taskk" , {expiresIn : "1d"})
    const secureToken = "Task-Management-App " + token
    res.status(200).json({message : "Sign in successful", token : secureToken})
}