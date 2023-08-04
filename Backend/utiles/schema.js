const mongoos = require("mongoose")
const schema=mongoos.Schema({
    title:{
        type:String,
        required:true,
    },
    publishDate:{
        type:Date,
        
    },
    author:{
        type:String,
        required:true,
        
    },
    Pages: {
        type:Number,
        required:true
    }
})
const book=new mongoos.model("book",schema)

module.exports= book;