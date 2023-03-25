const mongoose=require("mongoose")

const Friendsmodel=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    friendid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

module.exports=mongoose.model("friends",Friendsmodel)