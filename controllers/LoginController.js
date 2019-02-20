var mongoose = require("mongoose");
var Login = require("../models/login");
var bcrypt = require('bcryptjs');
var loginController = {};
loginController.aut =function(req, res) {
    Login.findOne({ user:req.body.username  }).exec(function(err,user){
        //res.session.userId = "d";
        if(err){
            res.redirect("/");           
        }else if(user == null){          
            console.log(req.body.username);
                res.send("not found this user!");
        }
        else if(user!= null){
                console.log(user);
                
                bcrypt.compare(req.body.password, user.password, function(err, ree) {
                    console.log(ree); 
                    if(err){                        
                        console.log("err compare password");
                        res.redirect("/");
                    }
                    else{
                     if(ree == true){
                        req.session.userId = user.user;
                        console.log(req.session.userId+"<<Session");
                        res.redirect("/adminmenu");
                     }
                     else{
                         console.log("Invalid paasword !");
                         res.send("Invalid password!");
                     }
                    }
                });
            }
    });
}
loginController.logout = function(req,res){
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                 res.redirect('/');
                 console.log("logout ERR");
            } else {
                 res.redirect('/');
                 console.log("Logout!");
            }
        });
    }
};
loginController.getFormChangePassword = function(req,res){
    if(req.session){
        console.log(req.session.userId);

        console.log("arady login ===");
    }
    res.render("changePassword");

};
loginController.changePassword = function(req,res){
    Login.findOne({ user:req.session.userId  }).exec(function(err,user){
        if(err){
            console.log(err,"ERR");
        }
        else{
            bcrypt.compare(req.body.oldpassword, user.password, function(err, bool) {
                if(err){
                    console.log(err,"ERR");
                }
                else{
                    if(bool == true){//เจอ 
                        console.log("====");
                        console.log(user);
                        console.log("====");
                        if(req.body.newpassword != null){
                            if(req.body.newpassword == req.body.reenterpassword){
                                console.log("===asdsdddd=");
                                bcrypt.hash(req.body.reenterpassword, 8, function (err, hash) {
                                    if (err) {
                                      return next(err);
                                    }
                                    console.log(hash,"====HASH");
                                 
                                Login.findOneAndUpdate({user:user.user}, {$set:{password:hash}}, function (err,data){
                                    if(err){
                                      console.log("ERR in asdasdasdsdasadss");
                                    }
                                    else{

                                        console.log(data,"====");
                                        req.session.destroy(function (err) {
                                            if (err) {
                                                 res.redirect('/');
                                                 console.log("logout ERR");
                                            } else {
                                                 console.log("Logout!");
                                                 res.send("Logout!");
                                            }
                                        });
                                      console.log("success");
                                      
                                    }
                                });
                            })
                            }
                            else{ //popup    
                                res.send("password not mach");
                                console.log("password not mach");
                            }
                    }
                    }
                    else{ //popup         
                        res.send("Invalid password!");
                        console.log("Invalid password!");
                    }
            }
            });
            
        }
    });
};
module.exports = loginController;