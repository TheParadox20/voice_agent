import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { useToast } from "@/app/hooks/use-toast";
import { apiRequest } from "@/app/lib/queryClient";
import { CreditCard, Shield, Zap, Smartphone } from "lucide-react";

interface PaystackPaymentProps {
  onSuccess?: (reference: string) => void;
  onCancel?: () => void;
}

export function PaystackPayment({ onSuccess, onCancel }: PaystackPaymentProps) {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [currency, setCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Update currency based on payment method
  useEffect(() => {
    if (paymentMethod === "mobile_money") {
      setCurrency("KES");
    } else {
      setCurrency("USD");
    }
  }, [paymentMethod]);

  const handlePayment = async () => {
    if (!email || !amount) {
      toast({
        title: "Missing Information",
        description: "Please provide both email and amount",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Initialize payment with Paystack
      const response = await apiRequest("POST", "/api/initialize-payment", {
        email,
        amount: parseFloat(amount),
        currency,
        paymentMethod,
        plan: plan === "one-time" ? undefined : plan,
      });

      const data = await response.json();

      if (data.status && data.data?.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error(data.message || "Failed to initialize payment");
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initialize payment",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPayment = async (reference: string) => {
    try {
      const response = await apiRequest("POST", "/api/verify-payment", {
        reference,
      });

      const data = await response.json();

      if (data.status && data.data?.status === "success") {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully",
        });
        onSuccess?.(reference);
      } else {
        throw new Error("Payment verification failed");
      }
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message || "Failed to verify payment",
        variant: "destructive",
      });
    }
  };

  // Check URL for payment reference on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get("reference");
    if (reference) {
      handleVerifyPayment(reference);
    }
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="p-2 bg-success rounded-full">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <CardTitle>BM Voice AI Payment</CardTitle>
        </div>
        <CardDescription>
          Secure payment powered by Paystack - supports mobile money, cards, and bank transfers
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="payment-method">Payment Method</Label>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                <CreditCard className="h-4 w-4" />
                <span>Card/Bank Transfer (USD)</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mobile_money" id="mobile_money" />
              <Label htmlFor="mobile_money" className="flex items-center space-x-2 cursor-pointer">
                <Smartphone className="h-4 w-4" />
                <span>Mobile Money - M-Pesa/Airtel (KES)</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount ({currency})</Label>
          <Input
            id="amount"
            type="number"
            placeholder={currency === "USD" ? "25" : "2500"}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="plan">Subscription Plan (Optional)</Label>
          <Select value={plan} onValueChange={setPlan}>
            <SelectTrigger>
              <SelectValue placeholder="Select a plan (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="one-time">One-time payment</SelectItem>
              <SelectItem value="basic">
                Basic Plan - {currency === "USD" ? "$25" : "KES 2,500"}/month
              </SelectItem>
              <SelectItem value="professional">
                Professional Plan - {currency === "USD" ? "$50" : "KES 5,000"}/month
              </SelectItem>
              <SelectItem value="enterprise">
                Enterprise Plan - {currency === "USD" ? "$100" : "KES 10,000"}/month
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Secured by Paystack - PCI DSS compliant</span>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4" />
          <span>
            {paymentMethod === "mobile_money" 
              ? "Mobile Money: M-Pesa, Airtel Money (KES)"
              : "Cards & Bank Transfers (USD)"
            }
          </span>
        </div>

        <div className="flex space-x-3">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button
            onClick={handlePayment}
            className="flex-1 bg-success hover:bg-success/90"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : `Pay ${currency} ${amount || "0"}`}
          </Button>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          You will be redirected to Paystack to complete your payment securely
        </div>
      </CardContent>
    </Card>
  );
}