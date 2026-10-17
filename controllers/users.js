const User=require("../models/user")


module.exports.renderSignUpForm=(req,res)=>{
    res.render("user/signUp")
}

module.exports.signUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=new User({username,email})
        let registeredUser=await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err)
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        })
        
    }catch(e){
        req.flash("err",e.message)
        res.redirect("signUp")
    }
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("user/login")
}

module.exports.login=async(req,res)=>{
        req.flash("success","Welcome back to Wanderlust");
        let redirectUrl=res.locals.redirectUrl || "/listings"
        res.redirect(redirectUrl)
}

module.exports.logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","You Logout Successfully")
        res.redirect("/listings")
    })
}