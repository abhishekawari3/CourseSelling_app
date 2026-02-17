const express = require('express');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/user');
const auth = require('../middlewares/auth');

const router = express.Router();
connectDb;

JWT_SECRET = "dkshyfgasuifiso";

router.post('/signup', async(req,res)=>{
    const { username, name, email, password } = req.body;

    try{
       const existing_user = await Users.findOne({$or: [{ username }, { email }]});


        if(existing_user){
            return res.status(400).json({
                message: "username already exists try new username"
            });
        }

        const hashpass = await bcrypt.hash(password, 10);
        
        await Users.create({
            username: username,
            name: name,
            email: email,
            password: hashpass
        })

        res.status(200).json({
            message: "User created successfully",
        })

    } catch(err){
        return res.status(500).json({
            message: "error occured while createing user",
            error: err.message
        })
    }
})

router.post('/signin', async (req,res)=>{
    const { username, password } = req.body;

    try{
        const user = await Users.findOne({ username });

        if(!user){
            return res.status(404).json({
                message: "user not found"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid Creadentials",
            })
        }

        const token = JWT.sign({
            userId: user._id,
            username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

            res.status(200).json({
            message: "User logged in successfully",
            token
        })

    } catch(err){
        return res.status(500).json({
            message: "server error",
            error: err.message,
        })
    }
})

router.get('/purchases', auth, async(req,res)=>{
    const userid = req.userId;

    const purchases = await purchaseModel.find({
        userId: userid,
    });

    let purchasedCourseIds = [];
    
    for(let i =0;i<purchases.length;i++){
        purchasedCourseIds.push(purchases[i].courseId);
    }
    
    const courseData = await course.find({
        _id: { $in: purchasedCourseIds }
    });

    res.json({
        purchases,
        courseData
    });
});

module.exports = router;