const bcrypt=require('bcrypt')
const encrypt=async(pass)=>{
    console.log(pass)
    const salt=bcrypt.genSaltSync(10);
    const encrypt_pass=await bcrypt.hash(pass,salt)
    return encrypt_pass
}

const decrypt=async(pass,org)=>{
    const value=await bcrypt.compare(pass,org)
    return value
}
module.exports={encrypt,decrypt}