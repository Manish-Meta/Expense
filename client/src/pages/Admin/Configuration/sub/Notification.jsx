import { Bell, CirclePlus, Copy, Edit, Eye, Mail, MessageCircle, MessageSquare } from "lucide-react";
import React from "react";

const Notification = () => {
  const Channels = [
    {
      id: 1,
      title: "Email Notifications",
      Icons: Mail,
      description: "Send notifications via email",
    },
    {
      id: 2,
      title: "Slack Integration",
      Icons: MessageSquare,
      description: "Send alerts to Slack channels",
    },
    {
      id: 3,
      title: "SMS Alerts",
      Icons: MessageCircle,
      description: "Critical notifications via SMS",
    },
    {
      id: 4,
      title: "Push Notifications",
      Icons: Bell,
      description: "In-app and browser notifications",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid lg:grid-cols-2 gap-6 ">
        <section className="border border-orange-200 rounded-xl p-4">
          <p className="text-sm font-medium mb-4">Notification Channels</p>

          <div className="space-y-4">
            {Channels.map((e) => (
              <NotificationCard {...e} />
            ))}
          </div>
        </section>

        {/* Notification Rules */}

        <section className="space-y-4 border border-orange-200 rounded-xl p-4">
          <p className="text-sm font-medium">Bottleneck Analysis</p>

          <div className="space-y-4">
            <p className="text-sm font-medium">Event-based Triggers</p>

         <div className="space-y-1">
               {[
              "Expense submitted",
              "Approval required",
              "Policy violation detected",
              "SLA breach warning",
              "Reimbursement processed",
              "System maintenance",
            ].map((e) => (
              <div className="flex justify-between">
                <p className="text-xs ">{e}</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-yellow-400 rounded-full peer-checked:bg-orange-400 transition" />
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
                </label>
              </div>
            ))}
         </div>
          </div>

           {/* Notification Frequency */}

      <div className="">
        <p className="text-sm font-medium mb-3">Notification Frequency</p>
        
        <div className="space-y-4 ">
            
            <div className="">
                <p className="text-xs font-medium mb-1">Email digest frequency</p>
                <select htmlFor="" className="bg-orange-50 py-2 w-full px-5 rounded-md text-xs">
                    <option value="realTime" selected>Real-Time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                </select>
            </div>

            <div className="">
                <p className="text-xs font-medium mb-1">Reminder digest frequency (hours)</p>
                 <select htmlFor="" className="bg-orange-50  py-2 w-full px-5 rounded-md  text-xs">
                     <option value="4" selected>4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="24">24</option>
                </select>
            </div>
        </div>
      </div>


      <div className=" space-y-4">
        <p className="text-sm font-medium">Do Not Disturb</p>
        <div className="flex justify-between">
                <p className="text-xs ">Enable quiet hours</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-yellow-200 rounded-full peer-checked:bg-orange-400 transition" />
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
                </label>
        </div>

        <div className="grid grid-cols-2 gap-4">

            <div className="">
                <p className="text-xs ">start time</p>
                <input type="date" className="p-2 rounded-md w-full text-xs bg-orange-50"/>
            </div>
            <div className="">
                <p className="text-xs ">end time</p>
                <input type="date" className="p-2 rounded-md w-full text-xs bg-orange-50"/>
            </div>
        </div>
      </div>
        </section>
      </div>


 

      <div className="border border-orange-200 rounded-xl p-4">


                <div className="flex items-center mb-3 justify-between">
                      <h1 className='text-sm font-medium'>Email Templates</h1>

                    <button className='p-1 text-xs border bg-orange-400 text-white  border-[#d9770633] px-2  rounded-md flex items-center gap-2'><CirclePlus className='size-3'/> New Templates</button>
                    
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                
                    <EmailTemplate/>
                    <EmailTemplate/>
                    <EmailTemplate/>
                    <EmailTemplate/>
                    <EmailTemplate/>
                    <EmailTemplate/>
                    <EmailTemplate/>
                    <EmailTemplate/>
                    <EmailTemplate/>

                </div>
      </div>
    </div>
  );
};

export default Notification;

export const NotificationCard = ({ id, Icons, title, description }) => {
  return (
    <div className="border border-orange-200 rounded-xl p-3 flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <span>
          <Icons className="size-4.5" />
        </span>

        <div className="">
          <p className="text-xs font-medium">{title}</p>
          <span className="text-[10px]">{description}</span>
        </div>
      </div>

      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" />
        <div className="w-9 h-5 bg-yellow-400 rounded-full peer-checked:bg-orange-400 transition" />
        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-4" />
      </label>
    </div>
  );
};

export const EmailTemplate=()=>{

    return(

        <div className="p-5 border border-[#f3d7b6] shadow-xs rounded-xl space-y-4">
            <div className="flex justify-between items-center">
                <h5 className="text-sm font-medium">Expense Submitted</h5>
                <span><Edit className="size-3.5"/></span>
            </div>

            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <p className="text-xs text-orange-700 ">Usage:</p>
                    <p className="text-xs font-medium">23%</p>
                </div>
                 <div className="flex justify-between items-center ">
                    <p className="text-xs text-orange-700">Last updated:</p>
                    <p className="text-xs font-medium">2024-01-10</p>

                </div>
            </div>

            <div className="">
                 <div className="flex gap-6">

                    <button className='p-1 text-xs border bg-white border-[#d9770633]  rounded-md flex  justify-center items-center gap-2 flex-2'><Eye  className='size-3'/> Preview</button>
                    <button className='p-1 w-12  justify-center text-xs border bg-white border-[#d9770633]  rounded-md flex items-center gap-2 '><Copy  className='size-3'/></button>

                </div>
            </div>
        </div>

    )
}