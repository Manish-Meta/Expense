import { ChartLine, Copy, Edit, Ellipsis, GitBranch, PlusCircle, Timer, TriangleAlert, Workflow, Zap } from 'lucide-react'
import React from 'react'

const WorkFlows = () => {
  return (
    <div className='grid grid-cols-1 gap-5 lg:grid-cols-2  lg:col-span-[1fr_1fr]'>
        {/*Create Approval Workflows  */}
        <section className='border border-orange-200 rounded-xl p-4'>
            <div className="flex justify-between items-center">
                <p className='text-sm font-medium'>Approval Workflows</p>
                   <button type="button" onClick={()=>navigate("/expense")} className='cursor-pointer p-2 text-[10px]  bg-[#d97706] text-white flex items-center gap-2 rounded-md' ><PlusCircle className='size-3'/> Create Workflow</button>


            </div>


               <div className='space-y-4 mt-4'>
          <ApprovalCard/>
        <ApprovalCard/>
        <ApprovalCard/>
        <ApprovalCard/>
      </div>
        </section>



   



{/* Workflow Performance */}

<section className='border border-orange-200 rounded-xl p-4 space-y-4'>
    <div className="">
            <p className='text-sm font-medium'>Workflow Performance</p>
    </div>

    <div className="grid grid-cols-2 gap-5">
        <div className=" p-3 rounded-xl">
            <p className='font-medium  text-3xl text-gray-300'>2.3</p>
            <span className='text-xs'>Avg. Approval Time (days)</span>
        </div>

        <div className="bg-green-50 p-3 rounded-xl">
            <p className='font-medium text-3xl text-green-500'>94.2%</p>
            <span className='text-xs'>Success Rate</span>
        </div>
    </div>

{/* Workflow Efficiency */}

<div className="space-y-2">

    <p className='text-sm font-medium'>Workflow Efficiency</p>

    <div className=" ">
        <div className="flex justify-between w-full mb-2">
             <p className='text-xs font-medium'>Standard Approval</p>  
             <p className='text-xs font-medium'>89% of expenses</p> 
        </div>
        <div className="relative h-1.5 bg-orange-100 rounded-2xl">
            <span className='bg-orange-400 w-80 h-full absolute left-0 top-0 rounded-2xl'></span>
        </div>
    </div>

 <div className=" ">
        <div className="flex justify-between w-full mb-2">
             <p className='text-xs font-medium'>High Value Approval</p>  
             <p className='text-xs font-medium'>8% of expenses</p> 
        </div>
        <div className="relative h-1.5 bg-orange-100 rounded-2xl">
            <span className='bg-orange-400 w-12 h-full absolute left-0 top-0 rounded-2xl'></span>
        </div>
    </div>


     <div className=" ">
        <div className="flex justify-between w-full mb-2">
             <p className='text-xs font-medium'>Travel & Entertainment</p>  
             <p className='text-xs font-medium'>3% of expenses</p> 
        </div>
        <div className="relative h-1.5 bg-orange-100 rounded-2xl">
            <span className='bg-orange-400 w-8 h-full absolute left-0 top-0 rounded-2xl'></span>
        </div>
    </div>
</div>


{/* Bottleneck Analysis */}

<div className="space-y-4">
    <p className='text-sm font-medium'>Bottleneck Analysis</p>
    <div className="flex gap-2 items-center border border-orange-200 p-2 rounded-xl">
        <span><TriangleAlert className='size-4'/></span>

        <div className="">
            <p className='text-xs font-medium'>Stage 2: Director Approval</p>
            <span className='text-[10px]'>Average delay: 1.8 days</span>
        </div>
    </div>

    <div className="flex gap-2 items-center border border-red-200 bg-red-50 p-2 rounded-xl">
        <span><Timer className='size-4'/></span>

        <div className="">
            <p className='text-xs font-medium'>High-Value Workflow</p>
            <span className=' text-[10px]'>3 SLA breaches this month</span>
        </div>
    </div>

    <p className='text-sm font-medium'> AI Recommendations</p>

    <div className="flex gap-2 items-center border border-blue-200 bg-blue-50 p-2 rounded-xl">
        <span><Zap className='size-4'/></span>

        <div className="">
            <p className='text-xs font-medium text-blue-400'>Parallel Approval</p>
            <span className='text-[10px] text-blue-400 '>Consider parallel approval for travel expenses to reduce processing time by 40%</span>
        </div>
    </div>
</div>

{/* parallel apporval */}


</section>

    </div>
  )
}

export default WorkFlows


export const ApprovalCard =()=>{ 

    return(
        <div className="p-3 border border-orange-200 rounded-xl bg-[#fefdfc] space-y-4">

            <div className="flex justify-between">
                <div className="">
                    <p className='text-sm'> Standard Approval
</p>
<p className='text-[11px]'>Default workflow for regular expenses</p>
                </div>

                <div className="flex gap-3 items-center ">
                    <Copy className='size-3.5'/>
                    <Edit className='size-3.5'/>
                    <Ellipsis className='size-3.5'/>
                </div>
            </div>


<div className="grid grid-cols-2 gap-4">
    <div className="">
        <p className='text-xs font-medium text-orange-800'>Applicable To:</p>
       <p className='text-[10px]'>All Departments</p>
    </div>
    <div className="">
        <p className='text-xs font-medium text-orange-800'>Stages:</p>
       <p className='text-[10px]'>2</p>
    </div>
    <div className="">
        <p className='text-xs font-medium text-orange-800'>Usage:</p>
       <p className='text-[10px]'>89% of expenses</p>
    </div>
    <div className="">
        <p className='text-xs font-medium text-orange-800'>Last Modified:</p>
       <p className='text-[10px]'>2024-01-15</p>
    </div>
</div>

{/* buttons */}
<hr className='text-red-200'/>

<div className="flex gap-2">

                    <button className='p-1 text-[10px] font-medium border bg-white border-[#d9770633]  rounded-md flex items-center gap-2'><GitBranch  className='size-3'/>Test Workflow
</button>
                    <button type="button" onClick={()=>navigate("/expense")} className='cursor-pointer font-medium p-1 text-[10px] border bg-white border-[#d9770633]  rounded-md flex items-center gap-2' ><ChartLine className='size-3'/>Analytics</button>
                </div>

        </div>
    )
}
