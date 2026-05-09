import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../back-end/models/User.js";

const router = express.Router();

// Inscritption 
router.post("/register", async (req, res) => {


  try {

    const {
      username,
      email,
      password,
    } = req.body;


    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Création user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });


    await user.save();

     


    res.json({
      message: "Utilisateur créé"
    });

  } catch (err) {

    res.status(500).json({ error: err.message });
  }
});

//Login
router.post("/login", async (req, res) =>{
    try {
        const {email, password} = req.body;

        //Recherche User
        const user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({
                error: "Utilisateur introuvable"
            });
        }

        //Verif Password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                error: "Mot de passe incorrect"
            });
        }

        //Création Token
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.json({token,});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;