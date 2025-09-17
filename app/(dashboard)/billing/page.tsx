'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { PaystackPayment } from "@/app/components/paystack-payment";
import { Check, CreditCard, Users, Zap, Globe, Phone, BarChart3 } from "lucide-react";

export default function BillingPage() {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");

  const plans = [
    {
      id: "basic",
      name: "Basic",
      priceUSD: "25",
      priceKES: "2,500",
      period: "month",
      description: "Perfect for small businesses starting with voice AI",
      features: [
        "Up to 1,000 voice interactions/month",
        "2 voice agents (English & Swahili)",
        "Basic analytics dashboard",
        "Email support",
        "Standard voice quality",
      ],
      popular: false,
    },
    {
      id: "professional",
      name: "Professional",
      priceUSD: "50",
      priceKES: "5,000",
      period: "month",
      description: "Ideal for growing businesses with higher volume needs",
      features: [
        "Up to 5,000 voice interactions/month",
        "5 voice agents with custom accents",
        "Advanced analytics & reporting",
        "Priority support (24/7)",
        "Premium voice quality",
        "Campaign automation",
        "Multi-language surveys",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      priceUSD: "100",
      priceKES: "10,000",
      period: "month",
      description: "For large organizations with complex requirements",
      features: [
        "Unlimited voice interactions",
        "Unlimited voice agents",
        "Custom voice training",
        "Dedicated account manager",
        "API access & integrations",
        "Custom reporting",
        "White-label options",
        "SLA guarantee (99.9% uptime)",
      ],
      popular: false,
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (reference: string) => {
    setShowPayment(false);
    console.log("Payment successful:", reference);
    // Handle successful payment - update user subscription, etc.
  };

  const handlePaymentCancel = () => {
    setShowPayment(false);
    setSelectedPlan("");
  };

  if (showPayment) {
    return (
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <Button variant="outline" onClick={handlePaymentCancel}>
            ← Back to Plans
          </Button>
        </div>
        <PaystackPayment
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Choose Your BM Voice AI Plan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Scale your business with intelligent voice interactions. All plans include African voice support with English and Swahili capabilities.
        </p>
      </div>

      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-success rounded-full flex items-center justify-center">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold">African Focus</h3>
          <p className="text-sm text-muted-foreground">Optimized for African markets</p>
        </div>
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-analytics rounded-full flex items-center justify-center">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold">Multilingual</h3>
          <p className="text-sm text-muted-foreground">Native English and Swahili support</p>
        </div>
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-warning rounded-full flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold">Smart Analytics</h3>
          <p className="text-sm text-muted-foreground">Real-time insights and reporting</p>
        </div>
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-semibold">Easy Setup</h3>
          <p className="text-sm text-muted-foreground">Get started in minutes, not hours</p>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`relative ${plan.popular ? 'border-success shadow-lg scale-105' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-success text-white px-4 py-1">Most Popular</Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="space-y-2">
                <div className="text-4xl font-bold">
                  <span className="text-2xl">$</span>{plan.priceUSD}
                  <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  KES {plan.priceKES} with mobile money
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <Button 
                className={`w-full ${plan.popular ? 'bg-success hover:bg-success/90' : ''}`}
                onClick={() => handleSelectPlan(plan.id)}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Get Started
              </Button>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">What's included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>



      {/* Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>All payments are processed securely through Paystack. Cancel anytime.</p>
        <p>Need a custom plan? <span className="text-success cursor-pointer hover:underline">Contact our sales team</span></p>
      </div>
    </div>
  );
}