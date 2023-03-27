const mongoose=require("mongoose")

const MessageModel=mongoose.Schema({
    // conversationId:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true
    // },
    // msg:{
    //     type:String,
    //     required:true
    // },
    // senderId:{
    //     ref:"user",
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true
    // }
    senderId:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    receiverId:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    msg:{
        type:String,
        required:true
    }

})


module.exports=mongoose.model("message",MessageModel)