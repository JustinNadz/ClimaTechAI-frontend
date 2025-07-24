"use client"

import type React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Radio,
  TrendingUp,
  AlertTriangle,
  Zap,
  FileText,
  Settings,
  HelpCircle,
  Bell,
  User,
  Shield,
  ChevronDown,
  Mountain,
  Droplet,
  MessageCircle,
  Bot,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState as useReactState } from "react";
import { usePathname } from "next/navigation";

const menuItems = [
  { title: "Dashboard Overview", icon: LayoutDashboard, url: "/dashboard", active: true },
  { title: "Live Data Feed", icon: Radio, url: "/dashboard/live-data" },
  { title: "Predictive Analytics", icon: TrendingUp, url: "/dashboard/analytics" },
  { title: "Emergency Protocols", icon: AlertTriangle, url: "/dashboard/emergency" },
  { title: "Clean Energy Management", icon: Zap, url: "/dashboard/energy" },
  { title: "Reports & Logs", icon: FileText, url: "/dashboard/reports" },
  { title: "Admin Panel", icon: Settings, url: "/dashboard/admin" },
  { title: "Help & Support", icon: HelpCircle, url: "/dashboard/help" },
]

function AppSidebar({ onChatBotClick, showChatBot, chatPanel, onBackToNav }: {
  onChatBotClick?: () => void,
  showChatBot: boolean,
  chatPanel: React.ReactNode,
  onBackToNav: () => void
}) {
  const pathname = usePathname();
  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">ClimaTech AI</h2>
            <p className="text-xs text-gray-600">Disaster Management</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 font-semibold">Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="text-gray-700 hover:bg-gray-50 data-[active=true]:bg-gray-100 data-[active=true]:text-gray-900"
                  >
                    <Link href={item.url} aria-current={pathname === item.url ? 'page' : undefined}>
                      <item.icon className="w-4 h-4" aria-hidden="true" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="bg-gradient-to-r from-blue-500 to-yellow-400 text-white rounded-lg hover:from-blue-600 hover:to-yellow-500 transition-all transform hover:scale-105" 
              onClick={onChatBotClick}
            >
              <Bot className="w-4 h-4" />
              <span>ClimaBot</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  const [chatState, setChatState] = useState<{ open: boolean; input: string; messages: { sender: string; text: string }[] }>({ open: false, input: '', messages: [{ sender: 'bot', text: 'Hello! How can I help you today?' }] });
  function handleSendChat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!chatState.input.trim()) return;
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, { sender: 'user', text: prev.input }],
      input: ''
    }));
    setTimeout(() => {
      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, { sender: 'bot', text: 'This is a demo chat bot. (No backend yet)' }]
      }));
    }, 500);
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('chatUpdate', () => {
      if (typeof window !== 'undefined') window.dispatchEvent(new Event('forceUpdate'));
    });
  }
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('chatUpdate', () => forceUpdate(x => x + 1));
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('chatUpdate', () => forceUpdate(x => x + 1));
      }
    };
  }, []);

  const [showNotifications, setShowNotifications] = useState(false);
  // Mock notification data (replace with real API call if needed)
  const [notifications] = useState([
    {
      id: 1,
      type: 'flood',
      title: 'Flood Warning',
      location: 'Marikina River Basin',
      timestamp: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'landslide',
      title: 'Landslide Alert',
      location: 'Baguio Slopes',
      timestamp: '10 minutes ago',
      read: false,
    },
    {
      id: 3,
      type: 'power',
      title: 'Power Grid Stable',
      location: 'Metro Manila',
      timestamp: '30 minutes ago',
      read: true,
    },
  ]);
  const notifRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showNotifications) return;
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showNotifications]);

  // ChatBot slide-in panel logic
  const chatPanel = (
    <div className={`fixed top-0 left-0 h-full w-96 max-w-full bg-white border-r border-gray-200 shadow-lg z-[9999] transition-transform duration-500 ${chatState.open ? 'translate-x-0' : '-translate-x-full'}`}
      tabIndex={-1}
      aria-label="ClimaBot Panel"
      style={{ outline: chatState.open ? '2px solid #3b82f6' : 'none' }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
          <span className="font-bold text-gray-900">ClimaBot</span>
          <Button aria-label="Close chat bot" variant="ghost" onClick={() => setChatState(s => ({ ...s, open: false }))}>
            ×
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto mb-4 bg-gray-50 rounded p-2">
          {chatState.messages.map((msg: { sender: string; text: string }, idx: number) => (
            <div key={idx} className={msg.sender === "user" ? "text-right" : "text-left"}>
              <span className={msg.sender === "user" ? "inline-block bg-blue-100 text-gray-900 rounded px-3 py-1 my-1" : "inline-block bg-gray-200 text-gray-800 rounded px-3 py-1 my-1"}>
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendChat} className="flex gap-2 p-4 border-t border-gray-200">
          <input
            className="flex-1 border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your message..."
            value={chatState.input}
            onChange={e => setChatState(s => ({ ...s, input: e.target.value }))}
            aria-label="Type your message"
          />
          <Button type="submit" className="bg-gradient-to-r from-blue-500 to-yellow-400 text-white hover:from-blue-600 hover:to-yellow-500 transition-all transform hover:scale-105" aria-label="Send message">Send</Button>
        </form>
      </div>
    </div>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <AppSidebar
          onChatBotClick={() => setChatState(s => ({ ...s, open: true }))}
          showChatBot={chatState.open}
          chatPanel={chatPanel}
          onBackToNav={() => setChatState(s => ({ ...s, open: false }))}
        />
        {/* Render chatPanel as a slide-in panel */}
        {isClient && chatState.open && chatPanel}
        {/* Main content area with proper spacing */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navigation */}
          <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 justify-start">
                <SidebarTrigger className="text-gray-700" aria-label="Open sidebar" />
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative" style={{ overflow: 'visible' }}>
                  <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications((v) => !v)} aria-label="Open notifications">
                    <Bell className="w-5 h-5 text-gray-700" aria-label="Notifications" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                      {notifications.filter(n => !n.read).length}
                  </Badge>
                </Button>
                  {showNotifications && (
                    <div ref={notifRef} className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999]" style={{overflow: 'visible'}}>
                      <div className="p-4 border-b font-semibold text-gray-900">Notifications</div>
                      <ul className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                        {notifications.length === 0 ? (
                          <li className="p-4 text-center text-gray-400">No new notifications</li>
                        ) : (
                          notifications.map((notif) => (
                            <li key={notif.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer">
                              {notif.type === 'flood' && <Droplet className="w-6 h-6 text-red-500" aria-label="Flood notification" />}
                              {notif.type === 'landslide' && <Mountain className="w-6 h-6 text-yellow-500" aria-label="Landslide notification" />}
                              {notif.type === 'power' && <Zap className="w-6 h-6 text-green-600" aria-label="Power notification" />}
                              <div className="flex-1">
                                <div className={`font-bold leading-tight ${notif.type === 'flood' ? 'text-red-600' : notif.type === 'landslide' ? 'text-yellow-600' : notif.type === 'power' ? 'text-green-600' : 'text-gray-900'}`}>{notif.title}</div>
                                <div className="text-gray-800">{notif.location}</div>
                                <div className="text-xs text-gray-400 mt-1">{notif.timestamp}</div>
                              </div>
                            </li>
                          ))
                        )}
                      </ul>
                      <div className="p-2 border-t text-center">
                        <a href="/dashboard/notifications" className="text-blue-600 hover:underline text-sm">View all notifications</a>
                      </div>
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2" aria-label="User menu">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-700" aria-label="User avatar" />
                      </div>
                      <span className="text-gray-700">Admin User</span>
                      <ChevronDown className="w-4 h-4 text-gray-700" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          {/* Main Content with proper padding and overflow handling */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-full">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
