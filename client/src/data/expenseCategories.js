import {
  Home,
  Car,
  Plane,
  GraduationCap,
  Smartphone,
  FileText,
  Globe,
  MapPin,
  Users
} from "lucide-react"

export const expenseCategories = [
  {
    id: "accommodation",
    title: "Accommodation Booking",
    description: "Request for accommodation",
    limitText: "$300/night",
    icon: Home,
  },
  {
    id: "conveyance",
    title: "Conveyance",
    description: "For local conveyance within the city",
    limitText: "$50/day",
    icon: Car,
  },
  {
    id: "travel",
    title: "Domestic Travel",
    description: "Tickets, Conveyance, Food, etc.",
    limitText: "$1,500/trip",
    icon: Plane,
  },
  {
    id: "learning",
    title: "Learning & Development",
    description: "Courses relevant to work & skill growth",
    limitText: "$2,000/year",
    icon: GraduationCap,
  },
  {
    id: "mobile",
    title: "Mobile & Internet Reimbursement",
    description: "Mobile & Broadband expenses",
    limitText: "$100/month",
    icon: Smartphone,
  },
  {
    id: "overseas",
    title: "Overseas Travel",
    description: "International travel expenses",
    limitText: "$5,000/trip",
    icon: Globe,
  },
  {
    id: "relocation",
    title: "Relocation Expense",
    description: "Relocation during offer or transfer",
    limitText: "$3,000/event",
    icon: MapPin,
  },
  {
    id: "team",
    title: "Team Engagement",
    description: "Team events, lunches & activities",
    limitText: "$200/person",
    icon: Users,
  },
  {
    id: "others",
    title: "Others",
    description: "Expenses not covered elsewhere",
    limitText: null,
    icon: FileText,
  },
]
