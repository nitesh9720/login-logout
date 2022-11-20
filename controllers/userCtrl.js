const Users=require('../models/users')
const bcrypt=require('bcrypt');
const mongoose=require('mongoose')

const addUser=(req,res)=>{
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const data=new Users({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.username,
        email:req.body.email,
        password:hash
    })
    data.save(function(error,result){
        if(error){
            console.log(error)
        }
        req.flash('message', 'added successfully')
        res.redirect('/login')
    })
    console.log(hash)
    console.log(req.body);
    
}

const loginCheck= async (req,res)=>{
    var result=await Users.findOne({name:req.body.username},{})
    console.log(result);
    
    if(result){
        const check=await bcrypt.compare(req.body.password,result.password)
        if(check){                                   
            req.flash('message', 'Logging successfully')
            sess=req.session,
            sess.name=result.name,
            sess.email=result.email
            res.redirect('/home')
        }
        else{
            req.flash('message', 'invalid password')
            res.redirect("/login")
        }
        
    }
    else{
        req.flash('message', 'invalid username')
        res.redirect("/login")
    }

}
const logout=(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }
        else{
            // req.flash('message', 'Logout successfully')
            res.redirect("/login")
        }
    })
}
module.exports={
    addUser,
    loginCheck,
    logout
}