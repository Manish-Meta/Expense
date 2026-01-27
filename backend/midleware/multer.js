const multer=require('multer')
const multer_mid=multer.diskStorage({
   destination:function(req,file,cb){
      cb(null,'./upload')
   },
   filename:function(req,file,cb){
      let name=file.originalname
      cb(null,name)
   }
});

const upload=multer({
   dest:'',
   storage:multer_mid,
   limits:10*1024*1024,
   fileFilter:function(req,file,cb){
      let type=['image/jpg','image/png','image/jpeg']
      if(!type.includes(file.mimetype)){
         return cb(new Error('Invalid file type'),false)
      }
      if(file.size>10*1024*1024){
         return cb(new Error('The file size is high'),false)
      }
      cb(null,true)
   }
})
module.exports=upload