const express = require("express") ;
const app = express() ;
const expenseModel = require("./models/expense.model") ;
const uploadImage = require("./services/storage.service") ;
const multer = require("multer") ;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*") ;
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS") ;
    res.header("Access-Control-Allow-Headers", "Content-Type") ;
    if (req.method === "OPTIONS") return res.sendStatus(200) ;
    next() ;
}) ;

app.use(express.json());

const upload = multer( { storage : multer.memoryStorage() } )

app.post("/add-Expense" , upload.single("bill") , async (req , res) => 
{
    let billUrl = "" ;
    if (req.file) {
        const result = await uploadImage(req.file.buffer) ;
        billUrl = result.url ;
    }

    const post = await expenseModel.create({
        amount : req.body.amount , 
        description : req.body.description ,
        category : req.body.category ,
        date : req.body.date ,
        bill : billUrl ,
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

app.patch("/Expenses/:id" , upload.single("bill") , async (req , res) => {
    
    const id = req.params.id ;

    const exisiting = await expenseModel.findById(id) ;
    if (!exisiting) return res.status(400).json({
        message:"Expense was not Found",
    })

    let newUrl = exisiting.bill ;
    if (req.file) 
    {
            const result = await uploadImage(req.file.buffer) ;
            newUrl = result.url ;
    }

    const newExpense = req.body ;
    newExpense.bill = newUrl ;

    const updatedExpense = await expenseModel.findOneAndUpdate( {_id : id} , newExpense , {new : true}  ) ;

    res.status(200).json({
        message:"Expense Updated",
        updatedExpense ,
    })
})

app.delete("/Expenses/:id" , async (req , res) => {

    const id = req.params.id ;

    const exisiting = await expenseModel.findById(id) ;
    if (!exisiting) return res.status(400).json({
        message:"Expense was not Found",
    })

    const deleted = await expenseModel.findOneAndDelete( {_id : id} ) ;

    res.status(200).json({
        message:"Successfully Deleted" ,
        deleted 
    })

} )

module.exports = app ; 