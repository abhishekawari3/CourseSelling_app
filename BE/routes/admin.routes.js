const express = require('express');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../models/user');
const Admins = require('../models/admin');
const purchaseModel = require('../models/purchase');
const course = require('../models/course');
const authAdmin = require('../middlewares/authAdmin');
const course = require('../models/course');



const adminRouter = express.Router();
connectDb;

JWT_SECRET_ADMIN = "plkmnjijnbnjhbvdgb";

adminRouter.post('/signup', async(req,res)=>{
    const { username, name, email, password } = req.body;

    try{
       const existing_user = await Admins.findOne({$or: [{ username }, { email }]});


        if(existing_user){
            return res.status(400).json({
                message: "username already exists try new username"
            });
        }

        const hashpass = await bcrypt.hash(password, 10);
        
        await Admins.create({
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

adminRouter.post('/signin', async (req,res)=>{
    const { username, password } = req.body;

    try{
        const user = await Admins.findOne({ username });

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
            process.env.JWT_SECRET_ADMIN,
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

adminRouter.post('/course',  (req,res)=>{
    const adminId = req.userId;
    
    const { title, description, price, imageUrl} = req.body;

    course.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    });
    
    res.json({
        message: "Course created",
        courseId: course._id, 
    })

});

adminRouter.put('/course', authAdmin , async(req,res)=>{
     const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await course.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    }) 
})

adminRouter.get("/course/bulk", authAdmin,async function(req, res) {
    const adminId = req.userId;

    const courses = await course.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    });
});

module.exports = adminRouter;