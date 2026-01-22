const multer=require('multer')
const upload=multer.diskStorage({
    destination:'',
    filename:function(req,file,cb){
        
    },
    
})