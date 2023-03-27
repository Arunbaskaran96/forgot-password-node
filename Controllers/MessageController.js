const express=require("express")
const router=express.Router()


const MessageModel=require("../Models/MessageModel")
const AuthVerify=require("./middleware/Verify")
const UserVerify=require("./middleware/UserVerify")


// router.post("/message",AuthVerify,UserVerify,async(req,res)=>{
//   try {
//     const newMessage=new MessageModel({
//       conversationId:req.body.conversationId,
//       senderId:req.Uniqueid,
//       msg:req.body.msg
//     })
//     await newMessage.save()
//     res.status(200).json(newMessage)
//   } catch (error) {
//     console.log(error)
//     res.status(200).json({message:'something went wrong'})
//   }
// })

router.post("/message/:id",AuthVerify,UserVerify,async(req,res)=>{
  try {
    const newMsg=new MessageModel({
      senderId:req.Uniqueid,
      receiverId:req.params.id,
      msg:req.body.msg
    })
      await newMsg.save()
    res.status(200).json(newMsg)
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"something went wrong"})
  }
})

// router.get("/messages/:id",AuthVerify,async(req,res)=>{
//   try {
//    const getMessages=await MessageModel.find({conversationId:req.params.id}).populate("senderId")
//    res.status(200).json(getMessages)
//   } catch (error) {
//     console.log(error)
//     res.status(200).json({message:'something went wrong'})
//   }
// })

router.get("/messages/:id",AuthVerify,UserVerify,async(req,res)=>{
  try {
    const getMsg=await MessageModel.find({
      senderId:{
        $in:[req.Uniqueid,req.params.id]
      },
      receiverId:{
        $in:[req.Uniqueid,req.params.id]
      }
    }).populate("senderId")
    res.status(200).json(getMsg)
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"something went wrong"})
  }
})



module.exports=router