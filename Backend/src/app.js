const express = require("express") ;
const app = express() ;
const expenseModel = require("./models/expense.model") ;
const uploadImage = require("./services/storage.service") ;
const multer = require("multer") ;

app.use(express.json());

const upload = multer( { storage : multer.memoryStorage() } )

app.post("/add-Expense" , upload.single("bill") , async (req , res) => 
{
    const result = await uploadImage(req.file.buffer) ;
    console.log(result) ;
    const post = await expenseModel.create({
        amount : req.body.amount , 
        description : req.body.description ,
        category : req.body.category ,
        date : req.body.date ,
        bill : result.url ,
    })

    res.status(201).json({
        message:"Expenses Added Successfully" ,
        post
    })

})

app.get("/save-Expenses" , async (req , res) => {
    
    const posts = await expenseModel.find() ;

    res.status(200).json({
        message:"Expenses Fetched Successfully" ,
        posts ,
    })
})



module.exports = app ;