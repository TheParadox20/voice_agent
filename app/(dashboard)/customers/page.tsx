'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Search, Filter, Eye, Phone, Edit, Star } from "lucide-react";

export default function Customers() {
  const customers = [
    {
      id: 1,
      name: "Alice Kamau",
      phone: "+254712345678",
      email: "alice.kamau@email.com",
      languagePreference: "Swahili",
      lastInteraction: "Survey Completion",
      lastInteractionTime: "2 hours ago",
      satisfactionRating: 5.0,
      segment: "VIP",
      avatar: "AK",
      avatarColor: "bg-success",
    },
    {
      id: 2,
      name: "John Mwangi",
      phone: "+254723456789",
      email: "john.mwangi@email.com",
      languagePreference: "English",
      lastInteraction: "Payment Reminder",
      lastInteractionTime: "1 day ago",
      satisfactionRating: 4.2,
      segment: "Regular",
      avatar: "JM",
      avatarColor: "bg-analytics",
    },
    {
      id: 3,
      name: "Fatuma Mohamed",
      phone: "+254734567890",
      email: "fatuma.mohamed@email.com",
      languagePreference: "Mixed",
      lastInteraction: "Product Inquiry",
      lastInteractionTime: "3 days ago",
      satisfactionRating: 4.8,
      segment: "New",
      avatar: "FM",
      avatarColor: "bg-warning",
    },
    {
      id: 4,
      name: "David Ochieng",
      phone: "+254745678901",
      email: "david.ochieng@email.com",
      languagePreference: "English",
      lastInteraction: "Customer Support",
      lastInteractionTime: "5 days ago",
      satisfactionRating: 3.9,
      segment: "Regular",
      avatar: "DO",
      avatarColor: "bg-purple-500",
    },
    {
      id: 5,
      name: "Grace Wanjiku",
      phone: "+254756789012",
      email: "grace.wanjiku@email.com",
      languagePreference: "Swahili",
      lastInteraction: "Survey Completion",
      lastInteractionTime: "1 week ago",
      satisfactionRating: 4.6,
      segment: "VIP",
      avatar: "GW",
      avatarColor: "bg-success",
    },
  ];

  const getLanguageColor = (lang: string) => {
    switch (lang) {
      case "Swahili":
        return "bg-success/10 text-success";
      case "English":
        return "bg-analytics/10 text-analytics";
      case "Mixed":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "VIP":
        return "bg-purple-500/10 text-purple-500";
      case "Regular":
        return "bg-muted text-muted-foreground";
      case "New":
        return "bg-analytics/10 text-analytics";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">{rating.toFixed(1)}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-3 w-3 ${
                star <= rating ? "text-warning fill-warning" : "text-muted-foreground"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive customer data and interaction history
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Database</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search customers..." className="pl-10" />
                </div>
              </div>
              <div className="flex gap-3">
                <Select defaultValue="all-languages">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-languages">All Languages</SelectItem>
                    <SelectItem value="english">English Preferred</SelectItem>
                    <SelectItem value="swahili">Swahili Preferred</SelectItem>
                    <SelectItem value="mixed">Mixed Languages</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-segments">
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-segments">All Segments</SelectItem>
                    <SelectItem value="vip">VIP Customers</SelectItem>
                    <SelectItem value="regular">Regular Customers</SelectItem>
                    <SelectItem value="new">New Customers</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => alert("Advanced filters panel would open")}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            {/* Customer Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Language Pref</TableHead>
                    <TableHead>Last Interaction</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Segment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`w-10 h-10 ${customer.avatarColor} rounded-full flex items-center justify-center mr-3`}>
                            <span className="text-white font-medium text-sm">{customer.avatar}</span>
                          </div>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">{customer.phone}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getLanguageColor(customer.languagePreference)}>
                          {customer.languagePreference}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{customer.lastInteraction}</div>
                        <div className="text-xs text-muted-foreground">{customer.lastInteractionTime}</div>
                      </TableCell>
                      <TableCell>
                        {renderStars(customer.satisfactionRating)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getSegmentColor(customer.segment)}>
                          {customer.segment}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => alert(`View details for ${customer.name}`)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => alert(`Call ${customer.name} at ${customer.phone}`)}>
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => alert(`Edit ${customer.name}`)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <div className="text-sm text-muted-foreground">
                Showing 1-5 of 2,847 customers
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => alert("Previous page")}>Previous</Button>
                <Button size="sm" onClick={() => alert("Page 1")}>1</Button>
                <Button variant="outline" size="sm" onClick={() => alert("Page 2")}>2</Button>
                <Button variant="outline" size="sm" onClick={() => alert("Page 3")}>3</Button>
                <Button variant="outline" size="sm" onClick={() => alert("Next page")}>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Insights */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Language Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">English Preferred</span>
                  <span className="text-sm font-medium">1,247 (44%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Swahili Preferred</span>
                  <span className="text-sm font-medium">1,139 (40%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mixed Languages</span>
                  <span className="text-sm font-medium">461 (16%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Customer Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">VIP Customers</span>
                  <span className="text-sm font-medium">142 (5%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Regular Customers</span>
                  <span className="text-sm font-medium">2,276 (80%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">New Customers</span>
                  <span className="text-sm font-medium">429 (15%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Satisfaction Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Rating</span>
                  <span className="text-sm font-medium">4.6/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Highly Satisfied (4.5+)</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Monthly Improvement</span>
                  <span className="text-sm font-medium text-success">+8.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
