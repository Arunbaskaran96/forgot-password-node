const express=require("express")
const router=express.Router()

const Friendmodel=require("../Models/FriendsModel")
const AuthVerify=require("./middleware/Verify")
const UserVerify=require("./middleware/UserVerify")


router.post("/addfriend/:id",AuthVerify,UserVerify,(req,res)=>{


    const addFriend=new Friendmodel({
        userid:req.Uniqueid,
        friendid:req.params.id
    })

    addFriend.save().then(result=>{
        if(result){
            res.status(200).json({message:"added"})
        }else{
            res.status(400).json({message:" not added"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})


// router.post("/addfriend/:id",AuthVerify,UserVerify,async(req,res)=>{
//     try {
//         const addUsers=await Friendmodel.aggregate([
//             {
//               '$match': {
//                 'userid': new ObjectId('641b3ce086fc582137e0f11f')
//               }
//             }
//           ])
//           res.status(200).json(addUsers)
//     } catch (error) {
//         res.status(500).json({message:"something went wrong"})
//     }
// })


router.get("/friendslist",AuthVerify,UserVerify,(req,res)=>{
    
    Friendmodel.find({userid:req.Uniqueid}).populate("friendid").then(result=>{
        if(result){
            res.status(200).json(result)
        }else{
            res.status(200).json({message:"no data found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})

router.delete("/remove/:id",AuthVerify,UserVerify,(req,res)=>{
    Friendmodel.findOneAndDelete({_id:req.params.id}).then(result=>{
        if(result){
            res.status(200).json({message:"Deleted"})
        }else{
            res.status(400).json({message:"no data found"})
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    })
})


module.exports=router