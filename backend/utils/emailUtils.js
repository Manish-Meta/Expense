const  nodemailer = require("nodemailer");

export const transpoter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.TEST_EMAIL_PROVIDER,
        pass:process.env.TEST_EMAIL_PASSWORD,
    }
    
})