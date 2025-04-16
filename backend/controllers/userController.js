import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const registerUser = async (req, res) => {
    try {
        const { name, userName, password } = req.body;

        if (!userName || !password) {
            return res.json({ success: false, message: "Please enter details" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter 8-digit password" });
        }

        // Check if the username already exists
        const existingUser = await userModel.findOne({ userName });
        if (existingUser) {
            return res.json({ success: false, message: "Username already taken, choose a different one" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            userName,
            password: hashPassword,
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// API for login user
const loginUser = async (req,res) => {

    try {
        const { userName,password } = req.body;
        const user = await userModel.findOne({userName});

        if(!user){
            return res.json({success:false,message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            return res.json({success:true,token});
        }else{
            return res.json({success:false,message:'Invalid Password'});
        }
        
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

// API to get user Data
const getUserData = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(`Fetching user with ID: ${userId}`); 
      
      const user = await userModel.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, user });
    } catch (error) {
      console.error(`Error fetching user: ${error.message}`);  
      return res.status(500).json({ success: false, message: error.message });
    }
};
  


export { registerUser, loginUser, getUserData,getUserById }