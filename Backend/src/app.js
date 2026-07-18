const express = require("express") ;
const app = express() ;
const expenseModel = require("./models/expense.model") ;
const uploadImage = require("./services/storage.service") ;
const multer = require("multer") ;

app.use(express.json());

const upload = multer( { storage : multer.memoryStorage() } )

app.post("/add-Expense" , upload.single("bill") ,async (req , res) => 
{
    console.log(req.body) ;   
    console.log(req.file) ;

    console.log("The result is :- ") ;
    const result = await uploadImage(req.file.buffer) ;
    console.log(result) ;
    expenseModel.create({
        amount : req.body.amount , 
        description : req.body.description ,
        category : req.body.category ,
        date : req.body.date ,
        bill : req.file.url ,
    })
})

module.exports = app ;