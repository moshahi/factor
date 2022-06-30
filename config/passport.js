const passport = require('passport');
const bcrypt = require('bcryptjs');
const { Strategy } = require('passport-local');
const User = require('../model/User');

passport.use(new Strategy({usernameField:"mobile"},async (mobile,password,done)=>{
    try {
       const user = await User.findOne({mobile})
        if(!user){
            return done(null,false,{message:"شماره مبایل موجود نمی باشد"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if (isMatch) {
            return done(null,user)
        }else{
            return done(null,false,{message:"مبایل یا کلمه عبور نادرست میباشد"})
        }
    } catch (error) {
        
    }
}));

passport.serializeUser((user,done)=>{
    return done(null,user)
})

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        done(err,user)
    })
})
