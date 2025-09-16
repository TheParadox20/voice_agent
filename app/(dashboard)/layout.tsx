"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Separator } from "@/app/components/ui/separator";
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  BarChart3,
  Users,
  Headphones,
  HelpCircle,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  Mic,
  PhoneCall,
  UserCheck,
  MessageCircle,
  Volume2,
  Router
} from "lucide-react";

const navigationItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/surveys", label: "Survey Builder", icon: FileText },
  { href: "/campaigns", label: "Voice Campaigns", icon: Megaphone },
  { href: "/telephony-config", label: "SIP Configuration", icon: Router },
  { href: "/call-simulator", label: "Call Simulator", icon: PhoneCall },
  { href: "/customer-simulator", label: "Customer Test", icon: UserCheck },
  { href: "/voice-chat", label: "Voice Chat", icon: MessageCircle },
  { href: "/microphone-test", label: "Mic Test", icon: Mic },
  { href: "/advanced-mic-test", label: "Advanced Mic", icon: Volume2 },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/customers", label: "Customer Data", icon: Users },
  { href: "/live-agents", label: "Live Agents", icon: Headphones },
  { href: "/support", label: "Support Center", icon: HelpCircle },
  { href: "/billing", label: "Billing", icon: CreditCard },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface EnterpriseNavigationProps {
  user?: {
    username: string;
    email: string;
  };
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = {
    username: "John Doe",
    email: "john.doe@example.com",
  };
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} bg-muted/10 border-r transition-all duration-300 flex flex-col`}>
        {/* Logo Section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Mic className="h-4 w-4 text-primary-foreground" />
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold">BM</h1>
                <p className="text-xs text-muted-foreground">Enterprise Platform</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full h-10 flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-start pl-3 pr-3'} ${
                    isActive 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "hover:bg-muted"
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center w-full">
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!isSidebarCollapsed && <span className="ml-3 text-left">{item.label}</span>}
                  </div>
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        {user && (
          <div className="p-4 border-t">
            {!isSidebarCollapsed ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={user.username} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.username}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-1">
                  <Link href="/settings">
                    <Button variant="ghost" className="w-full h-10 flex items-center justify-start pl-3 pr-3">
                      <div className="flex items-center w-full">
                        <Settings className="h-4 w-4 flex-shrink-0" />
                        <span className="ml-3 text-left">Settings</span>
                      </div>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full h-10 flex items-center justify-start pl-3 pr-3 text-destructive hover:text-destructive"
                    onClick={handleSignOut}
                  >
                    <div className="flex items-center w-full">
                      <LogOut className="h-4 w-4 flex-shrink-0" />
                      <span className="ml-3 text-left">Sign out</span>
                    </div>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link href="/settings">
                  <Button variant="ghost" className="w-full justify-center px-0" title="Settings">
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-center px-0 text-destructive hover:text-destructive"
                  onClick={handleSignOut}
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Collapse Toggle */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={`w-full h-10 flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'justify-start pl-3 pr-3'}`}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <div className="flex items-center w-full">
              {isSidebarCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4 flex-shrink-0" />}
              {!isSidebarCollapsed && <span className="ml-3 text-left">Collapse</span>}
            </div>
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold capitalize">
              {pathname === '/' || pathname === '/dashboard' ? 'Dashboard' : 
               navigationItems.find(item => item.href === pathname)?.label || 'BM Platform'}
            </h2>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Link href="/voice-session">
              <Button size="sm" className="space-x-2">
                <Mic className="h-4 w-4" />
                <span>Start Voice Session</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}