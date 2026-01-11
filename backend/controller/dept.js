const {db}=require('../db/db')

const add_dept=async(req,res)=>{
    try{
        const {dept_id,dept_name}=req.body
        const date=new Date()
        const value=await db.query('INSERT INTO departments VALUES($1,$2,$3,$4)',[dept_id,dept_name,date,date])
        if(!value.rows){
            res.status(400).json({
                msg:"Something Went Wrong"
            })
            return
        }
        res.status(200).json({
            msg:"Added the department"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"Internal server error"
        })
    }
}

const delete_dept=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            res.status(404).json({
                msg:"Invalid data"
            })
            return
        }
        const value=await db.query('DELETE FROM departments WHERE dept_id=$1',[id])
        if(!value.rows){
            res.status(404).json({
                msg:"Invalid data's"
            })
            return
        }
        res.status(200).json({
            msg:"Data Deleted"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"Internal server error"
        })
    }
}

module.exports={add_dept,delete_dept}