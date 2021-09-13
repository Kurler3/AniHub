import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signIn = async (req, res) => {
    console.log(req.body);

    const {email, password} = req.body;

    try {
        // Check if exists user with this email on the database
        const userDatabase = await User.findOne({email: email});

        if(!userDatabase) return res.status(400).json({message: 'User with this email not found in the database.'}); 

        // Check if the password inputted matches the password in the database
        const passwordsMatch = await bcryptjs.compare(password, userDatabase.password);

        if(!passwordsMatch) return res.status(400).json({message: "Invalid credentials."});

        // Create the JWT token
        const token = jwt.sign({email:existingUser.email, id:existingUser._id}, 'test', {expiresIn:'1h'});

        // return the data with res.json
        res.status(200).json({result: existingUser, token});    

    } catch (error) {
        res.status(500).json({message:'Something went wrong with the server... :('});        
    }

}

export const signUp = async (req, res) => {
    const {firstName, lastName, email, password, confirmPassword} = req.body;

    console.log('Signup controller');

    try {
        
        // Check if there exists an user with this email already
        const existingUser = await User.findOne({email:email});

        if(existingUser) return res.status(400).json({message:'There already exists an user with this email.'});

        // Check if password and confirmPassword match
        if(password!==confirmPassword) return res.status(400).json({message:"Passwords don't match."});

        // Encrypt the password

        const encryptedPassword = await bcryptjs.hash(password, 7);

        // Save to user to database
        const newUser = await User.create({
            first_name:firstName,
            last_name:lastName,
            email:email,
            password:encryptedPassword,
            saved_animes:[],
            currently_watching:[],
            done_watching:[],
        });

        const token = jwt.sign({email:newUser.email, id:newUser._id}, 'test', {expiresIn:'1h'});

        res.status(200).json({result:newUser, token:token});

    } catch (error) {
        res.status(500).json({message:"Something went wrong with the server... :("});
    }
}