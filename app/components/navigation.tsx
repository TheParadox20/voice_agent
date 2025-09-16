import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { useTheme } from "./theme-provider";
import { Moon, Sun, Globe } from "lucide-react";

export function Navigation() {
  const location = usePathname();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/surveys", label: "Surveys" },
    { href: "/campaigns", label: "Campaigns" },
    { href: "/analytics", label: "Analytics" },
    { href: "/customers", label: "Customers" },
    { href: "/live-agents", label: "Live Agents" },
    { href: "/support", label: "Support" },
    { href: "/billing", label: "Billing" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="bg-background dark:bg-dark-bg border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/">
              <div className="text-2xl font-bold text-foreground">BM</div>
            </Link>
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    className={`text-sm font-medium transition-colors ${
                      location === item.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <div className="flex items-center space-x-2 text-sm">
              <Globe className="h-4 w-4 text-success" />
              <span className="font-medium">EN | SW</span>
            </div>
            <div className="flex space-x-2">
              <Link href="/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-success text-white hover:bg-success/90" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
