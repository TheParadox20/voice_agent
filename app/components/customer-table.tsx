import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Eye, Phone, Edit, Star } from "lucide-react";
import type { Customer } from "@/app/data/customer";

interface CustomerTableProps {
  customers: Customer[];
  onViewCustomer?: (id: number) => void;
  onCallCustomer?: (id: number) => void;
  onEditCustomer?: (id: number) => void;
}

export function CustomerTable({ 
  customers, 
  onViewCustomer,
  onCallCustomer,
  onEditCustomer
}: CustomerTableProps) {
  const getLanguageColor = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "swahili":
      case "sw":
        return "bg-success/10 text-success";
      case "english":
      case "en":
        return "bg-analytics/10 text-analytics";
      case "mixed":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSegmentColor = (segment: string) => {
    switch (segment.toLowerCase()) {
      case "vip":
        return "bg-purple-500/10 text-purple-500";
      case "regular":
        return "bg-muted text-muted-foreground";
      case "new":
        return "bg-analytics/10 text-analytics";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-muted-foreground">-</span>;
    
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

  const formatLastInteraction = (date: Date | null | undefined) => {
    if (!date) return "Never";
    
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  const getAvatarInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-success",
      "bg-analytics", 
      "bg-warning",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500"
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const getInteractionType = (customer: Customer) => {
    // Since we don't have interaction type in the customer table, we'll derive it from recent patterns
    if (customer.satisfactionRating && parseFloat(customer.satisfactionRating.toString()) > 4) {
      return "Survey Completion";
    } else if (customer.segment === "vip") {
      return "VIP Support Call";
    } else if (customer.lastInteraction) {
      return "Customer Support";
    }
    return "Initial Contact";
  };

  return (
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
                  <div className={`w-10 h-10 ${getAvatarColor(customer.name)} rounded-full flex items-center justify-center mr-3`}>
                    <span className="text-white font-medium text-sm">
                      {getAvatarInitials(customer.name)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground">{customer.phone}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getLanguageColor(customer.languagePreference || 'en')}>
                  {(customer.languagePreference || 'en') === "en" ? "English" : 
                   (customer.languagePreference || 'en') === "sw" ? "Swahili" : 
                   (customer.languagePreference || 'en').charAt(0).toUpperCase() + (customer.languagePreference || 'en').slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="text-sm">{getInteractionType(customer)}</div>
                <div className="text-xs text-muted-foreground">
                  {formatLastInteraction(customer.lastInteraction)}
                </div>
              </TableCell>
              <TableCell>
                {renderStars(customer.satisfactionRating ? parseFloat(customer.satisfactionRating.toString()) : null)}
              </TableCell>
              <TableCell>
                <Badge className={getSegmentColor(customer.segment || 'regular')}>
                  {(customer.segment || 'regular').charAt(0).toUpperCase() + (customer.segment || 'regular').slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => onViewCustomer?.(customer.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onCallCustomer?.(customer.id)}>
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEditCustomer?.(customer.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
