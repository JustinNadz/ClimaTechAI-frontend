"use client"

import { useState, useRef } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Book,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Video,
  Download,
  ExternalLink,
  ChevronRight,
  Clock,
  CheckCircle,
} from "lucide-react"

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")
  const [ticketSuccess, setTicketSuccess] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const [showTicketModal, setShowTicketModal] = useState(false)
  type Ticket = typeof supportTickets[number];
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketPriority, setTicketPriority] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const [ticketError, setTicketError] = useState("");
  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I access the ClimaTech AI dashboard?",
      answer:
        "To access the dashboard, log in with your credentials provided by your agency administrator. Navigate to the dashboard section to view real-time weather data, emergency alerts, and system status.",
      helpful: 45,
    },
    {
      id: 2,
      category: "weather-monitoring",
      question: "How often is weather data updated?",
      answer:
        "Weather data is updated every 10 minutes from PAGASA stations and every 5 minutes for critical parameters during severe weather events. Real-time alerts are issued immediately when thresholds are exceeded.",
      helpful: 38,
    },
    {
      id: 3,
      category: "emergency-protocols",
      question: "How do I issue an emergency alert?",
      answer:
        "Navigate to Emergency Protocols > Alert Messaging. Select the alert type, affected area, and severity level. Review the message template and click 'Send Emergency Alert' to broadcast to all relevant agencies.",
      helpful: 52,
    },
    {
      id: 4,
      category: "energy-management",
      question: "How do I switch to backup power during emergencies?",
      answer:
        "Go to Clean Energy Management > Microgrids tab. Select the affected grid and click 'Switch to Backup'. The system will automatically activate renewable energy sources and battery storage.",
      helpful: 29,
    },
    {
      id: 5,
      category: "troubleshooting",
      question: "What should I do if the system shows offline status?",
      answer:
        "Check your internet connection first. If the problem persists, contact your system administrator or submit a support ticket. For critical emergencies, use the backup communication channels provided in your emergency manual.",
      helpful: 41,
    },
    {
      id: 6,
      category: "weather-monitoring",
      question: "How do I interpret AI prediction confidence levels?",
      answer:
        "Confidence levels above 90% indicate high reliability. 80-90% is good reliability, 70-80% is moderate, and below 70% requires additional verification. Always cross-reference with multiple data sources for critical decisions.",
      helpful: 33,
    },
  ]

  const [userVotes, setUserVotes] = useState<{ [faqId: number]: 'helpful' | 'not_helpful' | null }>({});
  const [helpfulCounts, setHelpfulCounts] = useState<{ [faqId: number]: number }>(
    Object.fromEntries(faqs.map(faq => [faq.id, faq.helpful]))
  );

  const tutorials = [
    {
      id: 1,
      title: "Getting Started with ClimaTech AI",
      description: "Complete overview of the platform features and navigation",
      duration: "15 minutes",
      type: "video",
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Setting Up Weather Monitoring Alerts",
      description: "Configure automated alerts for weather conditions",
      duration: "10 minutes",
      type: "video",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Emergency Response Protocol Guide",
      description: "Step-by-step guide for emergency response procedures",
      duration: "20 minutes",
      type: "document",
      difficulty: "Advanced",
    },
    {
      id: 4,
      title: "Clean Energy System Management",
      description: "Managing renewable energy systems and microgrids",
      duration: "12 minutes",
      type: "video",
      difficulty: "Intermediate",
    },
  ]

  const faqCategories = [
    { id: "all", label: "All Categories" },
    { id: "getting-started", label: "Getting Started" },
    { id: "weather-monitoring", label: "Weather Monitoring" },
    { id: "emergency-protocols", label: "Emergency Protocols" },
    { id: "energy-management", label: "Energy Management" },
    { id: "troubleshooting", label: "Troubleshooting" },
  ]

  const [supportTickets, setSupportTickets] = useState([
    {
      id: "TKT-001",
      subject: "Weather data not updating",
      status: "open",
      priority: "high",
      created: "2024-01-31 14:30:25",
      lastUpdate: "2024-01-31 15:45:12",
      assignedTo: "Technical Support Team",
      category: "technical",
      description: "Weather data is not updating on the dashboard."
    },
    {
      id: "TKT-002",
      subject: "Unable to send emergency alerts",
      status: "in-progress",
      priority: "critical",
      created: "2024-01-31 13:15:08",
      lastUpdate: "2024-01-31 16:22:33",
      assignedTo: "Emergency Systems Team",
      category: "account",
      description: "Emergency alerts are not being sent to users."
    },
    {
      id: "TKT-003",
      subject: "Solar panel monitoring offline",
      status: "resolved",
      priority: "medium",
      created: "2024-01-30 09:45:15",
      lastUpdate: "2024-01-31 11:30:45",
      assignedTo: "Energy Management Team",
      category: "technical",
      description: "Solar panel monitoring system is offline."
    },
  ]);

  const contactInfo = [
    {
      type: "Emergency Hotline",
      contact: "911",
      description: "24/7 emergency response coordination",
      icon: Phone,
    },
    {
      type: "Technical Support",
      contact: "support@climatech.gov.ph",
      description: "System issues and technical assistance",
      icon: Mail,
    },
    {
      type: "Training Department",
      contact: "training@climatech.gov.ph",
      description: "User training and documentation requests",
      icon: Book,
    },
    {
      type: "System Administrator",
      contact: "admin@climatech.gov.ph",
      description: "Account management and permissions",
      icon: MessageCircle,
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 w-full px-8 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
            <p className="text-gray-600 mt-1">Get assistance and learn how to use ClimaTech AI effectively</p>
          </div>
          <div className="flex gap-3">
            {/* Removed Live Chat and Call Support buttons */}
          </div>
        </div>

        {/* Help & Support Tabs */}
        <Tabs defaultValue="faq" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-50">
            <TabsTrigger value="faq" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              FAQ
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              Tutorials
            </TabsTrigger>
            <TabsTrigger value="support" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              Support Tickets
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-400 data-[state=active]:text-white">
              Contact Us
            </TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search frequently asked questions..."
                    className="pl-10 border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px] border-gray-200">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {faqCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {faqs.map((faq) => (
                <Card key={faq.id} className="p-6 shadow-md rounded-xl bg-white">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">{faqCategories.find(c => c.id === faq.category)?.label}</span>
                  </div>
                  <p className="text-gray-800 mb-4">{faq.answer}</p>
                  <div className="border-t pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="transition-all duration-300">{helpfulCounts[faq.id]} people found this helpful</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={userVotes[faq.id] === 'helpful' ? 'default' : 'outline'}
                        className={userVotes[faq.id] === 'helpful' ? 'bg-green-500 text-white border-green-500' : ''}
                        aria-pressed={userVotes[faq.id] === 'helpful'}
                        onClick={() => {
                          if (userVotes[faq.id] !== 'helpful') {
                            setUserVotes({ ...userVotes, [faq.id]: 'helpful' });
                            setHelpfulCounts((prev) => ({ ...prev, [faq.id]: prev[faq.id] + 1 }));
                          }
                        }}
                        disabled={!!userVotes[faq.id]}
                      >
                        <span role="img" aria-label="Helpful">👍</span> Helpful
                      </Button>
                      <Button
                        variant={userVotes[faq.id] === 'not_helpful' ? 'default' : 'outline'}
                        className={userVotes[faq.id] === 'not_helpful' ? 'bg-red-100 text-red-700 border-red-200' : ''}
                        aria-pressed={userVotes[faq.id] === 'not_helpful'}
                        onClick={() => {
                          if (userVotes[faq.id] !== 'not_helpful') {
                            setUserVotes({ ...userVotes, [faq.id]: 'not_helpful' });
                          }
                        }}
                        disabled={!!userVotes[faq.id]}
                      >
                        <span role="img" aria-label="Not Helpful">👎</span> Not Helpful
                      </Button>
                    </div>
                  </div>
                  {userVotes[faq.id] && (
                    <div className="mt-2 text-xs text-gray-500">Thank you for your feedback!</div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tutorials Tab */}
          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {tutorials.map((tutorial, idx) => (
                <Card key={tutorial.id} className="border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col bg-white overflow-hidden">
                  <div className="p-6 flex flex-col h-full">
                    {/* Icon and Title Section */}
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        {tutorial.type === "video" ? (
                          <Video className="w-5 h-5 text-gray-600" />
                        ) : (
                          <FileText className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{tutorial.title}</h3>
                      </div>
                    </div>
                    
                    {/* Description Section */}
                    <p className="text-sm text-gray-600 mb-4">{tutorial.description}</p>
                    
                    {/* Duration and Difficulty Section */}
                    <div className="flex items-center mb-6 mt-auto">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-600">{tutorial.duration}</span>
                      </div>
                      <Badge className={`ml-auto ${getDifficultyColor(tutorial.difficulty)}`}>{tutorial.difficulty}</Badge>
                    </div>
                    
                    {/* Buttons Section */}
                    <div className="flex gap-2">
                      <a
                        href={
                          tutorial.title === "Getting Started with ClimaTech AI"
                            ? "https://www.youtube.com/watch?v=4HkJj3DFLgs&t=5s"
                            : tutorial.title === "Setting Up Weather Monitoring Alerts"
                            ? "https://www.youtube.com/watch?v=MWolmv8g5w8"
                            : tutorial.title === "Emergency Response Protocol Guide"
                            ? "https://www.youtube.com/watch?v=Mxe2D8TuZs4"
                            : tutorial.title === "Clean Energy System Management"
                            ? "https://www.youtube.com/watch?v=-r8FVTr96vo&t=2s"
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white transition-all w-full flex items-center justify-center h-10">
                          {tutorial.type === "video" ? "Watch Video" : "Read Guide"}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </a>
                      <a
                        href={`/downloads/tutorial-${idx + 1}.pdf`}
                        download
                        className="h-10 w-10 flex items-center justify-center"
                      >
                        <Button variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50 h-10 w-10 p-0 flex items-center justify-center">
                          <Download className="w-4 h-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="support" className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Your Support Tickets</h2>
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all transform hover:scale-105 shadow-md" onClick={() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  const input = formRef.current.querySelector('input, select, textarea') as HTMLElement;
                  if (input) input.focus();
                }
              }}>
                <MessageCircle className="w-4 h-4 mr-2" />
                Create New Ticket
              </Button>
            </div>

            {/* Create New Ticket Form */}
            <Card className="border-gray-200 hover:shadow-lg transition-shadow" ref={formRef}>
              <CardHeader>
                <CardTitle className="text-gray-900">Submit a Support Request</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ticketSuccess ? (
                  <div className="p-4 bg-green-50 text-green-800 rounded-lg text-center font-semibold">Your ticket has been submitted successfully!</div>
                ) : (
                  <form onSubmit={e => {
                    e.preventDefault();
                    if (!ticketPriority || !ticketCategory || !ticketSubject.trim() || !ticketMessage.trim()) {
                      setTicketError("Please fill in all fields before submitting.");
                      return;
                    }
                    setTicketError("");
                    setTicketSuccess(true);
                    // Add new ticket to the list
                    const now = new Date();
                    const newTicket = {
                      id: `TKT-${(supportTickets.length + 1).toString().padStart(3, '0')}`,
                      subject: ticketSubject,
                      status: "open",
                      priority: ticketPriority,
                      created: now.toISOString().replace('T', ' ').substring(0, 19),
                      lastUpdate: now.toISOString().replace('T', ' ').substring(0, 19),
                      assignedTo: "Unassigned",
                      category: ticketCategory,
                      description: ticketMessage
                    };
                    setSupportTickets([newTicket, ...supportTickets]);
                    setTicketPriority("");
                    setTicketCategory("");
                    setTicketSubject("");
                    setTicketMessage("");
                  }}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Priority Level</label>
                        <Select value={ticketPriority} onValueChange={setTicketPriority}>
                          <SelectTrigger className="border-gray-200">
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - General inquiry</SelectItem>
                            <SelectItem value="medium">Medium - System issue</SelectItem>
                            <SelectItem value="high">High - Urgent problem</SelectItem>
                            <SelectItem value="critical">Critical - Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Select value={ticketCategory} onValueChange={setTicketCategory}>
                          <SelectTrigger className="border-gray-200">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="account">Account Management</SelectItem>
                            <SelectItem value="training">Training Request</SelectItem>
                            <SelectItem value="feature">Feature Request</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        placeholder="Brief description of your issue"
                        className="border-gray-200"
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Provide detailed information about your issue..."
                        className="border-gray-200 min-h-[120px]"
                        value={ticketMessage}
                        onChange={(e) => setTicketMessage(e.target.value)}
                        required
                      />
                    </div>
                    {ticketError && <div className="text-red-600 text-sm mb-2">{ticketError}</div>}
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 transition-all transform hover:scale-105 shadow-md mt-2"
                      disabled={!(ticketPriority && ticketCategory && ticketSubject.trim() && ticketMessage.trim())}
                    >
                      Submit Ticket
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Existing Tickets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {supportTickets.map((ticket) => (
                <Card key={ticket.id} className="border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-semibold text-gray-900 mb-1">{ticket.subject}</h3>
                        <p className="text-sm text-gray-600 mb-2">Ticket ID: {ticket.id}</p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mb-2">
                          <span>Created: {ticket.created}</span>
                          <span>Last Update: {ticket.lastUpdate}</span>
                          <span>Assigned to: {ticket.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority.toUpperCase()}</Badge>
                          <Badge className={getStatusColor(ticket.status)}>{ticket.status.toUpperCase()}</Badge>
                        </div>
                        <div className="mt-auto">
                          <Button size="sm" variant="outline" className="border-gray-200 text-gray-700 bg-transparent hover:bg-gray-50 w-full" onClick={() => setSelectedTicket(ticket)}>
                            View Details
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contact Us Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((contact, index) => (
                <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex flex-col items-center text-center gap-4 flex-1">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <contact.icon className="w-8 h-8 text-gray-600" />
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <h3 className="font-semibold text-gray-900 mb-2">{contact.type}</h3>
                        <p className="text-lg font-bold text-gray-700 mb-3">{contact.contact}</p>
                        <p className="text-sm text-gray-600 mb-4">{contact.description}</p>
                        <div className="w-full mt-auto">
                          {contact.type === "Emergency Hotline" ? (
                            <a href={`tel:${contact.contact}`} className="block w-full">
                              <Button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 transition-all transform hover:scale-105 shadow-md w-full">
                                Contact Now
                              </Button>
                            </a>
                          ) : (
                            <a href={`mailto:${contact.contact}`} className="block w-full">
                              <Button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white hover:from-blue-600 hover:to-teal-500 transition-all transform hover:scale-105 shadow-md w-full">
                                Contact Now
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-gray-900">Office Hours & Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Business Hours</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span>8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span>9:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>Emergency Only</span>
                      </div>
                      <div className="flex justify-between font-semibold text-red-600">
                        <span>Emergency Hotline:</span>
                        <span>24/7 Available</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Office Location</h4>
                    <div className="text-sm space-y-1">
                      <p>ClimaTech AI Operations Center</p>
                      <p>DOST Caraga, CSU Campus</p>
                      <p>Ampayon, Butuan City, Philippines</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setShowTicketModal(false)} aria-label="Close ticket modal">×</button>
            <h2 className="text-lg font-bold mb-2">Create New Ticket</h2>
            <div className="mb-4 text-gray-700">Please fill out the form below to submit a new support ticket.</div>
            <input className="w-full border border-gray-300 rounded px-3 py-2 mb-2" placeholder="Subject" />
            <textarea className="w-full border border-gray-300 rounded px-3 py-2 mb-2 min-h-[80px]" placeholder="Describe your issue..." />
            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white mt-2">Submit Ticket</Button>
          </div>
        </div>
      )}

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setSelectedTicket(null)} aria-label="Close details modal">×</button>
            <h2 className="text-lg font-bold mb-2">Ticket Details</h2>
            <div className="mb-2 text-gray-900 font-semibold">{selectedTicket.subject}</div>
            <div className="mb-1 text-sm text-gray-600">Ticket ID: {selectedTicket.id}</div>
            <div className="mb-1 text-sm text-gray-600">Created: {selectedTicket.created}</div>
            <div className="mb-1 text-sm text-gray-600">Last Update: {selectedTicket.lastUpdate}</div>
            <div className="mb-1 text-sm text-gray-600">Assigned to: {selectedTicket.assignedTo}</div>
            <div className="mb-1 text-sm text-gray-600">Priority: <Badge className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority.toUpperCase()}</Badge></div>
            <div className="mb-1 text-sm text-gray-600">Status: <Badge className={getStatusColor(selectedTicket.status)}>{selectedTicket.status.toUpperCase()}</Badge></div>
            {/* Add more details here if available */}
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
