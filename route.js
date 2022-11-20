const express=require('express');
const multer = require('multer');
const userCtrl=require('./controllers/userCtrl')
const router=express.Router();
var upload=multer()

router.use(express.urlencoded({extended:true}))

router.get("/home", function (req, res) {
    if(req.session.email){
        // req.flash('message', 'Logging successfully')
        res.render("home",{message:req.flash('message')})
    }
    else{
        req.flash('message', 'please login')

        res.redirect("/login")
    }
})

router.get("/add", (req,res)=>{
    res.render('add')
})
router.post("/add-user",upload.any(), userCtrl.addUser)
router.post("/login-user", upload.any(), userCtrl.loginCheck)
router.get("/logout", userCtrl.logout)




router.get("/login", function (req, res) {
    res.render('login',{message : req.flash('message')})
  });
module.exports=router