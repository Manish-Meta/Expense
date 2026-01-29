import { db } from "../db/db";
import { emailTemplate } from "../model/EmailTemplate/emailTemplate";
import { transpoter } from "./emailUtils";
import { renderEmail } from "./renderEmailTemplate";


export async function sendEmailProcess(actionType, data){

    let MatchedTemplate = await db.select().from(emailTemplate).where(eq(actionType, emailTemplate.actionType))
    if (!template) throw new Error("Email template not found");


  const subject = renderEmail(MatchedTemplate?.subject, data);
  const body = renderEmail(MatchedTemplate?.body, data);



    try {
   const sumitted = transpoter.sendMail({
      to:data.email,
      subject,
      body
    })

    if(sumitted){
  res.status(200).json({
                msg:'Email Sent'
            })
    }

   

}

catch(err){
     res.status(500).json({
                msg:'internal server error'
            })
}



   
}