
import { DollarSign, 
  LayoutDashboardIcon, //nav icons
  ReceiptIndianRupee,
  ChartColumnBig,
  History,
  CircleCheckBig,
  ShieldCheck,
  Settings2, 
  PowerIcon, 
  User, 
  User2, 
  ShieldUser, 
  UserCheck,
  Icon,
  Timer,
  UserCircle2Icon,
  UserCogIcon,} from 'lucide-react'

export   const employeeNavLink = [
    {
    nav : "Dashboard",
    link :"/dashboard",
    Icon : LayoutDashboardIcon
  },
    {
    nav : "Expense Submit",
    link :"/expense",
    Icon : ReceiptIndianRupee
  },
    {
    nav : "Report",
    link :"/report",
    Icon : ChartColumnBig
  },
  


]

export const validatorNavLink = [
    {
    nav : "Dashboard",
    link :"/dashboard",
    Icon : LayoutDashboardIcon
  },
    {
    nav : "validation history",
    link :"/history",
    Icon : History
  }


]
 
export const adminNavLink = [
  {
    nav : "Dashboard",
    link :"/dashboard",
    Icon : LayoutDashboardIcon
  },  
  {
    nav :"Approvals",
    link :"/approvals",
    Icon : CircleCheckBig
  },
  {
    nav : "Audit & Compliance",
    link : "/audit",
    Icon : ShieldCheck
  },

  {
    nav:"Analytics",
    link:"/analytics",
    Icon:ChartColumnBig
  },
  
  {
    nav:"Configuration",
    link:"/configuration",
    Icon : Settings2
  },
  {
    nav:"User Management",
    link:"/user_management",
    Icon: UserCogIcon
  }

]