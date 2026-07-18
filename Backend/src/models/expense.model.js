const mongoose = require("mongoose") ;

const expenseSchema = new mongoose.Schema({
    amount : Number ,
    description : String , 
    category : String ,
    date : Date ,
    bill : String ,
})

const expenseModel = mongoose.model( "Expense" , expenseSchema ) ;

module.exports = expenseModel ;

