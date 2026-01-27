const  nodemailer = require("nodemailer");
 
const transpoter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.TEST_EMAIL_PROVIDER,
        pass:process.env.TEST_EMAIL_PASSWORD,
    }
   
})
module.exports=transpoter